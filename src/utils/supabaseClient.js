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

  // Save Quiz Result
  saveResult: async (resultData) => {
    const user = await StorageEngine.getCurrentUser();
    if (!user) throw new Error('請先登入以保存測驗診斷結果');

    const formattedResult = {
      user_id: user.id,
      course_id: resultData.courseId,
      week_id: resultData.weekId,
      score: resultData.score,
      total_questions: resultData.totalQuestions,
      response_vector: resultData.responseVector,
      ctt_metrics: resultData.cttMetrics,
      irt_metrics: resultData.irtMetrics,
      cdm_metrics: resultData.cdmMetrics,
      created_at: new Date().toISOString()
    };

    if (isCloudMode && supabase && user.id !== 'sandbox-guest-id') {
      const { data, error } = await supabase
        .from('quiz_results')
        .insert([formattedResult])
        .select();

      if (error) throw error;
      return data[0];
    } else {
      // Sandbox storage
      const history = StorageEngine.getLocalHistory();
      const newResult = {
        id: `local-res-${Date.now()}`,
        ...formattedResult
      };
      history.unshift(newResult);
      localStorage.setItem('psy_local_results', JSON.stringify(history));
      return newResult;
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
