import React, { useEffect, useState } from 'react';
import { StorageEngine } from '../utils/supabaseClient';
import { Award, BookOpen, Clock, LogOut, Play, User, Calendar, Brain } from 'lucide-react';

export default function Dashboard({ user, onLogout, onSelectWeek, onSelectHistory }) {
  const [history, setHistory] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(false);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    setLoadingHistory(true);
    try {
      const data = await StorageEngine.getHistory();
      setHistory(data);
    } catch (err) {
      console.error('Failed to load quiz history:', err);
    } finally {
      setLoadingHistory(false);
    }
  };

  // Generate 18 weeks list for Python Course
  const weeks = Array.from({ length: 18 }, (_, i) => {
    const wNum = i + 1;
    return {
      id: `week${wNum}`,
      num: wNum,
      title: wNum === 1 
        ? "Python 環境生態與現代化工具鏈" 
        : wNum === 9 
        ? "期中綜合學力評量 (W1-W8)" 
        : wNum === 18 
        ? "期末專題學力評量 (W1-W17)"
        : `第 ${wNum} 週 Python 核心觀念進階`,
      isActive: wNum === 1,
      duration: "30 題 / 30 分鐘",
      kps: wNum === 1 
        ? ["直譯器原理", "Colab雲端開發", "Anaconda生態", "uv極速管理", "f-string互動", "PEP 8縮進"]
        : ["變數型態", "流程控制", "函式設計", "模組套件", "物件導向", "資料分析"]
    };
  });

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px', minHeight: '100vh' }}>
      
      {/* Header bar */}
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
          <button onClick={loadHistory} className="btn-secondary" style={{ padding: '10px 20px', fontSize: '14px' }}>
            重新整理歷史記錄
          </button>
          <button onClick={onLogout} className="btn-secondary" style={{ padding: '10px 20px', fontSize: '14px', borderColor: 'rgba(239, 68, 68, 0.2)', color: '#fca5a5' }}>
            <LogOut style={{ width: '16px', height: '16px' }} /> 登出
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '40px' }} className="grid-layout">
        
        {/* Left Section: Course List */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <BookOpen style={{ color: 'var(--text-neon-cyan)', width: '24px', height: '24px' }} />
            <h2 style={{ fontSize: '22px', fontWeight: '700' }}>精選線上課程：Python 基礎與心理計量學</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '24px' }}>
            {weeks.map((wk) => (
              <div 
                key={wk.id} 
                className="glass-container" 
                style={{ 
                  padding: '28px', 
                  opacity: wk.isActive ? 1 : 0.65, 
                  border: wk.isActive ? '1px solid rgba(99,102,241,0.3)' : '1px solid var(--glass-border)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {!wk.isActive && (
                  <div style={{ position: 'absolute', top: '12px', right: '12px', fontSize: '11px', background: 'rgba(255,255,255,0.06)', color: 'var(--text-muted)', padding: '2px 8px', borderRadius: '20px', border: '1px solid var(--glass-border)' }}>
                    即將開放
                  </div>
                )}
                {wk.isActive && (
                  <div style={{ position: 'absolute', top: '12px', right: '12px', fontSize: '11px', background: 'rgba(16,185,129,0.15)', color: '#34d399', padding: '2px 8px', borderRadius: '20px', border: '1px solid rgba(16,185,129,0.3)' }}>
                    熱烈開放中
                  </div>
                )}

                <span style={{ fontSize: '13px', color: 'var(--text-neon-cyan)', fontWeight: '600', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                  WEEK {wk.num}
                </span>
                
                <h4 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '12px', lineHeight: '1.4' }}>
                  {wk.title}
                </h4>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '13px', marginBottom: '16px' }}>
                  <Clock style={{ width: '14px', height: '14px' }} />
                  <span>{wk.duration}</span>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '24px' }}>
                  {wk.kps.map((kp, idx) => (
                    <span key={idx} style={{ fontSize: '11px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)', padding: '2px 6px', borderRadius: '6px', color: 'var(--text-muted)' }}>
                      {kp}
                    </span>
                  ))}
                </div>

                {wk.isActive ? (
                  <button 
                    onClick={() => onSelectWeek(wk.id)} 
                    className="btn-premium" 
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    <Play style={{ width: '16px', height: '16px', fill: 'white' }} /> 開始學習與測驗
                  </button>
                ) : (
                  <button 
                    className="btn-secondary" 
                    style={{ width: '100%', justifyContent: 'center', cursor: 'not-allowed', color: 'var(--text-muted)' }}
                    disabled
                  >
                    未解鎖 (W2~W18 待導入)
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Section: History Records */}
        <div className="glass-container" style={{ padding: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Brain style={{ color: 'var(--text-neon-purple)', width: '24px', height: '24px' }} />
              <h2 style={{ fontSize: '20px', fontWeight: '700' }}>心理計量學診斷歷史紀錄</h2>
            </div>
            <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>共 {history.length} 筆</span>
          </div>

          {loadingHistory ? (
            <div style={{ padding: '40px 0', textAlign: 'center', color: 'var(--text-muted)' }}>
              讀取歷史測驗中...
            </div>
          ) : history.length === 0 ? (
            <div className="glass-card" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
              <Award style={{ width: '48px', height: '48px', margin: '0 auto 16px', opacity: 0.3 }} />
              <p style={{ fontSize: '15px' }}>目前尚無測驗紀錄。</p>
              <p style={{ fontSize: '12px', marginTop: '6px' }}>完成第一個 Python 測驗後，三大模型的心理診斷結果會立刻記錄在這裡！</p>
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
                    gap: '16px'
                  }}
                  onClick={() => onSelectHistory(record)}
                >
                  <div>
                    <h5 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '4px' }}>
                      Python 第 1 週 測驗評量
                    </h5>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '12px', color: 'var(--text-muted)' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Calendar style={{ width: '12px', height: '12px' }} /> 
                        {new Date(record.created_at).toLocaleString()}
                      </span>
                      <span>•</span>
                      <span>能力值 (Theta): <strong className="purple-neon-text">{(record.irt_metrics?.studentDetails?.[0]?.theta ?? 0).toFixed(2)}</strong></span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '20px', fontWeight: '800', color: 'var(--text-neon-cyan)' }}>
                        {record.score}
                      </span>
                      <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}> / {record.total_questions} 題</span>
                    </div>
                    
                    <button className="btn-secondary" style={{ padding: '8px 16px', fontSize: '13px', borderColor: 'rgba(168,85,247,0.2)' }}>
                      查看診斷報告
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      <style>{`
        @media (max-width: 900px) {
          .grid-layout {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
