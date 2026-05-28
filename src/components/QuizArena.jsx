import React, { useEffect, useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, Send, AlertTriangle, HelpCircle, Award, RefreshCw, CheckCircle } from 'lucide-react';
import { calculateCTT, calculateIRT2PL, calculateCDM } from '../utils/psychometricsEngine';
import { StorageEngine } from '../utils/supabaseClient';

export default function QuizArena({ courseId, weekId, quizFileName, user, onComplete, onBackToDashboard }) {
  const [quizData, setQuizData] = useState(null);
  const [masteredList, setMasteredList] = useState([]);
  const [attemptsCount, setAttemptsCount] = useState(0);
  const [activeQuestions, setActiveQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const cardRef = useRef(null);

  // Auto-render math when question changes
  useEffect(() => {
    const renderMath = () => {
      if (window.renderMathInElement && cardRef.current && !loading) {
        window.renderMathInElement(cardRef.current, {
          delimiters: [
            { left: '$$', right: '$$', display: true },
            { left: '$', right: '$', display: false },
            { left: '\\(', right: '\\)', display: false },
            { left: '\\[', right: '\\]', display: true }
          ],
          throwOnError: false
        });
      }
    };

    const timer = setTimeout(renderMath, 150);
    return () => clearTimeout(timer);
  }, [currentIdx, loading, activeQuestions]);

  useEffect(() => {
    loadQuizAndMastery();
  }, [quizFileName, weekId, courseId]);

  const loadQuizAndMastery = async () => {
    setLoading(true);
    try {
      // 1. Fetch raw quiz data
      const response = await fetch(`${import.meta.env.BASE_URL || '/'}data/${quizFileName || 'python_week1.json'}`);
      const data = await response.json();
      setQuizData(data);

      if (!data || !data.questions) throw new Error('Invalid quiz data');

      // 2. Fetch user's saved mastery progress for this week
      const results = await StorageEngine.getQuizResults(user?.id);
      const historyArr = Array.isArray(results) ? results : [];
      const weekProgress = historyArr.find(r => r.course_id === courseId && r.week === weekId);
      const mastered = weekProgress?.mastered_questions || [];
      const attempts = weekProgress?.attempts_count || 0;
      
      setMasteredList(mastered);
      setAttemptsCount(attempts);

      // 3. Filter unmastered questions and shuffle to pick 10
      const unmastered = data.questions.filter(q => !mastered.includes(q.id));
      
      let selected = [];
      if (unmastered.length > 0) {
        const shuffled = [...unmastered].sort(() => Math.random() - 0.5);
        selected = shuffled.slice(0, 10);
      }
      
      setActiveQuestions(selected);
      setCurrentIdx(0);

      // 4. Initialize answers for the selected 10 questions
      const initialAnswers = {};
      selected.forEach(q => {
        initialAnswers[q.id] = q.type === 'multiple' ? [] : '';
      });
      setAnswers(initialAnswers);
    } catch (err) {
      console.error('Failed to load quiz or progress:', err);
      setQuizData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleResetMastery = async () => {
    if (window.confirm('確定要清除本週所有已掌握的題目並重新開始嗎？')) {
      setLoading(true);
      try {
        await StorageEngine.resetWeekMastery(user?.id, courseId, weekId);
        await loadQuizAndMastery();
      } catch (err) {
        console.error('Failed to reset mastery:', err);
      } finally {
        setLoading(false);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-[50vh] items-center justify-center gap-4 text-slate-400">
        <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-sm font-semibold animate-pulse">過濾已掌握考點，抽取 10 題微診斷中...</p>
      </div>
    );
  }

  if (!quizData) {
    return (
      <div className="flex flex-col min-h-[50vh] items-center justify-center gap-4">
        <AlertTriangle className="w-12 h-12 text-yellow-500" />
        <span className="text-sm text-slate-400">無法載入題庫，請確認 /public/data/{quizFileName} 檔案是否存在。</span>
        {onBackToDashboard && (
          <button onClick={onBackToDashboard} className="px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-200">
            返回控制台
          </button>
        )}
      </div>
    );
  }

  // 🏆 Golden Mastery Screen (100% Correct Mastery!)
  if (activeQuestions.length === 0) {
    const totalInPool = quizData.questions.length;
    return (
      <div className="max-w-2xl mx-auto my-6 p-8 md:p-10 rounded-3xl bg-gradient-to-b from-[#121008] to-[#060814] border border-yellow-500/30 flex flex-col items-center text-center gap-6 shadow-[0_25px_60px_rgba(0,0,0,0.6)] backdrop-blur-md">
        <div className="w-20 h-20 rounded-full bg-yellow-500/10 border border-yellow-500/50 flex items-center justify-center text-yellow-400 shadow-[0_0_35px_rgba(234,179,8,0.25)] animate-pulse">
          <Award className="w-10 h-10" />
        </div>
        
        <div>
          <span className="text-[10px] font-extrabold text-yellow-400 uppercase tracking-widest bg-yellow-500/10 border border-yellow-500/20 px-3 py-1 rounded-full">GOLDEN MASTERY UNLOCKED</span>
          <h3 className="text-xl md:text-2xl font-extrabold text-white mt-4">恭喜！您已 100% 掌握本週所有知識！</h3>
          <p className="text-sm text-slate-400 mt-2 max-w-md">本週共 {totalInPool} 道核心考點已全部被您攻克。經典測驗學、項目反應理論與認知診斷模型皆確認您已無薄弱知識點！</p>
        </div>

        <div className="w-full max-w-sm bg-slate-950/60 border border-slate-800/80 rounded-2xl p-4 flex justify-around items-center text-center">
          <div>
            <span className="text-[10px] text-slate-500 block uppercase font-mono">已消滅題數</span>
            <span className="text-lg font-bold text-white">{totalInPool} / {totalInPool} 題</span>
          </div>
          <div className="h-8 w-px bg-slate-800"></div>
          <div>
            <span className="text-[10px] text-slate-500 block uppercase font-mono">累計挑戰次數</span>
            <span className="text-lg font-bold text-indigo-400">{attemptsCount} 次</span>
          </div>
        </div>

        <button 
          onClick={handleResetMastery} 
          className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-white text-xs font-extrabold transition shadow-lg hover:shadow-yellow-500/20 active:scale-95"
        >
          <RefreshCw className="w-4 h-4" />
          <span>重設本週掌握狀態，重新刷題</span>
        </button>
      </div>
    );
  }

  const currentQuestion = activeQuestions[currentIdx];

  const handleSingleSelect = (option) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: option
    }));
  };

  const handleMultiSelect = (option) => {
    const currentSelection = answers[currentQuestion.id] || [];
    let nextSelection;
    if (currentSelection.includes(option)) {
      nextSelection = currentSelection.filter(x => x !== option);
    } else {
      nextSelection = [...currentSelection, option].sort();
    }
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: nextSelection
    }));
  };

  const handleFillInput = (val) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: val
    }));
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const newlyCorrect = [];
      const responseVector = [];
      let score = 0;

      activeQuestions.forEach(q => {
        const userAns = answers[q.id];
        let isCorrect = 0;

        if (q.type === 'single') {
          isCorrect = userAns === q.answer ? 1 : 0;
        } else if (q.type === 'multiple') {
          const cleanUser = Array.isArray(userAns) ? [...userAns].sort().join(',') : '';
          const cleanAns = Array.isArray(q.answer) ? [...q.answer].sort().join(',') : q.answer;
          isCorrect = cleanUser === cleanAns ? 1 : 0;
        } else if (q.type === 'fill') {
          const cleanUser = typeof userAns === 'string' ? userAns.trim().toLowerCase() : '';
          const cleanAns = q.answer.trim().toLowerCase();
          
          if (cleanAns.includes('或')) {
            const synonyms = cleanAns.split(/[\(\)或]/).map(s => s.trim().toLowerCase()).filter(s => s);
            isCorrect = synonyms.some(syn => cleanUser.includes(syn) || syn.includes(cleanUser)) ? 1 : 0;
          } else {
            isCorrect = cleanUser === cleanAns ? 1 : 0;
          }
        }

        if (isCorrect === 1) {
          score++;
          newlyCorrect.push(q.id);
        }
        responseVector.push(isCorrect);
      });

      // Combine previous mastered questions with newly correct ones
      const nextMastered = Array.from(new Set([...masteredList, ...newlyCorrect]));

      // 15 virtual students as background cohort reference for this specific 10-question vector
      const cohortMatrix = [];
      cohortMatrix.push(responseVector);

      for (let i = 0; i < 15; i++) {
        const virtualVector = [];
        const vAbility = -2.0 + (i * 0.28);
        
        activeQuestions.forEach(q => {
          const qIdNum = parseInt(q.id.replace('Q', ''));
          const qDiff = (qIdNum % 5) - 2;
          const qDisc = 1.0 + (qIdNum % 3) * 0.3;
          
          const z = qDisc * (vAbility - qDiff);
          const pSuccess = 1 / (1 + Math.exp(-z));
          
          virtualVector.push(Math.random() < pSuccess ? 1 : 0);
        });
        cohortMatrix.push(virtualVector);
      }

      const itemNames = activeQuestions.map(q => q.id);
      const attributeNames = quizData.knowledge_points ? Object.keys(quizData.knowledge_points) : [];
      const qMatrix = activeQuestions.map(q => q.q_vector || Array(attributeNames.length).fill(0));

      const cttResults = calculateCTT(cohortMatrix, itemNames);
      const irtResults = calculateIRT2PL(cohortMatrix, itemNames);
      const cdmResults = calculateCDM(cohortMatrix, itemNames, qMatrix, attributeNames);

      const theta = irtResults.studentDetails?.[0]?.theta ?? 0;

      const resultPayload = {
        score: score,
        totalQuestions: activeQuestions.length,
        responseVector: responseVector,
        rawAnswers: answers,
        theta: theta,
        cttMetrics: cttResults,
        irtMetrics: irtResults,
        cdmMetrics: cdmResults,
        masteredQuestions: nextMastered,
        attemptsCount: attemptsCount + 1,
        totalQuestionsInPool: quizData.questions.length,
        activeQuestions: activeQuestions,
        knowledgePoints: quizData.knowledge_points,
        courseTitle: quizData.title,
        created_at: new Date().toISOString()
      };

      if (onComplete) {
        await onComplete(resultPayload);
      }
    } catch (err) {
      console.error('Quiz submission error:', err);
      alert('測驗提交失敗: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const progressPercent = Math.round(((currentIdx + 1) / activeQuestions.length) * 100);
  const unansweredCount = activeQuestions.filter(q => {
    const ans = answers[q.id];
    return q.type === 'multiple' ? ans.length === 0 : !ans;
  }).length;

  const totalPoolSize = quizData.questions.length;
  const masterPercentage = Math.round((masteredList.length / totalPoolSize) * 100);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Dynamic Mini Mastery Overview */}
      <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-indigo-950/20 via-slate-900/40 to-pink-950/10 border border-slate-800/80 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 border border-indigo-500/20">
            <Award className="w-5 h-5 text-pink-400" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">本週自適應微診斷 (每次限考 10 題)</h4>
            <p className="text-[10px] text-slate-400 mt-0.5">做對題目會被自動移出，下次不再抽中。累計已消滅 {masteredList.length} / {totalPoolSize} 題 ({masterPercentage}%)</p>
          </div>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="flex-1 md:w-28 bg-slate-950 h-2 rounded-full border border-slate-800/60 overflow-hidden shrink-0">
            <div className="bg-gradient-to-r from-pink-500 to-indigo-500 h-full rounded-full transition-all duration-300" style={{ width: `${masterPercentage}%` }}></div>
          </div>
          <button 
            onClick={handleResetMastery}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-[10px] font-bold text-slate-400 hover:text-white transition"
          >
            <RefreshCw className="w-3 h-3" />
            <span>重設掌握</span>
          </button>
        </div>
      </div>

      {/* Modern Card Progress Container */}
      <div className="p-6 rounded-3xl bg-[#090b16]/30 border border-slate-800/60 mb-6 shadow-lg backdrop-blur-md">
        <div className="flex justify-between items-center mb-3 text-xs">
          <span className="text-cyan-400 font-extrabold tracking-wider">{quizData.title}</span>
          <span className="text-slate-400">題目 {currentIdx + 1} / {activeQuestions.length}</span>
        </div>
        <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden border border-slate-800/40">
          <div className="bg-gradient-to-r from-pink-500 via-indigo-500 to-cyan-500 h-full rounded-full transition-all duration-300" style={{ width: `${progressPercent}%` }}></div>
        </div>
      </div>

      {/* Main Question Arena Card */}
      <div ref={cardRef} key={currentQuestion.id} className="p-8 md:p-10 rounded-3xl bg-gradient-to-b from-[#090b16]/40 to-[#05060c]/60 border border-slate-800/80 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-md min-h-[380px] flex flex-col justify-between">
        <div>
          {/* Question Meta Info */}
          <div className="flex flex-wrap gap-2.5 items-center mb-6">
            <span className="text-[10px] font-extrabold px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 tracking-wider">
              {currentQuestion.type === 'single' ? '單選題' : currentQuestion.type === 'multiple' ? '多選題' : '填空題'}
            </span>
            <span className="text-[10px] font-semibold px-3 py-1 rounded-full bg-white/5 border border-white/5 text-slate-400">
              主要知識點：{quizData.knowledge_points ? quizData.knowledge_points[currentQuestion.kp] : '未指定'}
            </span>
          </div>

          {/* Question Title */}
          <h3 className="text-lg md:text-xl font-bold leading-relaxed text-white mb-8">
            {currentIdx + 1}. {currentQuestion.title}
          </h3>

          {/* Answer Inputs based on Question Type */}
          {currentQuestion.type === 'single' && (
            <div className="flex flex-col gap-3.5">
              {Object.entries(currentQuestion.options || {}).map(([key, val]) => (
                <div 
                  key={key}
                  className={`p-4 rounded-2xl border transition duration-200 cursor-pointer flex items-center gap-4 ${
                    answers[currentQuestion.id] === key 
                      ? 'bg-gradient-to-r from-indigo-950/40 to-pink-950/15 border-pink-500/80 shadow-[0_0_15px_rgba(236,72,153,0.08)]' 
                      : 'bg-slate-900/15 border-slate-800/60 hover:bg-slate-900/40 hover:border-slate-700'
                  }`}
                  onClick={() => handleSingleSelect(key)}
                >
                  <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-mono font-bold ${
                    answers[currentQuestion.id] === key 
                      ? 'bg-pink-500 text-white shadow-[0_0_8px_rgba(236,72,153,0.3)]' 
                      : 'bg-slate-950 text-slate-500 border border-slate-800'
                  }`}>{key}</div>
                  <div className="text-sm font-semibold text-slate-200">{val}</div>
                </div>
              ))}
            </div>
          )}

          {currentQuestion.type === 'multiple' && (
            <div>
              <div className="flex flex-col gap-3.5 mb-4">
                {Object.entries(currentQuestion.options || {}).map(([key, val]) => {
                  const isSel = (answers[currentQuestion.id] || []).includes(key);
                  return (
                    <div 
                      key={key}
                      className={`p-4 rounded-2xl border transition duration-200 cursor-pointer flex items-center gap-4 ${
                        isSel 
                          ? 'bg-gradient-to-r from-indigo-950/40 to-pink-950/15 border-pink-500/80 shadow-[0_0_15px_rgba(236,72,153,0.08)]' 
                          : 'bg-slate-900/15 border-slate-800/60 hover:bg-slate-900/40 hover:border-slate-700'
                      }`}
                      onClick={() => handleMultiSelect(key)}
                    >
                      <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-mono font-bold ${
                        isSel 
                          ? 'bg-pink-500 text-white shadow-[0_0_8px_rgba(236,72,153,0.3)]' 
                          : 'bg-slate-950 text-slate-500 border border-slate-800'
                      }`}>{key}</div>
                      <div className="text-sm font-semibold text-slate-200">{val}</div>
                    </div>
                  );
                })}
              </div>
              <p className="text-[11px] text-slate-400 mt-2 flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-pink-400" />
                <span>提示：本題為複選題，答對需選擇所有正確選項，不倒扣。</span>
              </p>
            </div>
          )}

          {currentQuestion.type === 'fill' && (
            <div className="flex flex-col gap-3.5">
              <input 
                type="text" 
                className="w-full px-5 py-4 rounded-2xl bg-slate-950/70 border border-slate-800 focus:border-pink-500/80 text-sm font-semibold text-white transition focus:outline-none focus:shadow-[0_0_15px_rgba(236,72,153,0.08)]"
                placeholder="請在此處輸入您的解答（答案不區分大小寫）"
                value={answers[currentQuestion.id] || ''}
                onChange={(e) => handleFillInput(e.target.value)}
              />
              <div className="p-4 rounded-xl bg-indigo-500/5 border border-indigo-500/10 flex gap-2.5 items-center">
                <HelpCircle className="w-4 h-4 text-cyan-400 shrink-0" />
                <span className="text-xs text-indigo-300">請輸入簡潔的關鍵詞，如「PEP 8」、「\n」或英文術語。</span>
              </div>
            </div>
          )}
        </div>

        {/* Card Navigation Footer */}
        <div className="flex justify-between items-center mt-12 gap-4">
          <button 
            onClick={() => setCurrentIdx(prev => Math.max(0, prev - 1))}
            className="flex items-center gap-1.5 px-4.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-300 hover:text-white transition disabled:opacity-40 disabled:cursor-not-allowed"
            disabled={currentIdx === 0}
          >
            <ChevronLeft className="w-4 h-4" /> 上一題
          </button>

          {currentIdx === activeQuestions.length - 1 ? (
            <button 
              onClick={handleSubmit} 
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white text-xs font-extrabold transition shadow-lg hover:shadow-emerald-500/25 active:scale-95 disabled:opacity-50"
              disabled={submitting}
            >
              {submitting ? '計算心理計量分析中...' : '提交測驗並解鎖診斷'} <Send className="w-4 h-4" />
            </button>
          ) : (
            <button 
              onClick={() => setCurrentIdx(prev => Math.min(activeQuestions.length - 1, prev + 1))}
              className="flex items-center gap-1.5 px-4.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-300 hover:text-white transition"
            >
              下一題 <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
