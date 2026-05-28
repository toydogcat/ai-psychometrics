import React, { useState, useEffect, useRef } from 'react';
import { Award, Shield, ArrowLeft, RefreshCw, BarChart2, CheckCircle, XCircle, BookOpen, AlertCircle, HelpCircle } from 'lucide-react';
import { Radar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  Title
} from 'chart.js';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  Title
);

export default function PsychometricsReport({ report, reportData, onBackToDashboard, courseTitle, knowledgePoints }) {
  const [selectedItemId, setSelectedItemId] = useState('Q1');
  const reportRef = useRef(null);

  const actualReport = report || reportData;

  // Auto-render math when report loads or selected item changes
  useEffect(() => {
    const renderMath = () => {
      if (window.renderMathInElement && reportRef.current) {
        window.renderMathInElement(reportRef.current, {
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
  }, [actualReport, selectedItemId]);

  if (!actualReport) return null;

  const { cttMetrics, irtMetrics, cdmMetrics, score, totalQuestions, responseVector } = actualReport;

  // 1. CDM Radar Chart data (Compare Personal Mastery vs Cohort Average)
  const studentCdm = cdmMetrics?.studentProfiles?.[0] || { profile: [0, 0, 0, 0, 0, 0] };
  const personalMastery = studentCdm.profile.map(x => x * 100);
  const cohortMastery = cdmMetrics?.classMasteryPercentages?.map(x => x.percentage) || [50, 50, 50, 50, 50, 50];
  const attributeLabels = cdmMetrics?.classMasteryPercentages?.map(x => {
    const kpKey = x.attribute;
    const kpDesc = (knowledgePoints && knowledgePoints[kpKey]) || (actualReport.knowledgePoints && actualReport.knowledgePoints[kpKey]);
    return kpDesc ? `${kpKey} ${kpDesc}` : kpKey;
  }) || [
    "KP1.1 直譯器原理",
    "KP1.2 Colab開發",
    "KP1.3 本地環境管理",
    "KP1.4 uv管理工具",
    "KP1.5 print/input",
    "KP1.6 PEP 8與縮進"
  ];

  const radarData = {
    labels: attributeLabels,
    datasets: [
      {
        label: '個人掌握度 (%)',
        data: personalMastery,
        backgroundColor: 'rgba(99, 102, 241, 0.2)',
        borderColor: 'rgba(99, 102, 241, 0.8)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(99, 102, 241, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(99, 102, 241, 1)',
      },
      {
        label: '常模群體平均掌握度 (%)',
        data: cohortMastery,
        backgroundColor: 'rgba(56, 189, 248, 0.1)',
        borderColor: 'rgba(56, 189, 248, 0.6)',
        borderWidth: 1.5,
        borderDash: [5, 5],
        pointBackgroundColor: 'rgba(56, 189, 248, 1)',
        pointBorderColor: '#fff',
      }
    ]
  };

  const radarOptions = {
    scales: {
      r: {
        angleLines: { color: 'rgba(255, 255, 255, 0.1)' },
        grid: { color: 'rgba(255, 255, 255, 0.1)' },
        pointLabels: { color: '#e5e7eb', font: { size: 12, weight: 600 } },
        ticks: { color: '#9ca3af', backdropColor: 'transparent', stepSize: 20 },
        min: 0,
        max: 100
      }
    },
    plugins: {
      legend: {
        labels: { color: '#f3f4f6', font: { size: 12 } }
      }
    }
  };

  // 2. IRT ICC Line Chart data
  // Retrieve a & b parameter for selected question
  const selectedItemParams = irtMetrics?.itemDetails?.find(item => item.item === selectedItemId) || { a: 1.0, b: 0.0 };
  const studentTheta = irtMetrics?.studentDetails?.[0]?.theta ?? 0.0;
  
  // Calculate ICC curve points: theta from -3.0 to +3.0
  const thetaSteps = [];
  const pSuccessValues = [];
  for (let th = -3.0; th <= 3.01; th += 0.3) {
    thetaSteps.push(th.toFixed(1));
    const z = selectedItemParams.a * (th - selectedItemParams.b);
    const p = 1 / (1 + Math.exp(-z));
    pSuccessValues.push(p);
  }

  // Calculate current student's theoretical success rate on this item
  const studentZ = selectedItemParams.a * (studentTheta - selectedItemParams.b);
  const studentTheoreticalP = 1 / (1 + Math.exp(-studentZ));

  const iccData = {
    labels: thetaSteps,
    datasets: [
      {
        label: `${selectedItemId} 項目特徵曲線 (ICC)`,
        data: pSuccessValues,
        borderColor: '#a855f7',
        backgroundColor: 'rgba(168, 85, 247, 0.05)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointRadius: 0
      },
      {
        label: '您的估計能力點',
        data: thetaSteps.map((th) => {
          // Find closest step for visual point plotting
          const diff = Math.abs(parseFloat(th) - studentTheta);
          return diff < 0.2 ? studentTheoreticalP : null;
        }),
        borderColor: '#10b981',
        backgroundColor: '#10b981',
        pointRadius: 8,
        pointHoverRadius: 10,
        showLine: false
      }
    ]
  };

  const iccOptions = {
    scales: {
      x: {
        title: { display: true, text: '學生潛在能力值 (Theta)', color: '#9ca3af' },
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: '#9ca3af' }
      },
      y: {
        title: { display: true, text: '答對機率 P(θ)', color: '#9ca3af' },
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: '#9ca3af' },
        min: 0,
        max: 1
      }
    },
    plugins: {
      legend: {
        labels: { color: '#f3f4f6' }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            if (context.dataset.label === '您的估計能力點') {
              return `您的能力 θ = ${studentTheta.toFixed(2)}, 理論答對率 = ${(studentTheoreticalP * 100).toFixed(1)}%`;
            }
            return `θ = ${context.label}, 答對率 = ${(context.raw * 100).toFixed(1)}%`;
          }
        }
      }
    }
  };

  // 3. Reliable color and level for CTT KR-20
  const getReliabilityBadge = (kr20) => {
    if (kr20 >= 0.8) return { label: "信度極佳 (學術優良)", color: "#10b981", bg: "rgba(16,185,129,0.1)" };
    if (kr20 >= 0.7) return { label: "信度優良 (可信評量)", color: "#34d399", bg: "rgba(52,211,153,0.1)" };
    if (kr20 >= 0.6) return { label: "信度尚可", color: "#fbbf24", bg: "rgba(245,158,11,0.1)" };
    return { label: "信度偏低", color: "#ef4444", bg: "rgba(239,68,68,0.1)" };
  };

  const reliabilityInfo = getReliabilityBadge(cttMetrics?.kr20 ?? 0);

  return (
    <div ref={reportRef} style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px', minHeight: '100vh' }}>
      
      {/* Upper Navigation Back Button */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        {onBackToDashboard ? (
          <button onClick={onBackToDashboard} className="btn-secondary" style={{ padding: '10px 20px', fontSize: '14px' }}>
            <ArrowLeft style={{ width: '16px', height: '16px' }} /> 返回控制台
          </button>
        ) : <div />}
        <span className="mode-badge cloud" style={{ padding: '8px 16px', background: 'rgba(99,102,241,0.15)', color: 'var(--text-neon-cyan)', borderColor: 'rgba(99,102,241,0.3)' }}>
          <Shield style={{ width: '14px', height: '14px' }} /> 心理計量學 Diagnostic Suite v1.2
        </span>
      </div>

      {/* Hero Overview Box */}
      <div className="glass-container" style={{ padding: '40px', marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '32px', position: 'relative', overflow: 'hidden' }}>
        <div className="bg-glow-effect" style={{ left: '80%', top: '-20%' }}></div>
        
        <div>
          <span style={{ fontSize: '13px', color: 'var(--text-neon-cyan)', fontWeight: '600', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
            測驗分析總覽
          </span>
          <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '12px' }} className="gradient-text">
            {courseTitle || actualReport.courseTitle || 'Python 現代工具鏈與環境'} 學力診斷
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '15px', maxWidth: '600px', lineHeight: '1.6' }}>
            本報告採用<strong>古典測驗理論 (CTT)</strong>、<strong>項目反應理論 (IRT) 雙參數 2PL 模型</strong>與<strong>認知診斷模型 (CDM) DINA 模型</strong>對您的作答情況進行多維度交叉學術診斷。
          </p>
        </div>

        {/* Big Score circle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', background: 'rgba(255,255,255,0.02)', padding: '20px 32px', borderRadius: '24px', border: '1px solid var(--glass-border)' }}>
          <div style={{ textAlign: 'center' }}>
            <span style={{ fontSize: '44px', fontWeight: '900', color: '#6366f1' }}>{score}</span>
            <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}> / {totalQuestions} 題</span>
            <span style={{ display: 'block', fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>答對率 {Math.round((score/totalQuestions)*100)}%</span>
          </div>
          <div style={{ width: '1px', height: '60px', background: 'var(--glass-border)' }}></div>
          <div>
            <span style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>估計能力值 (Theta)</span>
            <strong style={{ fontSize: '24px', fontWeight: '800' }} className="purple-neon-text">
              {studentTheta.toFixed(2)}
            </strong>
            <span style={{ display: 'block', fontSize: '11px', color: '#10b981', marginTop: '4px' }}>超越 {Math.round((1 / (1 + Math.exp(-studentTheta))) * 100)}% 常模群體</span>
          </div>
        </div>
      </div>

      {/* Main Grid: CTT Metrics & CDM Radar */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', marginBottom: '40px' }} className="grid-2col">
        
        {/* Radar Chart Card */}
        <div className="glass-container" style={{ padding: '32px' }}>
          <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <BookOpen style={{ color: 'var(--text-neon-cyan)', width: '20px', height: '20px' }} /> 
            CDM 屬性掌握診斷 (雷達圖)
          </h3>
          <div style={{ maxHeight: '380px', display: 'flex', justifyContent: 'center' }}>
            <Radar data={radarData} options={radarOptions} />
          </div>
        </div>

        {/* CTT General Performance Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* CTT Statistics Box */}
          <div className="glass-container" style={{ padding: '32px', flex: '1' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <BarChart2 style={{ color: 'var(--text-neon-purple)', width: '20px', height: '20px' }} /> 
              CTT 古典測驗理論指標
            </h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>常模團體平均得分</span>
                <strong style={{ fontSize: '20px', fontWeight: '700' }}>{(cttMetrics?.meanScore ?? 0).toFixed(1)} 題</strong>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>常模團體標準差</span>
                <strong style={{ fontSize: '20px', fontWeight: '700' }}>{(cttMetrics?.stdDev ?? 0).toFixed(2)} 題</strong>
              </div>
            </div>

            <div style={{ background: reliabilityInfo.bg, border: `1px solid ${reliabilityInfo.color}33`, padding: '16px 20px', borderRadius: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>測驗信度 (KR-20 / Cronbach's Alpha)</span>
                <strong style={{ fontSize: '24px', fontWeight: '800', color: reliabilityInfo.color }}>
                  {(cttMetrics?.kr20 ?? 0).toFixed(3)}
                </strong>
              </div>
              <span style={{ fontSize: '13px', fontWeight: '600', padding: '6px 12px', borderRadius: '20px', background: 'rgba(255,255,255,0.05)', color: reliabilityInfo.color, border: `1px solid ${reliabilityInfo.color}33` }}>
                {reliabilityInfo.label}
              </span>
            </div>

            <div style={{ marginTop: '16px', fontSize: '12px', color: 'var(--text-muted)', display: 'flex', gap: '12px' }}>
              <span>折半信度 (Spearman-Brown): <strong>{(cttMetrics?.splitHalf ?? 0).toFixed(3)}</strong></span>
              <span>•</span>
              <span>信度大於 0.7 說明此份評量對 {courseTitle ? courseTitle.replace(/\s*\(.*\)/g, '') : (actualReport.courseTitle ? actualReport.courseTitle.replace(/\s*\(.*\)/g, '') : '該學科')} 能力的測量誤差極小。</span>
            </div>
          </div>

          {/* AI Remediation suggestions */}
          <div className="glass-container" style={{ padding: '32px', borderLeft: '4px solid #a855f7' }}>
            <h4 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '12px', color: 'var(--text-neon-purple)' }}>
              🧠 AI 個人化補救學習建議 (DINA)
            </h4>
            <p style={{ fontSize: '14px', lineHeight: '1.6', color: '#e5e7eb' }}>
              {studentCdm.advice}
            </p>
          </div>

        </div>
      </div>

      {/* IRT Curve Grid */}
      <div className="glass-container" style={{ padding: '32px', marginBottom: '40px' }}>
        <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <HelpCircle style={{ color: '#fbbf24', width: '20px', height: '20px' }} /> 
          IRT 項目特徵曲線 ICC (評量科學解析)
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '32px' }} className="grid-icc">
          <div>
            <label style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '8px', display: 'block' }}>
              選擇題目查看學術參數：
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px', maxHeight: '280px', overflowY: 'auto', paddingRight: '4px' }}>
              {irtMetrics?.itemDetails?.map((item) => {
                const isCorrect = responseVector[parseInt(item.item.replace('Q', '')) - 1] === 1;
                return (
                  <button
                    key={item.item}
                    onClick={() => setSelectedItemId(item.item)}
                    style={{
                      padding: '8px',
                      borderRadius: '8px',
                      border: '1px solid var(--glass-border)',
                      background: selectedItemId === item.item ? 'rgba(168,85,247,0.2)' : 'rgba(255,255,255,0.02)',
                      borderColor: selectedItemId === item.item ? '#a855f7' : 'var(--glass-border)',
                      color: selectedItemId === item.item ? '#fff' : 'var(--text-muted)',
                      cursor: 'pointer',
                      fontSize: '12px',
                      fontWeight: '600',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <span>{item.item}</span>
                    {isCorrect ? (
                      <CheckCircle style={{ width: '12px', height: '12px', color: '#10b981' }} />
                    ) : (
                      <XCircle style={{ width: '12px', height: '12px', color: '#ef4444' }} />
                    )}
                  </button>
                );
              })}
            </div>

            <div style={{ marginTop: '24px', background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
              <span style={{ fontSize: '13px', color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>試題特徵參數 (2PL)：</span>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
                <span>鑑別度 (a 參數)：</span>
                <strong className="cyan-neon-text">{selectedItemParams.a}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
                <span>難度 (b 參數)：</span>
                <strong className="purple-neon-text">{selectedItemParams.b}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                <span>您的答對概率：</span>
                <strong style={{ color: '#10b981' }}>{(studentTheoreticalP * 100).toFixed(1)}%</strong>
              </div>
            </div>
          </div>

          <div style={{ maxHeight: '350px' }}>
            <Line data={iccData} options={iccOptions} />
          </div>
        </div>
      </div>

      {/* Comprehensive Item Analysis Table */}
      <div className="glass-container" style={{ padding: '32px' }}>
        <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <AlertCircle style={{ color: 'var(--text-neon-cyan)', width: '20px', height: '20px' }} /> 
          30 題大考級試題深度分析清單 (CTT)
        </h3>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--glass-border)', color: 'var(--text-muted)' }}>
                <th style={{ padding: '12px 16px' }}>題號</th>
                <th style={{ padding: '12px 16px' }}>您的作答</th>
                <th style={{ padding: '12px 16px' }}>難度 (p 值)</th>
                <th style={{ padding: '12px 16px' }}>鑑別度 (D 值)</th>
                <th style={{ padding: '12px 16px' }}>試題品質判定</th>
                <th style={{ padding: '12px 16px' }}>IRT 難度 / 鑑別度</th>
              </tr>
            </thead>
            <tbody>
              {cttMetrics?.itemDetails?.map((item, idx) => {
                const isCorrect = responseVector[idx] === 1;
                const irtParam = irtMetrics?.itemDetails?.find(x => x.item === item.item) || { a: 1.0, b: 0.0 };
                const questionData = actualReport.activeQuestions ? actualReport.activeQuestions[idx] : null;
                
                return (
                  <React.Fragment key={item.item}>
                    <tr style={{ borderBottom: isCorrect || !questionData ? '1px solid rgba(255,255,255,0.02)' : 'none', background: selectedItemId === item.item ? 'rgba(255,255,255,0.02)' : 'transparent' }}>
                      <td style={{ padding: '12px 16px', fontWeight: '600' }}>{item.item}</td>
                      <td style={{ padding: '12px 16px' }}>
                        {isCorrect ? (
                          <span style={{ color: '#10b981', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                            <CheckCircle style={{ width: '14px', height: '14px' }} /> 答對
                          </span>
                        ) : (
                          <span style={{ color: '#ef4444', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                            <XCircle style={{ width: '14px', height: '14px' }} /> 答錯
                          </span>
                        )}
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        {item.difficulty.toFixed(2)} 
                        <span style={{ fontSize: '11px', color: 'var(--text-muted)', marginLeft: '4px' }}>
                          ({item.difficulty >= 0.7 ? '易' : item.difficulty >= 0.4 ? '中' : '難'})
                        </span>
                      </td>
                      <td style={{ padding: '12px 16px' }}>{item.discrimination.toFixed(2)}</td>
                      <td style={{ padding: '12px 16px' }}>
                        <span style={{ 
                          color: item.verdict.includes('優良') ? '#10b981' : item.verdict.includes('良好') ? '#34d399' : item.verdict.includes('尚可') ? '#fbbf24' : '#ef4444',
                          fontWeight: '500'
                        }}>
                          {item.verdict}
                        </span>
                      </td>
                      <td style={{ padding: '12px 16px', fontFamily: 'var(--font-mono)', fontSize: '12px' }}>
                        a={irtParam.a.toFixed(2)} / b={irtParam.b.toFixed(2)}
                      </td>
                    </tr>
                    {!isCorrect && questionData && (
                      <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.02)', background: 'rgba(239, 68, 68, 0.05)' }}>
                        <td colSpan="6" style={{ padding: '24px', fontSize: '14px' }}>
                          <div style={{ marginBottom: '16px', borderLeft: '4px solid #ef4444', paddingLeft: '16px' }}>
                            <strong style={{ color: '#f87171', display: 'block', marginBottom: '8px', textTransform: 'uppercase', fontSize: '11px', tracking: '1px' }}>題目內容</strong>
                            <span style={{ color: '#e5e7eb', whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>{questionData.title}</span>
                            {questionData.options && Object.keys(questionData.options).length > 0 && (
                              <div style={{ marginTop: '12px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '8px' }}>
                                {Object.entries(questionData.options).map(([key, val]) => (
                                  <div key={key} style={{ fontSize: '13px', color: '#9ca3af' }}>
                                    <span style={{ color: '#f3f4f6', fontWeight: 'bold', marginRight: '8px' }}>({key})</span> {val}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                          
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '16px' }}>
                            <div style={{ background: 'rgba(239, 68, 68, 0.1)', padding: '12px', borderRadius: '12px', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                              <strong style={{ color: '#f87171', display: 'block', marginBottom: '4px', fontSize: '11px' }}>您的作答</strong>
                              <span style={{ color: '#fff', fontWeight: '800' }}>{actualReport.rawAnswers[questionData.id] || '未作答'}</span>
                            </div>
                            <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '12px', borderRadius: '12px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                              <strong style={{ color: '#34d399', display: 'block', marginBottom: '4px', fontSize: '11px' }}>正確答案</strong>
                              <span style={{ color: '#fff', fontWeight: '800' }}>{Array.isArray(questionData.answer) ? questionData.answer.join(', ') : questionData.answer}</span>
                            </div>
                          </div>

                          {questionData.explanation && (
                            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)' }}>
                              <strong style={{ color: '#6366f1', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', fontSize: '12px' }}>
                                <BookOpen style={{ width: '14px', height: '14px' }} /> 核心觀念解析
                              </strong>
                              <span style={{ color: '#d1d5db', whiteSpace: 'pre-wrap', lineHeight: '1.7', fontSize: '14px' }}>{questionData.explanation}</span>
                            </div>
                          )}
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .grid-2col, .grid-icc {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
