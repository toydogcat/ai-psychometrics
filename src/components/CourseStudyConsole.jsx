import React, { useState, useEffect } from 'react';
import { BookOpen, Award, CheckCircle, ChevronLeft, ArrowRight, Check, RefreshCw, Star } from 'lucide-react';
import MarkdownViewer from './MarkdownViewer';
import QuizArena from './QuizArena';
import PsychometricsReport from './PsychometricsReport';
import { StorageEngine } from '../utils/supabaseClient';

export default function CourseStudyConsole({ course, user, onBackToLobby }) {
  const [activeWeek, setActiveWeek] = useState(1);
  const [activeTab, setActiveTab] = useState('reading'); // 'reading' or 'quiz'
  const [markdownText, setMarkdownText] = useState('');
  const [loadingMd, setLoadingMd] = useState(false);
  const [courseProgress, setCourseProgress] = useState({});
  const [currentQuizReport, setCurrentQuizReport] = useState(null);

  const activeWeekInfo = course.syllabus.find(s => s.week === activeWeek) || course.syllabus[0];

  // 1. Fetch weekly Markdown content
  useEffect(() => {
    if (!activeWeekInfo) return;
    
    const fetchMarkdown = async () => {
      setLoadingMd(true);
      try {
        const basePath = import.meta.env.BASE_URL || '/';
        const res = await fetch(`${basePath}courses/${course.id}/${activeWeekInfo.mdPath}`);
        if (!res.ok) throw new Error('Markdown file not found');
        const text = await res.text();
        setMarkdownText(text);
      } catch (err) {
        console.error('Failed to load markdown:', err);
        setMarkdownText(`# 第 ${activeWeek} 週：${activeWeekInfo.title}\n\n⚠️ 課程講義內容載入失敗，或此講義正在編撰中。您可以直接切換到「自我診斷評量」分頁進行自我檢測！`);
      } finally {
        setLoadingMd(false);
      }
    };

    fetchMarkdown();
    setActiveTab('reading'); // Default to reading when changing weeks
    setCurrentQuizReport(null); // Clear active report to reload from progress state
  }, [activeWeek, course.id, activeWeekInfo]);

  // 2. Load user's saved progress (quiz logs)
  const loadUserProgress = async () => {
    try {
      const results = await StorageEngine.getQuizResults(user?.id);
      const progressMap = {};
      
      if (results && Array.isArray(results)) {
        results.forEach(res => {
          if (res.course_id === course.id) {
            progressMap[res.week] = res;
          }
        });
      }
      setCourseProgress(progressMap);
    } catch (err) {
      console.error('Failed to load progress from StorageEngine:', err);
    }
  };

  useEffect(() => {
    loadUserProgress();
  }, [course.id, user]);

  // 3. Handle successful quiz completion
  const handleQuizComplete = async (reportData) => {
    setCurrentQuizReport(reportData);
    
    try {
      await StorageEngine.saveQuizResult({
        userId: user?.id,
        courseId: course.id,
        week: activeWeek,
        score: reportData.score,
        answers: reportData.rawAnswers,
        report: reportData,
        masteredQuestions: reportData.masteredQuestions,
        attemptsCount: reportData.attemptsCount
      });
      await loadUserProgress();
    } catch (err) {
      console.error('Failed to auto-save to cloud:', err);
    }
  };

  const handleResetMastery = async () => {
    if (window.confirm('確定要清除本週所有已掌握的題目並重新開始嗎？')) {
      try {
        await StorageEngine.resetWeekMastery(user?.id, course.id, activeWeek);
        setCurrentQuizReport(null);
        await loadUserProgress();
      } catch (err) {
        console.error('Failed to reset week mastery:', err);
      }
    }
  };

  const savedRecord = courseProgress[activeWeek];
  const savedReport = savedRecord?.report;
  const showReport = currentQuizReport || savedReport;

  // Adaptive progress calculations
  const masteredList = savedRecord?.mastered_questions || currentQuizReport?.masteredQuestions || [];
  const attemptsCount = savedRecord?.attempts_count || currentQuizReport?.attemptsCount || 0;
  
  // Calculate completed weeks count (where week is 100% mastered or has at least one complete attempt)
  const completedWeeksCount = Object.keys(courseProgress).length;
  const progressPercent = Math.round((completedWeeksCount / course.syllabus.length) * 100) || 0;

  return (
    <div className="min-h-screen bg-[#060814] text-slate-100 flex flex-col font-sans">
      {/* 🚀 Portal Top Navbar */}
      <header className="sticky top-0 z-40 bg-[#090b16]/80 border-b border-slate-800/70 backdrop-blur-md px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onBackToLobby}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:bg-slate-800/80 text-slate-300 transition duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="text-xs font-semibold">返回大廳</span>
          </button>
          <div className="h-5 w-px bg-slate-800"></div>
          <div>
            <h2 className="text-base md:text-lg font-bold bg-gradient-to-r from-pink-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">{course.title}</h2>
            <p className="text-[10px] text-slate-400 tracking-wider">第 {activeWeek} 週 / 共 {course.syllabus.length} 週</p>
          </div>
        </div>

        {/* Dynamic Progress Indicator */}
        <div className="flex items-center gap-4 select-none">
          <div className="text-right hidden md:block">
            <p className="text-[10px] text-slate-400 uppercase tracking-widest">COURSE PROGRESS</p>
            <p className="text-xs font-extrabold text-indigo-400">{completedWeeksCount} / {course.syllabus.length} 單元已評估 ({progressPercent}%)</p>
          </div>
          <div className="w-28 bg-slate-950 h-2 rounded-full border border-slate-800/60 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-pink-500 via-indigo-500 to-cyan-500 h-full rounded-full transition-all duration-500" 
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>
      </header>

      {/* 🏛️ Main Workspace Layout */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Left Visual Syllabus Planner (Sidebar) */}
        <aside className="w-full md:w-84 border-r border-slate-800/60 bg-[#090b16]/30 p-5 flex flex-col gap-4 shrink-0 overflow-y-auto max-h-[35vh] md:max-h-[calc(100vh-73px)] scrollbar-thin">
          <div className="pb-3 border-b border-slate-800/50">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-semibold text-indigo-300">
              <BookOpen className="w-3.5 h-3.5 text-pink-400" />
              <span>課程大綱及進度規劃</span>
            </div>
          </div>

          <div className="flex-1 space-y-2.5">
            {course.syllabus.map((syll) => {
              const isCompleted = !!courseProgress[syll.week];
              const isActive = activeWeek === syll.week;
              const weekNumStr = syll.week < 10 ? `0${syll.week}` : `${syll.week}`;
              
              return (
                <button
                  key={syll.week}
                  onClick={() => setActiveWeek(syll.week)}
                  className={`w-full text-left p-3.5 rounded-2xl flex items-center justify-between border transition duration-200 group active:scale-[0.98] ${
                    isActive 
                      ? 'bg-gradient-to-r from-indigo-950/40 via-pink-950/10 to-pink-950/5 border-pink-500/80 shadow-[0_0_15px_rgba(236,72,153,0.08)]' 
                      : 'bg-slate-900/15 border-slate-800/50 hover:bg-slate-900/40 hover:border-slate-700'
                  }`}
                >
                  <div className="flex flex-col gap-1 pr-2 overflow-hidden">
                    <span className={`text-[9px] font-bold tracking-widest font-mono ${isActive ? 'text-pink-400' : 'text-indigo-400'}`}>
                      WEEK {weekNumStr}
                    </span>
                    <span className={`text-xs font-semibold truncate max-w-[190px] ${isActive ? 'text-white' : 'text-slate-300 group-hover:text-white'}`}>
                      {syll.title.replace(/^第\s*\d+\s*週\s*-?/, '')}
                    </span>
                  </div>

                  <div className="shrink-0 pl-1">
                    {isCompleted ? (
                      <div className="w-5 h-5 rounded-full bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center shadow-[0_0_10px_rgba(16,185,129,0.15)]" title="已進行過評估">
                        <Check className="w-3 h-3 text-emerald-400" />
                      </div>
                    ) : (
                      <div className="w-5 h-5 rounded-full bg-slate-950/60 border border-slate-800 flex items-center justify-center text-[9px] text-slate-500 font-mono">
                        {weekNumStr}
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </aside>

        {/* Center Canvas */}
        <main className="flex-1 flex flex-col bg-[#05060e] p-6 md:p-8 overflow-y-auto max-h-[calc(100vh-73px)]">
          {/* Workspace Tabs */}
          <div className="flex border-b border-slate-800/60 mb-6">
            <button
              onClick={() => setActiveTab('reading')}
              className={`pb-3.5 px-6 font-bold text-sm border-b-2 transition duration-200 flex items-center gap-2 ${
                activeTab === 'reading' 
                  ? 'border-pink-500 text-white' 
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>📚 本週單元學習</span>
            </button>
            <button
              onClick={() => setActiveTab('quiz')}
              className={`pb-3.5 px-6 font-bold text-sm border-b-2 transition duration-200 flex items-center gap-2 relative ${
                activeTab === 'quiz' 
                  ? 'border-indigo-500 text-white' 
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>⚡ 自我診斷評量</span>
              {courseProgress[activeWeek] && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-400 rounded-full animate-ping"></span>
              )}
            </button>
          </div>

          {/* Tab Workspaces */}
          <div className="flex-1 flex flex-col">
            {activeTab === 'reading' ? (
              <div className="flex flex-col gap-6">
                {loadingMd ? (
                  <div className="flex flex-col items-center justify-center p-20 gap-4">
                    <div className="w-10 h-10 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-sm text-slate-400 animate-pulse">正在編譯並渲染本週課程內容...</p>
                  </div>
                ) : (
                  <>
                    <MarkdownViewer rawText={markdownText} />
                    
                    {/* Bottom Guide to Assessment */}
                    <div className="max-w-4xl p-6 rounded-3xl bg-gradient-to-r from-indigo-950/30 via-[#090b1c]/50 to-pink-950/15 border border-slate-800/80 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 shadow-xl">
                      <div>
                        <h4 className="text-base font-bold text-white">本週單元研讀完畢！</h4>
                        <p className="text-xs text-slate-400 mt-1">現在可以使用我們的 AI 心理計量模型檢測您本週的學習吸收力。</p>
                      </div>
                      <button
                        onClick={() => {
                          setActiveTab('quiz');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-indigo-500 hover:from-pink-600 hover:to-indigo-600 text-white text-xs font-extrabold transition shadow-lg hover:shadow-indigo-500/25 active:scale-95 whitespace-nowrap"
                      >
                        <span>開始自我挑戰評量</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                {showReport ? (
                  // Review Mode: Show Diagnostic Report with Mastery Dashboard
                  <div className="flex flex-col gap-4">
                    {/* 🏆 High-End Adaptive Mastery Dashboard */}
                    <div className="p-5 rounded-2xl bg-gradient-to-r from-indigo-950/30 via-slate-900/40 to-pink-950/15 border border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4 shadow-lg select-none">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 border border-indigo-500/20">
                          <Star className="w-5 h-5 text-yellow-400 animate-spin-slow" />
                        </div>
                        <div>
                          <span className="text-[9px] font-bold text-pink-400 uppercase tracking-widest">ADAPTIVE STUDY DASHBOARD</span>
                          <h4 className="text-sm font-bold text-white">
                            本週考點掌握進度：{masteredList.length} / {showReport.totalQuestionsInPool || 15} 題 ({Math.round((masteredList.length / (showReport.totalQuestionsInPool || 15)) * 100)}%)
                          </h4>
                          <p className="text-xs text-slate-400 mt-0.5">您已累計嘗試了 {attemptsCount} 次微診斷測驗。做對題目已被完美移出題庫。</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 w-full md:w-auto shrink-0">
                        {masteredList.length < (showReport.totalQuestionsInPool || 15) ? (
                          <button
                            onClick={() => {
                              // Reset active report to trigger re-entering QuizArena with filtered remaining questions!
                              setCurrentQuizReport(null);
                              // Temporary wipe from map to render QuizArena
                              const progressCopy = { ...courseProgress };
                              if (progressCopy[activeWeek]) {
                                progressCopy[activeWeek] = {
                                  ...progressCopy[activeWeek],
                                  report: null // Temporarily clear active report
                                };
                              }
                              setCourseProgress(progressCopy);
                            }}
                            className="px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-indigo-500 hover:from-pink-600 hover:to-indigo-600 text-xs font-extrabold text-white transition active:scale-95 shadow-md shrink-0 flex items-center gap-1.5"
                          >
                            <span>攻克剩餘 {(showReport.totalQuestionsInPool || 15) - masteredList.length} 題錯題 ⚡</span>
                          </button>
                        ) : (
                          <div className="px-3.5 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-xs font-bold flex items-center gap-1 shrink-0">
                            <Check className="w-3.5 h-3.5" />
                            <span>100% 掌握大師徽章</span>
                          </div>
                        )}

                        <button
                          onClick={handleResetMastery}
                          className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-[10px] font-bold text-slate-400 hover:text-white transition active:scale-95 shrink-0 flex items-center gap-1"
                        >
                          <RefreshCw className="w-3 h-3" />
                          <span>重設掌握</span>
                        </button>
                      </div>
                    </div>
                    
                    <PsychometricsReport 
                      reportData={showReport} 
                      userAbility={showReport.theta || 0}
                      courseTitle={course.title}
                      knowledgePoints={showReport.knowledgePoints || (courseProgress[activeWeek]?.report?.knowledgePoints)}
                    />
                  </div>
                ) : (
                  // Quizzing Mode
                  <QuizArena 
                    courseId={course.id}
                    weekId={activeWeek}
                    quizFileName={activeWeekInfo.quizPath} 
                    user={user}
                    onComplete={handleQuizComplete}
                    onBackToDashboard={() => setActiveTab('reading')}
                  />
                )}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
