import React, { useEffect, useState } from 'react';
import { StorageEngine } from '../utils/supabaseClient';
import { Award, BookOpen, Clock, LogOut, Play, User, Calendar, Brain, ArrowRight, BookOpenText } from 'lucide-react';

export default function Dashboard({ user, onLogout, onSelectCourse, onSelectHistory }) {
  const [courses, setCourses] = useState([]);
  const [history, setHistory] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [progressMap, setProgressMap] = useState({});
  const [coursesMap, setCoursesMap] = useState({}); // id -> title lookup for history display


  useEffect(() => {
    loadCoursesAndProgress();
  }, []);

  const loadCoursesAndProgress = async () => {
    setLoadingCourses(true);
    setLoadingHistory(true);
    try {
      // 1. Fetch courses catalog
      const basePath = import.meta.env.BASE_URL || '/';
      const coursesRes = await fetch(`${basePath}courses/courses.json`);
      if (!coursesRes.ok) throw new Error('Failed to load courses database');
      const coursesData = await coursesRes.json();
      setCourses(coursesData);

      // Build id -> title lookup map for history display
      const cMap = {};
      coursesData.forEach(c => { cMap[c.id] = c.title; });
      setCoursesMap(cMap);


      // 2. Fetch history and compute progress percentages
      const historyData = await StorageEngine.getQuizResults(user?.id);
      setHistory(historyData);

      const prog = {};
      historyData.forEach(item => {
        if (!prog[item.course_id]) {
          prog[item.course_id] = new Set();
        }
        prog[item.course_id].add(item.week);
      });

      // Convert Sets to completion counts
      const finalProgress = {};
      Object.keys(prog).forEach(cId => {
        finalProgress[cId] = prog[cId].size;
      });
      setProgressMap(finalProgress);

    } catch (err) {
      console.error('Failed to initialize Course Lobby:', err);
    } finally {
      setLoadingCourses(false);
      setLoadingHistory(false);
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px', minHeight: '100vh' }}>
      
      {/* 🚀 Welcome Top Banner */}
      <div className="glass-container" style={{ padding: '24px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', gap: '20px', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '16px', background: 'rgba(99, 102, 241, 0.15)', display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'center' }}>
            <User className="gradient-text" style={{ width: '24px', height: '24px' }} />
          </div>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: '700' }}>
              歡迎回來，{user.username} {user.isGuest && <span style={{ fontSize: '12px', fontWeight: '500', color: '#fbbf24', background: 'rgba(245, 158, 11, 0.1)', padding: '2px 8px', borderRadius: '20px', border: '1px solid rgba(245,158,11,0.2)', marginLeft: '6px' }}>遊客帳號</span>}
            </h3>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              使用模式: {user.id === 'sandbox-guest-id' ? 'LocalStorage 沙盒存檔' : 'Supabase 安全雲端存檔'}
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <button onClick={loadCoursesAndProgress} className="btn-secondary" style={{ padding: '10px 20px', fontSize: '14px' }}>
            重新整理進度與歷史
          </button>
          <button onClick={onLogout} className="btn-secondary" style={{ padding: '10px 20px', fontSize: '14px', borderColor: 'rgba(239, 68, 68, 0.2)', color: '#fca5a5' }}>
            <LogOut style={{ width: '16px', height: '16px' }} /> 登出
          </button>
        </div>
      </div>

      {/* 🏛️ Main Lobby Split Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr', gap: '40px' }} className="grid-layout">
        
        {/* Left Hand Side: Dynamic Multi-Course Catalog */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <BookOpen style={{ color: 'var(--text-neon-cyan)', width: '24px', height: '24px' }} />
            <h2 style={{ fontSize: '22px', fontWeight: '700' }}>專屬智慧學習殿堂</h2>
          </div>

          {loadingCourses ? (
            <div style={{ padding: '60px 0', textAlign: 'center', color: 'var(--text-muted)' }}>
              正在連線課程資料庫...
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {courses.map((course) => {
                const completedCount = progressMap[course.id] || 0;
                const totalWeeks = course.syllabus?.length || course.totalWeeks || 8;
                const percent = Math.round((completedCount / totalWeeks) * 100);
                const isUnderDevelopment = !course.syllabus || course.syllabus.length === 0;

                return (
                  <div 
                    key={course.id} 
                    className="glass-container" 
                    style={{ 
                      padding: '32px', 
                      border: isUnderDevelopment ? '1px solid var(--glass-border)' : '1px solid rgba(139, 92, 246, 0.25)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '16px',
                      opacity: isUnderDevelopment ? 0.6 : 1,
                      position: 'relative'
                    }}
                  >
                    {/* Badge Category */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '11px', fontWeight: 'bold', background: 'rgba(99, 102, 241, 0.1)', color: 'var(--text-neon-cyan)', border: '1px solid rgba(99,102,241,0.2)', padding: '3px 10px', borderRadius: '20px' }}>
                        {course.category}
                      </span>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        {course.tags?.map((tag, tIdx) => (
                          <span key={tIdx} style={{ fontSize: '10px', background: tag === '推薦' ? 'rgba(236,72,153,0.1)' : 'rgba(255,255,255,0.05)', color: tag === '推薦' ? '#f472b6' : 'var(--text-muted)', border: '1px solid rgba(255,255,255,0.08)', padding: '2px 8px', borderRadius: '20px' }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Title and Intro */}
                    <div>
                      <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '8px', color: '#fff' }}>{course.title}</h3>
                      <p style={{ fontSize: '13.5px', color: 'var(--text-muted)', lineHeight: '1.6' }}>{course.description}</p>
                    </div>

                    {/* Stats summary */}
                    <div style={{ display: 'flex', gap: '20px', fontSize: '12px', color: 'var(--text-muted)', margin: '4px 0' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Clock style={{ width: '13px', height: '13px' }} /> {totalWeeks} 週課程教材
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Brain style={{ width: '13px', height: '13px' }} /> {course.totalQuestions || 240} 道心理計量測驗
                      </span>
                    </div>

                    {/* Progress indicator */}
                    {!isUnderDevelopment && (
                      <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)', padding: '14px 20px', borderRadius: '18px' }}>
                        <div style={{ display: 'flex', justifyItems: 'center', justifyContent: 'space-between', marginBottom: '8px', fontSize: '12px' }}>
                          <span style={{ color: 'var(--text-muted)', fontWeight: '600' }}>學習與評估進度</span>
                          <span style={{ color: 'var(--text-neon-cyan)', fontWeight: 'bold' }}>{completedCount} / {totalWeeks} 週 ({percent}%)</span>
                        </div>
                        <div style={{ width: '100%', bg: '#05070e', height: '6px', borderRadius: '3px', overflow: 'hidden', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.05)' }}>
                          <div style={{ width: `${percent}%`, height: '100%', background: 'linear-gradient(to right, #ec4899, #6366f1)', borderRadius: '3px', transition: 'width 0.4s' }}></div>
                        </div>
                      </div>
                    )}

                    {/* Action button */}
                    {isUnderDevelopment ? (
                      <button 
                        className="btn-secondary"
                        style={{ width: '100%', justifyContent: 'center', cursor: 'not-allowed', color: 'var(--text-muted)' }} 
                        disabled
                      >
                        教材編製中，敬請期待...
                      </button>
                    ) : (
                      <button 
                        onClick={() => onSelectCourse(course)}
                        className="btn-premium"
                        style={{ width: '100%', justifyContent: 'center', display: 'flex', alignItems: 'center', gap: '8px' }}
                      >
                        <span>進入學習教室</span>
                        <ArrowRight style={{ width: '16px', height: '16px' }} />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* 💡 Theory Introduction Panel */}
          <div className="glass-container" style={{ padding: '28px', border: '1px solid rgba(236,72,153,0.15)' }}>
            <h4 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px', color: '#f472b6' }}>
              <BookOpenText style={{ width: '16px', height: '16px' }} />
              <span>AI 心理計量學（Psychometrics）核心科普</span>
            </h4>
            <p style={{ fontSize: '12.5px', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '16px' }}>
              本學習評量系統並非傳統的「答對幾題給幾分」系統，而是深度結合心理計量學三大經典演算法，為您提供大廠級的教育診斷報告：
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }} className="theory-grid">
              <div style={{ background: 'rgba(0,0,0,0.2)', padding: '12px', border: '1px solid rgba(255,255,255,0.03)', borderRadius: '12px' }}>
                <strong style={{ fontSize: '12.5px', color: 'var(--text-neon-cyan)', display: 'block', marginBottom: '4px' }}>1. 經典測驗理論 (CTT)</strong>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>計算試卷信度（Cronbach Alpha）、難度與區辨度，確保試題的科學有效性。</span>
              </div>
              <div style={{ background: 'rgba(0,0,0,0.2)', padding: '12px', border: '1px solid rgba(255,255,255,0.03)', borderRadius: '12px' }}>
                <strong style={{ fontSize: '12.5px', color: 'var(--text-neon-purple)', display: 'block', marginBottom: '4px' }}>2. 項目反應理論 (IRT)</strong>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>透過極大似然估計（Newton-Raphson）算出您的潛在能力值 (Theta)，擺脫題目難易度影響。</span>
              </div>
              <div style={{ background: 'rgba(0,0,0,0.2)', padding: '12px', border: '1px solid rgba(255,255,255,0.03)', borderRadius: '12px' }}>
                <strong style={{ fontSize: '12.5px', color: '#f472b6', display: 'block', marginBottom: '4px' }}>3. 認知診斷模型 (CDM)</strong>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>利用 DINA 機率關聯模型，精準評測出您在各微觀知識點的掌握度（覆蓋面積）。</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Hand Side: Unified Test Logs & Diagnostics */}
        <div className="glass-container" style={{ padding: '32px', height: 'fit-content' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Brain style={{ color: 'var(--text-neon-purple)', width: '24px', height: '24px' }} />
              <h2 style={{ fontSize: '20px', fontWeight: '700' }}>歷程診斷追蹤紀錄</h2>
            </div>
            <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>共 {history.length} 筆</span>
          </div>

          {loadingHistory ? (
            <div style={{ padding: '40px 0', textAlign: 'center', color: 'var(--text-muted)' }}>
              正在調取歷史診斷檔案...
            </div>
          ) : history.length === 0 ? (
            <div className="glass-card" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)', borderStyle: 'dashed' }}>
              <Award style={{ width: '48px', height: '48px', margin: '0 auto 16px', opacity: 0.3 }} />
              <p style={{ fontSize: '14px' }}>目前尚無診斷紀錄。</p>
              <p style={{ fontSize: '11.5px', marginTop: '6px' }}>進入教室並完成第一週的自我評量，三大模型的數據回饋與診斷記錄將會永久安全存檔在此！</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {history.map((record) => (
                <div 
                  key={record.id}
                  className="glass-card"
                  style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    cursor: 'pointer',
                    flexWrap: 'wrap',
                    gap: '12px',
                    padding: '16px 20px',
                    transition: 'all 0.2s',
                    border: '1px solid rgba(255,255,255,0.04)'
                  }}
                  onClick={() => onSelectHistory(record)}
                >
                  <div style={{ flex: 1, minWidth: '160px' }}>
                    <h5 style={{ fontSize: '14.5px', fontWeight: '600', marginBottom: '4px', color: '#fff' }}>
                      {coursesMap[record.course_id] || record.course_id} - 第 {record.week} 週
                    </h5>
                    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px', fontSize: '11px', color: 'var(--text-muted)' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Calendar style={{ width: '11px', height: '11px' }} /> 
                        {new Date(record.created_at).toLocaleDateString()}
                      </span>
                      <span>•</span>
                      <span>能力值 (θ): <strong className="purple-neon-text">{(record.report?.theta ?? record.irt_metrics?.studentDetails?.[0]?.theta ?? 0).toFixed(2)}</strong></span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text-neon-cyan)' }}>
                        {record.score}
                      </span>
                      <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}> 題答對</span>
                    </div>
                    
                    <button className="btn-secondary" style={{ padding: '6px 12px', fontSize: '12px', borderColor: 'rgba(168,85,247,0.2)' }}>
                      看報告
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      <style>{`
        @media (max-width: 960px) {
          .grid-layout {
            grid-template-columns: 1fr !important;
          }
          .theory-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
