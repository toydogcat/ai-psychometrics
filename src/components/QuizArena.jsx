import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Send, AlertTriangle, HelpCircle } from 'lucide-react';
import { calculateCTT, calculateIRT2PL, calculateCDM } from '../utils/psychometricsEngine';
import { StorageEngine } from '../utils/supabaseClient';

export default function QuizArena({ quizFileName, weekId, user, onComplete, onBackToDashboard }) {
  const [quizData, setQuizData] = useState(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState({}); // Stores user answers: { Q1: "B", Q11: ["A", "B"], Q21: "PEP 8" }
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadQuiz();
  }, [quizFileName]);

  const loadQuiz = async () => {
    try {
      const response = await fetch(`${import.meta.env.BASE_URL || '/'}data/${quizFileName || 'python_week1.json'}`);
      const data = await response.json();
      setQuizData(data);
      
      // Initialize empty answers
      const initialAnswers = {};
      data.questions.forEach(q => {
        initialAnswers[q.id] = q.type === 'multiple' ? [] : '';
      });
      setAnswers(initialAnswers);
    } catch (err) {
      console.error('Failed to load quiz data:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', minHeight: '60vh', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
        載入課程題庫與 Q-矩陣中...
      </div>
    );
  }

  if (!quizData) {
    return (
      <div style={{ display: 'flex', minHeight: '60vh', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
        <AlertTriangle style={{ color: '#fbbf24', width: '48px', height: '48px' }} />
        <span>無法載入題庫，請確認 /public/data/{quizFileName || 'python_week1.json'} 檔案是否存在。</span>
        {onBackToDashboard && (
          <button onClick={onBackToDashboard} className="btn-premium">返回控制台</button>
        )}
      </div>
    );
  }

  const questions = quizData.questions;
  const currentQuestion = questions[currentIdx];

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

  // Compile response vector and run psychometrics calculation
  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      // 1. Calculate student score and binary response vector (0 or 1)
      const responseVector = [];
      let score = 0;

      questions.forEach(q => {
        const userAns = answers[q.id];
        let isCorrect = 0;

        if (q.type === 'single') {
          isCorrect = userAns === q.answer ? 1 : 0;
        } else if (q.type === 'multiple') {
          // Compare arrays
          const cleanUser = Array.isArray(userAns) ? [...userAns].sort().join(',') : '';
          const cleanAns = Array.isArray(q.answer) ? [...q.answer].sort().join(',') : q.answer;
          isCorrect = cleanUser === cleanAns ? 1 : 0;
        } else if (q.type === 'fill') {
          // Exact text match (case-insensitive & trimmed)
          const cleanUser = typeof userAns === 'string' ? userAns.trim().toLowerCase() : '';
          const cleanAns = q.answer.trim().toLowerCase();
          
          // Handles bracket synonyms e.g. "直譯式 (或 interpreted)"
          if (cleanAns.includes('或')) {
            const synonyms = cleanAns.split(/[\(\)或]/).map(s => s.trim().toLowerCase()).filter(s => s);
            isCorrect = synonyms.some(syn => cleanUser.includes(syn) || syn.includes(cleanUser)) ? 1 : 0;
          } else {
            isCorrect = cleanUser === cleanAns ? 1 : 0;
          }
        }

        if (isCorrect === 1) score++;
        responseVector.push(isCorrect);
      });

      // 2. Generate 15 virtual students as background cohort reference for advanced CTT/IRT calculations
      const cohortMatrix = [];
      cohortMatrix.push(responseVector);

      for (let i = 0; i < 15; i++) {
        const virtualVector = [];
        const vAbility = -2.0 + (i * 0.28); // ranging from -2.0 to +2.2
        
        questions.forEach(q => {
          const qIdNum = parseInt(q.id.replace('Q', ''));
          const qDiff = (qIdNum % 5) - 2; // difficulty between -2 and +2
          const qDisc = 1.0 + (qIdNum % 3) * 0.3; // discrimination between 1.0 and 1.6
          
          const z = qDisc * (vAbility - qDiff);
          const pSuccess = 1 / (1 + Math.exp(-z));
          
          virtualVector.push(Math.random() < pSuccess ? 1 : 0);
        });
        cohortMatrix.push(virtualVector);
      }

      // 3. Prepare parameters for CTT / IRT / CDM calculations
      const itemNames = questions.map(q => q.id);
      const attributeNames = Object.keys(quizData.knowledge_points);
      const qMatrix = questions.map(q => q.q_vector);

      // 4. Run calculation engines
      const cttResults = calculateCTT(cohortMatrix, itemNames);
      const irtResults = calculateIRT2PL(cohortMatrix, itemNames);
      const cdmResults = calculateCDM(cohortMatrix, itemNames, qMatrix, attributeNames);

      // Extract capability values safely
      const theta = irtResults.studentDetails?.[0]?.theta ?? 0;

      // 5. Build standard report object
      const resultPayload = {
        score: score,
        totalQuestions: questions.length,
        responseVector: responseVector,
        rawAnswers: answers,
        theta: theta,
        cttMetrics: cttResults,
        irtMetrics: irtResults,
        cdmMetrics: cdmResults,
        created_at: new Date().toISOString()
      };

      // 6. Success callback to let parent save
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

  const progressPercent = Math.round(((currentIdx + 1) / questions.length) * 100);
  const unansweredCount = questions.filter(q => {
    const ans = answers[q.id];
    return q.type === 'multiple' ? ans.length === 0 : !ans;
  }).length;

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 24px', minHeight: '100vh' }}>
      
      {/* Upper Arena Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <button onClick={onBackToDashboard} className="btn-secondary" style={{ padding: '8px 16px', fontSize: '13px' }}>
          返回控制台
        </button>
        <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
          未答題目數：<strong style={{ color: unansweredCount > 0 ? '#fbbf24' : '#10b981' }}>{unansweredCount}</strong> 題
        </span>
      </div>

      {/* Modern Card Progress Container */}
      <div className="glass-container" style={{ padding: '32px', marginBottom: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', fontSize: '14px' }}>
          <span style={{ color: 'var(--text-neon-cyan)', fontWeight: '600' }}>單元：{quizData.title}</span>
          <span style={{ color: 'var(--text-muted)' }}>題目 {currentIdx + 1} / {questions.length}</span>
        </div>
        <div className="progress-container">
          <div className="progress-bar" style={{ width: `${progressPercent}%` }}></div>
        </div>
      </div>

      {/* Main Question Arena Card */}
      <div className="glass-container" style={{ padding: '40px', position: 'relative', minHeight: '380px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          {/* Question Meta Info */}
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '16px' }}>
            <span style={{ fontSize: '11px', fontWeight: '700', padding: '3px 8px', borderRadius: '6px', background: 'rgba(99,102,241,0.15)', color: 'var(--text-neon-purple)' }}>
              {currentQuestion.type === 'single' ? '單選題' : currentQuestion.type === 'multiple' ? '多選題' : '填空題'}
            </span>
            <span style={{ fontSize: '11px', fontWeight: '500', padding: '3px 8px', borderRadius: '6px', background: 'rgba(255,255,255,0.06)', color: 'var(--text-muted)' }}>
              主要知識點：{quizData.knowledge_points[currentQuestion.kp]}
            </span>
          </div>

          {/* Question Title */}
          <h3 style={{ fontSize: '20px', fontWeight: '600', lineHeight: '1.5', marginBottom: '32px' }}>
            {currentQuestion.id}. {currentQuestion.title}
          </h3>

          {/* Answer Inputs based on Question Type */}
          {currentQuestion.type === 'single' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {Object.entries(currentQuestion.options).map(([key, val]) => (
                <div 
                  key={key}
                  className={`quiz-option-card ${answers[currentQuestion.id] === key ? 'selected' : ''}`}
                  onClick={() => handleSingleSelect(key)}
                >
                  <div className="option-indicator">{key}</div>
                  <div style={{ fontSize: '15px' }}>{val}</div>
                </div>
              ))}
            </div>
          )}

          {currentQuestion.type === 'multiple' && (
            <div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '16px' }}>
                {Object.entries(currentQuestion.options).map(([key, val]) => {
                  const isSel = (answers[currentQuestion.id] || []).includes(key);
                  return (
                    <div 
                      key={key}
                      className={`quiz-option-card ${isSel ? 'selected' : ''}`}
                      onClick={() => handleMultiSelect(key)}
                    >
                      <div className="option-indicator">{key}</div>
                      <div style={{ fontSize: '15px' }}>{val}</div>
                    </div>
                  );
                })}
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '12px' }}>💡 提示：本題為複選題，答對需選擇所有正確選項，不倒扣。</p>
            </div>
          )}

          {currentQuestion.type === 'fill' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <input 
                type="text" 
                className="input-premium"
                placeholder="請在此處輸入您的解答（答案不區分大小寫）"
                value={answers[currentQuestion.id] || ''}
                onChange={(e) => handleFillInput(e.target.value)}
              />
              <div className="tip-box" style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <HelpCircle style={{ width: '16px', height: '16px', color: '#0ea5e9', flexShrink: 0 }} />
                <span style={{ fontSize: '13px', color: '#38bdf8' }}>請輸入簡潔的關鍵詞，如「PEP 8」、「\n」或英文術語。</span>
              </div>
            </div>
          )}
        </div>

        {/* Card Navigation Footer */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '48px', gap: '16px' }}>
          <button 
            onClick={() => setCurrentIdx(prev => Math.max(0, prev - 1))}
            className="btn-secondary"
            style={{ padding: '12px 24px', opacity: currentIdx === 0 ? 0.5 : 1, cursor: currentIdx === 0 ? 'not-allowed' : 'pointer' }}
            disabled={currentIdx === 0}
          >
            <ChevronLeft style={{ width: '18px', height: '18px' }} /> 上一題
          </button>

          {currentIdx === questions.length - 1 ? (
            <button 
              onClick={handleSubmit} 
              className="btn-premium"
              style={{ padding: '14px 28px', background: 'var(--success-glow)', boxShadow: '0 4px 20px rgba(16,185,129,0.25)' }}
              disabled={submitting}
            >
              {submitting ? '計算心理計量分析中...' : '提交測驗並解鎖診斷'} <Send style={{ width: '18px', height: '18px' }} />
            </button>
          ) : (
            <button 
              onClick={() => setCurrentIdx(prev => Math.min(questions.length - 1, prev + 1))}
              className="btn-secondary"
              style={{ padding: '12px 24px' }}
            >
              下一題 <ChevronRight style={{ width: '18px', height: '18px' }} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
