import React, { useEffect, useState } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import CourseStudyConsole from './components/CourseStudyConsole';
import PsychometricsReport from './components/PsychometricsReport';
import { StorageEngine, isCloudMode } from './utils/supabaseClient';
import { Cpu, Shield, Database } from 'lucide-react';

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('login'); // 'login' | 'dashboard' | 'classroom' | 'report'
  
  // States for dynamic routing
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [activeReport, setActiveReport] = useState(null);

  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      const currentUser = await StorageEngine.getCurrentUser();
      if (currentUser) {
        setUser(currentUser);
        setView('dashboard');
      } else {
        setView('login');
      }
    } catch (err) {
      console.error('Session validation error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLoginSuccess = (loggedInUser) => {
    setUser(loggedInUser);
    setView('dashboard');
  };

  const handleLogout = async () => {
    await StorageEngine.logout();
    setUser(null);
    setSelectedCourse(null);
    setActiveReport(null);
    setView('login');
  };

  const handleSelectCourse = (course) => {
    setSelectedCourse(course);
    setView('classroom');
  };

  const handleSelectHistory = (reportData) => {
    // Adapter to fit unified PsychometricsReport component
    const normalizedReport = reportData.report || reportData;
    setActiveReport(normalizedReport);
    setView('report');
  };

  const handleBackToDashboard = () => {
    setView('dashboard');
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', width: '100vw', height: '100vh', alignItems: 'center', justifyContent: 'center', background: '#05070e', color: 'var(--text-muted)' }}>
        <div style={{ textAlign: 'center' }}>
          <Cpu className="gradient-text" style={{ width: '48px', height: '48px', animation: 'spin 2s linear infinite', marginBottom: '16px' }} />
          <h3 style={{ fontSize: '18px', fontWeight: '600' }}>系統模組載入中...</h3>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'transparent', position: 'relative' }}>
      
      {/* Global Top Navbar (Only visible when logged in and NOT inside the classroom) */}
      {user && view !== 'classroom' && (
        <header style={{ 
          background: 'rgba(9, 13, 31, 0.85)', 
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid var(--glass-border)',
          padding: '16px 32px',
          position: 'sticky',
          top: 0,
          zIndex: 100,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }} onClick={handleBackToDashboard}>
            <Cpu className="gradient-text" style={{ width: '22px', height: '22px' }} />
            <span style={{ fontSize: '16px', fontWeight: '800', letterSpacing: '0.05em' }} className="gradient-text">
              AI-PSYCHOMETRICS
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {isCloudMode ? (
              <span className="mode-badge cloud" style={{ fontSize: '11px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Database style={{ width: '10px', height: '10px' }} /> Supabase Cloud
              </span>
            ) : (
              <span className="mode-badge sandbox" style={{ fontSize: '11px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Shield style={{ width: '10px', height: '10px' }} /> Sandbox Active
              </span>
            )}
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--glass-border)', padding: '6px 14px', borderRadius: '20px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }}></div>
              <span style={{ color: 'var(--text-primary)', fontWeight: '600' }}>{user.username}</span>
            </div>
          </div>
        </header>
      )}

      {/* Main Content Router */}
      <main style={{ position: 'relative', zIndex: 1 }}>
        {view === 'login' && (
          <Login onLoginSuccess={handleLoginSuccess} />
        )}
        
        {view === 'dashboard' && (
          <Dashboard 
            user={user} 
            onLogout={handleLogout} 
            onSelectCourse={handleSelectCourse}
            onSelectHistory={handleSelectHistory}
          />
        )}

        {view === 'classroom' && selectedCourse && (
          <CourseStudyConsole 
            course={selectedCourse} 
            user={user} 
            onBackToLobby={handleBackToDashboard}
          />
        )}
        
        {view === 'report' && activeReport && (
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <button 
                onClick={handleBackToDashboard}
                className="btn-secondary"
                style={{ padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                ← 返回儀表板
              </button>
              <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-neon-purple)' }}>歷史診斷檔案回顧</h3>
            </div>
            <PsychometricsReport 
              reportData={activeReport} 
              userAbility={activeReport.theta || 0}
            />
          </div>
        )}
      </main>
    </div>
  );
}
