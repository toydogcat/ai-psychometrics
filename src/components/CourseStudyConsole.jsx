import React, { useState, useEffect } from 'react';
import { BookOpen, Award, CheckCircle, ChevronLeft, ArrowRight, Check } from 'lucide-react';
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
      results.forEach(res => {
        // Match by week number and course_id
        if (res.course_id === course.id) {
          progressMap[res.week] = res;
        }
      });
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
    
    // Save to progress locally and trigger reload from backend
    if (user) {
      try {
        await StorageEngine.saveQuizResult({
          userId: user.id,
          courseId: course.id,
          week: activeWeek,
          score: reportData.score,
          answers: reportData.rawAnswers,
          report: reportData
        });
        await loadUserProgress();
      } catch (err) {
        console.error('Failed to auto-save to cloud:', err);
      }
    }
  };

  // Determine active view on Quiz Tab
  const savedReport = courseProgress[activeWeek]?.report;
  const showReport = currentQuizReport || savedReport;

  // Calculate overall completed weeks
  const completedWeeksCount = Object.keys(courseProgress).length;
  const progressPercent = Math.round((completedWeeksCount / course.syllabus.length) * 100) || 0;

  return (
    <div className="min-h-screen bg-[#070913] text-slate-100 flex flex-col">
      {/* 🚀 Portal Top Navbar */}
      <header className="sticky top-0 z-40 bg-[#090d1f]/85 border-b border-slate-800/80 backdrop-blur-xl px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onBackToLobby}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 transition duration-200"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>返回課程大廳</span>
          </button>
          <div className="h-5 w-px bg-slate-800"></div>
          <div>
            <h2 className="text-lg font-bold bg-gradient-to-r from-pink-400 to-indigo-400 bg-clip-text text-transparent">{course.title}</h2>
            <p className="text-xs text-slate-400">目前週次：第 {activeWeek} 週 / 共 {course.syllabus.length} 週</p>
          </div>
        </div>

        {/* Dynamic Progress Indicator */}
        <div className="flex items-center gap-4 select-none">
          <div className="text-right hidden sm:block">
            <p className="text-xs text-slate-400">課程總進度</p>
            <p className="text-sm font-extrabold text-indigo-400">{completedWeeksCount} / {course.syllabus.length} 單元已評估 ({progressPercent}%)</p>
          </div>
          <div className="w-32 bg-slate-950 h-2.5 rounded-full border border-slate-800 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-pink-500 to-indigo-500 h-full rounded-full transition-all duration-500" 
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>
      </header>

      {/* 🏛️ Main Workspace Layout */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Left Visual Syllabus Planner (Sidebar) */}
        <aside className="w-full md:w-80 border-r border-slate-800/80 bg-[#090d1f]/40 p-5 flex flex-col gap-4 shrink-0 overflow-y-auto max-h-[40vh] md:max-h-[calc(100vh-73px)]">
          <div className="pb-3 border-b border-slate-800">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <BookOpen className="w-3.5 h-3.5 text-pink-400" />
              <span>課程大綱及進度規劃</span>
            </h3>
          </div>

          <div className="flex-1 space-y-2">
            {course.syllabus.map((syll) => {
              const isCompleted = !!courseProgress[syll.week];
              const isActive = activeWeek === syll.week;
              
              return (
                <button
                  key={syll.week}
                  onClick={() => setActiveWeek(syll.week)}
                  className={`w-full text-left p-3.5 rounded-2xl flex items-center justify-between border transition duration-200 group active:scale-[0.98] ${
                    isActive 
                      ? 'bg-gradient-to-r from-indigo-950/70 to-pink-950/20 border-pink-500/80 shadow-lg shadow-pink-950/10' 
                      : 'bg-slate-900/35 border-slate-800/80 hover:bg-slate-900/60 hover:border-slate-700'
                  }`}
                >
                  <div className="flex flex-col gap-1 pr-2">
                    <span className={`text-[10px] font-bold tracking-widest ${isActive ? 'text-pink-400' : 'text-indigo-400'}`}>
                      WEEK {syll.week}
                    </span>
                    <span className={`text-sm font-semibold truncate max-w-[180px] ${isActive ? 'text-white' : 'text-slate-300 group-hover:text-white'}`}>
                      {syll.title.replace(/^第\s*\d+\s*週\s*-?/, '')}
                    </span>
                  </div>

                  <div className="shrink-0">
                    {isCompleted ? (
                      <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center" title="已完成心理計量評估">
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      </div>
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center text-[10px] text-slate-500">
                        {syll.week}
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </aside>

        {/* Center Canvas */}
        <main className="flex-1 flex flex-col bg-[#05070e] p-6 md:p-8 overflow-y-auto max-h-[calc(100vh-73px)]">
          {/* Workspace Tabs */}
          <div className="flex border-b border-slate-800/80 mb-6">
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
                    <div className="max-w-4xl p-6 rounded-3xl bg-gradient-to-r from-indigo-950/40 via-[#0a0f28]/60 to-pink-950/20 border border-slate-800/80 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4 mt-4 shadow-xl">
                      <div>
                        <h4 className="text-lg font-bold text-white">本週單元研讀完畢！</h4>
                        <p className="text-sm text-slate-400">現在可以使用我們的 AI 心理計量模型檢測您本週的學習吸收力。</p>
                      </div>
                      <button
                        onClick={() => {
                          setActiveTab('quiz');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-indigo-500 hover:from-pink-600 hover:to-indigo-600 text-white text-sm font-extrabold transition shadow-lg hover:shadow-indigo-500/25 active:scale-95 whitespace-nowrap"
                      >
                        <span>開始自我挑戰評量</span>
                        <ArrowRight className="w-4 h-4 animate-bounce-x" />
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                {showReport ? (
                  // Review Mode: Show Diagnostic Report
                  <div className="flex flex-col gap-4">
                    <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/35 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
                      <div>
                        <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">DIAGNOSTIC ARCHIVED</span>
                        <h4 className="text-sm font-bold text-white">您已於雲端完成本週自我診斷！</h4>
                        <p className="text-xs text-slate-400">以下為您的 CTT 經典測驗、IRT 項目反應特徵 S 曲線、以及 CDM 認知診斷模型數據分析。</p>
                      </div>
                      <button
                        onClick={() => {
                          if (window.confirm('重新測驗將會覆蓋您目前的診斷存檔，確定要重新測驗嗎？')) {
                            setCurrentQuizReport(null);
                            // Temporarily delete local progress trigger for active week to launch test
                            const progressCopy = { ...courseProgress };
                            delete progressCopy[activeWeek];
                            setCourseProgress(progressCopy);
                          }
                        }}
                        className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-300 hover:bg-slate-800 hover:text-white transition active:scale-95 shrink-0"
                      >
                        重新開始測驗 ⚡
                      </button>
                    </div>
                    
                    <PsychometricsReport 
                      reportData={currentQuizReport || savedReport} 
                      userAbility={currentQuizReport?.theta || savedReport?.theta || 0}
                    />
                  </div>
                ) : (
                  // Quizzing Mode
                  <QuizArena 
                    quizFileName={activeWeekInfo.quizPath} 
                    user={user}
                    onComplete={handleQuizComplete}
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
