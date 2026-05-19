import { createClient } from '@supabase/supabase-js';

// Retrieve keys from Vite env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Determine if we are in Cloud Mode or Local Sandbox Mode
export const isCloudMode = !!(supabaseUrl && supabaseAnonKey);

export const supabase = isCloudMode 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;

/**
 * Maps the user's simplified guest credentials to secure production auth credentials
 */
export function getMappedCredentials(username, password) {
  const cleanUser = username.trim().toLowerCase();
  
  if (cleanUser === 'guest' && password === 'test') {
    return {
      email: 'guest@gmail.com',
      password: 'Toby_Kitty_Secure_2026!' // A secure standard password matching strength rules
    };
  }
  
  // Normal mapping
  return {
    email: cleanUser.includes('@') ? cleanUser : `${cleanUser}@gmail.com`,
    password: password.length >= 6 ? password : `${password}123456`
  };
}

/**
 * Unified storage engine supporting cloud (Supabase) and local (LocalStorage) dual mode
 */
export const StorageEngine = {
  // Current user state
  getCurrentUser: async () => {
    if (isCloudMode && supabase) {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (!error && user) {
        return {
          id: user.id,
          email: user.email,
          username: user.email.split('@')[0],
          isGuest: user.email === 'guest@gmail.com'
        };
      }
    }
    
    // Sandbox mode
    const localUser = localStorage.getItem('psy_local_user');
    return localUser ? JSON.parse(localUser) : null;
  },

  // Log in
  login: async (username, password) => {
    const credentials = getMappedCredentials(username, password);

    if (isCloudMode && supabase) {
      // 1. Try to sign in
      let { data, error } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password
      });

      // 2. Handle failures gracefully
      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          // Try to automatically sign up in case the user doesn't exist
          const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
            email: credentials.email,
            password: credentials.password
          });
          
          if (signUpError) {
            throw new Error(`自動建立測試帳號失敗: ${signUpError.message}`);
          }
          
          // Handle Supabase Anti-Enumeration: If user is null, it means email exists but password was wrong
          if (!signUpData || !signUpData.user) {
            throw new Error('登入失敗：密碼不正確！如果您是在 Supabase 後台手動建立此帳號，請確保設定的密碼為 "Toby_Kitty_Secure_2026!"。');
          }
          
          data = signUpData;
        } else if (error.message.includes('Email not confirmed')) {
          throw new Error('登入失敗：該帳號尚未通過驗證。請前往 Supabase 的 Users 頁面，點擊該帳號右側的更多按鈕，選擇 "Confirm user" 來確認信箱。');
        } else {
          throw error;
        }
      }

      // 3. Final null check safety
      if (!data || !data.user) {
        throw new Error('登入失敗：無法取得使用者資訊，請確認帳號狀態。');
      }

      const user = data.user;
      return {
        id: user.id,
        email: user.email,
        username: user.email.split('@')[0],
        isGuest: user.email === 'guest@gmail.com'
      };
    } else {
      // Sandbox mode mock login
      const mockUser = {
        id: 'sandbox-guest-id',
        email: credentials.email,
        username: username,
        isGuest: username.toLowerCase() === 'guest'
      };
      localStorage.setItem('psy_local_user', JSON.stringify(mockUser));
      return mockUser;
    }
  },

  // Log out
  logout: async () => {
    if (isCloudMode && supabase) {
      await supabase.auth.signOut();
    }
    localStorage.removeItem('psy_local_user');
  },

  // Save Quiz Result (Legacy fallback wrapper)
  saveResult: async (resultData) => {
    return StorageEngine.saveQuizResult({
      userId: null,
      courseId: resultData.courseId,
      week: resultData.weekId,
      score: resultData.score,
      answers: resultData.responseVector,
      report: resultData.cdm_metrics || resultData
    });
  },

  // 1. Get Quiz Results (Extended wrapper for active dashboards)
  getQuizResults: async (userId) => {
    const history = await StorageEngine.getHistory();
    return history.map(item => ({
      ...item,
      week: item.week_id || item.week,
      report: item.cdm_metrics || item.report
    }));
  },

  // 2. Save Quiz Result (Adaptive Mastery Enhanced!)
  saveQuizResult: async ({ userId, courseId, week, score, answers, report, masteredQuestions = [], attemptsCount = 1 }) => {
    const user = await StorageEngine.getCurrentUser();
    if (!user) throw new Error('請先登入以保存測驗診斷結果');

    const formattedResult = {
      user_id: user.id,
      course_id: courseId,
      week_id: week,
      score: score,
      total_questions: report?.totalQuestions || 10,
      response_vector: answers || [],
      ctt_metrics: report?.ctt || report || null,
      irt_metrics: report?.irt || report || null,
      cdm_metrics: report || null,
      mastered_questions: masteredQuestions,
      attempts_count: attemptsCount,
      created_at: new Date().toISOString()
    };

    if (isCloudMode && supabase && user.id !== 'sandbox-guest-id') {
      // Check if there is an existing record to merge attempts and masteries
      const { data: existing } = await supabase
        .from('quiz_results')
        .select('*')
        .eq('user_id', user.id)
        .eq('course_id', courseId)
        .eq('week_id', week)
        .maybeSingle();

      if (existing) {
        const mergedMastered = Array.from(new Set([...(existing.mastered_questions || []), ...masteredQuestions]));
        const mergedAttempts = (existing.attempts_count || 0) + 1;
        formattedResult.mastered_questions = mergedMastered;
        formattedResult.attempts_count = mergedAttempts;
        formattedResult.id = existing.id; // Preserve primary key

        const { data, error } = await supabase
          .from('quiz_results')
          .upsert([formattedResult])
          .select();
        if (error) throw error;
        return data[0];
      } else {
        const { data, error } = await supabase
          .from('quiz_results')
          .insert([formattedResult])
          .select();
        if (error) throw error;
        return data[0];
      }
    } else {
      // Sandbox local storage
      const history = StorageEngine.getLocalHistory();
      const existingIdx = history.findIndex(item => 
        item.user_id === user.id && 
        item.course_id === courseId && 
        (item.week_id === week || item.week === week)
      );

      if (existingIdx !== -1) {
        const existing = history[existingIdx];
        const mergedMastered = Array.from(new Set([...(existing.mastered_questions || []), ...masteredQuestions]));
        const mergedAttempts = (existing.attempts_count || 0) + 1;
        
        history[existingIdx] = {
          ...existing,
          ...formattedResult,
          mastered_questions: mergedMastered,
          attempts_count: mergedAttempts
        };
      } else {
        history.unshift({
          id: `local-res-${Date.now()}`,
          ...formattedResult
        });
      }
      localStorage.setItem('psy_local_results', JSON.stringify(history));
      return history[existingIdx !== -1 ? existingIdx : 0];
    }
  },

  // 3. Reset Week Mastery
  resetWeekMastery: async (userId, courseId, week) => {
    const user = await StorageEngine.getCurrentUser();
    if (!user) throw new Error('請先登入以重置掌握狀態');

    if (isCloudMode && supabase && user.id !== 'sandbox-guest-id') {
      const { error } = await supabase
        .from('quiz_results')
        .delete()
        .eq('user_id', user.id)
        .eq('course_id', courseId)
        .eq('week_id', week);

      if (error) throw error;
    } else {
      // Local sandbox reset
      let history = StorageEngine.getLocalHistory();
      history = history.filter(item => 
        !(item.user_id === user.id && 
          item.course_id === courseId && 
          (item.week_id === week || item.week === week))
      );
      localStorage.setItem('psy_local_results', JSON.stringify(history));
    }
  },

  // Get Quiz Results
  getHistory: async () => {
    const user = await StorageEngine.getCurrentUser();
    if (!user) return [];

    if (isCloudMode && supabase && user.id !== 'sandbox-guest-id') {
      const { data, error } = await supabase
        .from('quiz_results')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Failed to load cloud results, falling back to local history:', error);
        return StorageEngine.getLocalHistory();
      }
      return data;
    } else {
      return StorageEngine.getLocalHistory();
    }
  },

  getLocalHistory: () => {
    const raw = localStorage.getItem('psy_local_results');
    return raw ? JSON.parse(raw) : [];
  }
};
