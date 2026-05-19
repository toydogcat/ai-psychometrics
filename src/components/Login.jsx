import React, { useState } from 'react';
import { StorageEngine, isCloudMode } from '../utils/supabaseClient';
import { Shield, Sparkles, Terminal, Cpu, Database, Eye, EyeOff } from 'lucide-react';

export default function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!username || !password) {
      setError('請輸入帳號與密碼');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const user = await StorageEngine.login(username, password);
      onLoginSuccess(user);
    } catch (err) {
      console.error(err);
      setError(err.message || '登入失敗，請檢查網路連線或憑證');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickFill = () => {
    setUsername('guest');
    setPassword('test');
    setError('');
  };

  const handleSandboxStart = async () => {
    setLoading(true);
    try {
      const user = await StorageEngine.login('Guest-Sandbox', 'test');
      onLoginSuccess(user);
    } catch (err) {
      setError('啟動本地沙盒失敗');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '90vh', alignItems: 'center', justifyContent: 'center', padding: '24px', position: 'relative' }}>
      <div className="bg-glow-effect"></div>
      
      <div className="glass-container" style={{ width: '100%', maxWidth: '460px', padding: '40px', position: 'relative' }}>
        
        {/* Connection status header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Cpu className="gradient-text" style={{ width: '28px', height: '28px' }} />
            <span style={{ fontSize: '18px', fontWeight: '800', letterSpacing: '0.05em' }} className="gradient-text">
              PSYCHOMETRICS
            </span>
          </div>
          
          {isCloudMode ? (
            <span className="mode-badge cloud">
              <Database style={{ width: '12px', height: '12px' }} /> Cloud Connected
            </span>
          ) : (
            <span className="mode-badge sandbox">
              <Shield style={{ width: '12px', height: '12px' }} /> Local Sandbox
            </span>
          )}
        </div>

        {/* Title */}
        <div style={{ marginBottom: '28px' }}>
          <h2 style={{ fontSize: '26px', fontWeight: '700', marginBottom: '8px' }}>
            AI 心理計量學線上評量
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: '1.5' }}>
            歡迎使用！本系統融合 CTT/IRT/CDM 三大統計學模型，為您提供精準的 Python 學習狀態診斷。
          </p>
        </div>

        {error && (
          <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', color: '#fca5a5', padding: '12px 16px', borderRadius: '12px', marginBottom: '20px', fontSize: '14px' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px', color: 'var(--text-muted)' }}>
              電子郵件 或 測試帳號
            </label>
            <input 
              type="text" 
              className="input-premium" 
              placeholder="請輸入帳號 (例如: guest)" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={loading}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px', color: 'var(--text-muted)' }}>
              密碼
            </label>
            <div style={{ position: 'relative' }}>
              <input 
                type={showPassword ? 'text' : 'password'} 
                className="input-premium" 
                placeholder="請輸入密碼 (例如: test)" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
              >
                {showPassword ? <EyeOff style={{ width: '18px', height: '18px' }} /> : <Eye style={{ width: '18px', height: '18px' }} />}
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            className="btn-premium" 
            style={{ width: '100%', justifyContent: 'center', padding: '16px' }}
            disabled={loading}
          >
            {loading ? '驗證分析中...' : '進行帳號登入'} <Sparkles style={{ width: '18px', height: '18px' }} />
          </button>
        </form>

        {/* Separator */}
        <div style={{ display: 'flex', alignItems: 'center', margin: '24px 0', gap: '16px' }}>
          <div style={{ flex: '1', height: '1px', background: 'var(--glass-border)' }}></div>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>快速試用模式</span>
          <div style={{ flex: '1', height: '1px', background: 'var(--glass-border)' }}></div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <button 
            type="button" 
            onClick={handleQuickFill} 
            className="btn-secondary" 
            style={{ width: '100%', justifyContent: 'center', gap: '8px' }}
            disabled={loading}
          >
            <Terminal style={{ width: '16px', height: '16px', color: 'var(--text-neon-cyan)' }} />
            自動填寫 guest / test 憑證
          </button>

          <button 
            type="button" 
            onClick={handleSandboxStart} 
            className="btn-secondary" 
            style={{ width: '100%', justifyContent: 'center', borderColor: 'rgba(245, 158, 11, 0.25)', background: 'rgba(245, 158, 11, 0.03)' }}
            disabled={loading}
          >
            <Shield style={{ width: '16px', height: '16px', color: '#fbbf24' }} />
            以遊客身份直接免登入試玩
          </button>
        </div>

        {/* Bottom security assurance */}
        <div style={{ marginTop: '28px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '12px', justifyContent: 'center' }}>
          <Shield style={{ width: '14px', height: '14px', color: '#10b981' }} />
          <span>RLS 資料安全技術保護：測驗紀錄均安全隔離</span>
        </div>

      </div>
    </div>
  );
}
