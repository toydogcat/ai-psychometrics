import React, { useState, useEffect } from 'react';
import { Copy, Check, List } from 'lucide-react';

const fontSizes = {
  small: {
    body: 'text-xs md:text-xs.5',
    li: 'text-xs',
    code: 'text-[11.5px]',
    h1: 'text-xl md:text-2xl',
    h2: 'text-base md:text-lg',
    h3: 'text-xs md:text-sm'
  },
  medium: {
    body: 'text-sm md:text-[14.5px]',
    li: 'text-sm',
    code: 'text-[13px]',
    h1: 'text-2xl md:text-3xl',
    h2: 'text-lg md:text-xl',
    h3: 'text-sm md:text-base'
  },
  large: {
    body: 'text-base md:text-[16.5px]',
    li: 'text-base',
    code: 'text-[15px]',
    h1: 'text-3xl md:text-4xl',
    h2: 'text-xl md:text-2xl',
    h3: 'text-base md:text-lg'
  },
  xlarge: {
    body: 'text-lg md:text-[18.5px]',
    li: 'text-lg',
    code: 'text-[17px]',
    h1: 'text-4xl md:text-5xl',
    h2: 'text-2xl md:text-3xl',
    h3: 'text-lg md:text-xl'
  }
};

export default function MarkdownViewer({ rawText }) {
  const [fontSize, setFontSize] = useState('medium');
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [headings, setHeadings] = useState([]);

  // Extract headings for the dynamic Table of Contents
  useEffect(() => {
    if (!rawText) return;
    const lines = rawText.split('\n');
    const extracted = [];
    let count = 0;
    
    lines.forEach(line => {
      if (line.startsWith('## ') || line.startsWith('### ')) {
        const isH3 = line.startsWith('### ');
        const text = line.replace(/^###?\s+/, '').trim();
        const id = `heading-${count++}`;
        extracted.push({ id, text, isSub: isH3 });
      }
    });
    setHeadings(extracted);
  }, [rawText]);

  if (!rawText) {
    return (
      <div className="flex items-center justify-center p-12 text-slate-400">
        <span className="animate-pulse">正在載入學習內容...</span>
      </div>
    );
  }

  // GitHub Dark Pro Python syntax highlighter
  const highlightPython = (code) => {
    const lines = code.split('\n');
    
    return lines.map((line, idx) => {
      if (line.trim().startsWith('#')) {
        return (
          <div key={idx} className="table-row font-mono hover:bg-slate-800/20 select-text">
            <span className="table-cell text-right pr-4 text-slate-700 select-none text-xs w-8 border-r border-slate-900/60">{idx + 1}</span>
            <span className="table-cell pl-4 whitespace-pre text-[#8b949e] italic font-mono">{line}</span>
          </div>
        );
      }

      const tokens = [];
      let temp = '';
      let inString = false;
      let stringChar = '';
      
      const keywords = ['def', 'class', 'import', 'from', 'return', 'if', 'else', 'elif', 'for', 'in', 'while', 'try', 'except', 'as', 'pass', 'lambda', 'with'];
      const builtins = ['print', 'input', 'int', 'str', 'float', 'len', 'range', 'list', 'dict', 'set', 'type', 'append', 'sep', 'end'];

      let i = 0;
      while (i < line.length) {
        const char = line[i];
        
        if (char === '#' && !inString) {
          if (temp) {
            tokens.push({ text: temp, type: 'normal' });
            temp = '';
          }
          tokens.push({ text: line.substring(i), type: 'comment' });
          break;
        }

        if ((char === '"' || char === "'") && (i === 0 || line[i-1] !== '\\')) {
          if (!inString) {
            if (temp) {
              tokens.push({ text: temp, type: 'normal' });
              temp = '';
            }
            inString = true;
            stringChar = char;
            temp += char;
          } else if (char === stringChar) {
            temp += char;
            tokens.push({ text: temp, type: 'string' });
            temp = '';
            inString = false;
          } else {
            temp += char;
          }
          i++;
          continue;
        }

        if (inString) {
          temp += char;
          i++;
          continue;
        }

        if (/[\s(){}[\].,:;+\-*/=<>!&|]/.test(char)) {
          if (temp) {
            if (keywords.includes(temp)) {
              tokens.push({ text: temp, type: 'keyword' });
            } else if (builtins.includes(temp)) {
              tokens.push({ text: temp, type: 'builtin' });
            } else {
              tokens.push({ text: temp, type: 'normal' });
            }
            temp = '';
          }
          tokens.push({ text: char, type: 'operator' });
        } else {
          temp += char;
        }
        i++;
      }

      if (temp) {
        if (keywords.includes(temp)) {
          tokens.push({ text: temp, type: 'keyword' });
        } else if (builtins.includes(temp)) {
          tokens.push({ text: temp, type: 'builtin' });
        } else {
          tokens.push({ text: temp, type: 'normal' });
        }
      }

      return (
        <div key={idx} className="table-row font-mono hover:bg-slate-800/25 select-text">
          <span className="table-cell text-right pr-4 text-slate-700 select-none text-xs w-8 border-r border-slate-900/60">{idx + 1}</span>
          <span className="table-cell pl-4 whitespace-pre font-mono">
            {tokens.map((tok, tIdx) => {
              let colorClass = 'text-[#c9d1d9]';
              if (tok.type === 'comment') colorClass = 'text-[#8b949e] italic font-mono';
              else if (tok.type === 'string') colorClass = 'text-[#a5d6ff] font-mono';
              else if (tok.type === 'keyword') colorClass = 'text-[#ff7b72] font-mono font-semibold';
              else if (tok.type === 'builtin') colorClass = 'text-[#79c0ff] font-mono font-medium';
              else if (tok.type === 'operator') colorClass = 'text-[#ff7b72] font-mono';
              return <span key={tIdx} className={`${colorClass} font-mono`}>{tok.text}</span>;
            })}
          </span>
        </div>
      );
    });
  };

  const handleCopy = (code, index) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const parseMarkdown = () => {
    const sizes = fontSizes[fontSize] || fontSizes.medium;
    const blocks = [];
    const lines = rawText.split('\n');
    let currentBlock = [];
    let isCode = false;
    let codeLanguage = '';
    let headingCount = 0;

    const flushNormalText = (key) => {
      if (currentBlock.length === 0) return null;
      const content = currentBlock.join('\n').trim();
      currentBlock = [];
      if (!content) return null;

      const parsedParagraphs = content.split('\n\n').map((para, pIdx) => {
        const parts = [];
        const boldRegex = /\*\*(.*?)\*\*/g;
        let match;
        let lastIdx = 0;

        while ((match = boldRegex.exec(para)) !== null) {
          if (match.index > lastIdx) {
            parts.push(para.substring(lastIdx, match.index));
          }
          parts.push(<strong key={match.index} className="text-pink-400 font-extrabold">{match[1]}</strong>);
          lastIdx = boldRegex.lastIndex;
        }
        if (lastIdx < para.length) {
          parts.push(para.substring(lastIdx));
        }

        const isList = para.trim().startsWith('*') || para.trim().startsWith('-');
        if (isList) {
          const listLines = para.split('\n');
          return (
            <ul key={pIdx} className="space-y-3.5 my-5 pl-1 flex flex-col list-none">
              {listLines.map((li, lIdx) => {
                const liText = li.replace(/^[\*\-]\s+/, '').trim();
                if (!liText) return null;

                const liParts = [];
                const liBoldRegex = /\*\*(.*?)\*\*/g;
                let liMatch;
                let liLastIdx = 0;
                while ((liMatch = liBoldRegex.exec(liText)) !== null) {
                  if (liMatch.index > liLastIdx) {
                    liParts.push(liText.substring(liLastIdx, liMatch.index));
                  }
                  liParts.push(<strong key={liMatch.index} className="text-pink-400 font-extrabold">{liMatch[1]}</strong>);
                  liLastIdx = liBoldRegex.lastIndex;
                }
                if (liLastIdx < liText.length) {
                  liParts.push(liText.substring(liLastIdx));
                }

                return (
                  <li key={lIdx} className={`flex items-start leading-relaxed md:leading-loose ${sizes.li} text-slate-300 tracking-wide`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-pink-500 to-indigo-500 mr-3.5 shrink-0 mt-2 shadow-[0_0_6px_rgba(236,72,153,0.45)]"></span>
                    <div className="flex-1 select-text">
                      {liParts.length > 0 ? liParts : liText}
                    </div>
                  </li>
                );
              })}
            </ul>
          );
        }

        return <p key={pIdx} className={`leading-relaxed md:leading-loose text-slate-300 ${sizes.body} mb-6 select-text tracking-wide`}>{parts.length > 0 ? parts : para}</p>;
      });

      return <div key={key} className="mb-4">{parsedParagraphs}</div>;
    };

    let blockCounter = 0;

    for (let idx = 0; idx < lines.length; idx++) {
      const line = lines[idx];

      if (line.trim().startsWith('```')) {
        if (!isCode) {
          const flushed = flushNormalText(`block-${blockCounter++}`);
          if (flushed) blocks.push(flushed);
          
          isCode = true;
          codeLanguage = line.replace('```', '').trim() || 'python';
        } else {
          const codeString = currentBlock.join('\n');
          const currentCounter = blockCounter++;
          const workspaceTitle = codeLanguage.toUpperCase() === 'PYTHON' ? 'PYTHON CODE WORKSPACE' : 'BASH SHELL ENVIRONMENT';
          blocks.push(
            <div key={`code-${currentCounter}`} className="relative my-6 rounded-2xl border border-white/5 bg-[#04060f] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.45)] backdrop-blur-md">
              <div className="flex items-center justify-between px-5 py-3 bg-[#070914]/80 border-b border-white/5 text-xs text-slate-400 font-mono select-none">
                <div className="flex items-center gap-4">
                  {/* macOS visual chrome circles */}
                  <div className="flex gap-1.5 select-none shrink-0">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56] inline-block shadow-[0_0_6px_rgba(255,95,86,0.25)]"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e] inline-block shadow-[0_0_6px_rgba(255,189,46,0.25)]"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f] inline-block shadow-[0_0_6px_rgba(39,201,63,0.25)]"></span>
                  </div>
                  <span className="tracking-widest font-mono text-[9px] text-slate-500 uppercase font-extrabold">{workspaceTitle}</span>
                </div>
                <button
                  onClick={() => handleCopy(codeString, currentCounter)}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900/50 hover:bg-slate-800 text-slate-300 hover:text-white border border-white/5 transition active:scale-95 text-[10px] font-semibold"
                >
                  {copiedIndex === currentCounter ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400 font-semibold">已複製！</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>複製程式碼</span>
                    </>
                  )}
                </button>
              </div>
              <div className={`p-4 overflow-x-auto ${sizes.code} w-full table select-text custom-scrollbar font-mono leading-6`}>
                {highlightPython(codeString)}
              </div>
            </div>
          );
          currentBlock = [];
          isCode = false;
        }
        continue;
      }

      if (isCode) {
        currentBlock.push(line);
        continue;
      }

      if (line.trim().startsWith('#') && !isCode) {
        const flushed = flushNormalText(`block-${blockCounter++}`);
        if (flushed) blocks.push(flushed);

        const hMatch = line.match(/^(#{1,3})\s+(.*)$/);
        if (hMatch) {
          const depth = hMatch[1].length;
          const text = hMatch[2].trim();
          const id = `heading-${headingCount++}`;

          if (depth === 1) {
            blocks.push(
              <h1 key={`h-${blockCounter++}`} className={`font-extrabold text-white mt-10 mb-6 border-b border-indigo-900/20 pb-4 bg-gradient-to-r from-pink-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent select-text tracking-tight ${sizes.h1}`}>
                {text}
              </h1>
            );
          } else if (depth === 2) {
            blocks.push(
              <h2 id={id} key={`h-${blockCounter++}`} className={`font-extrabold text-white mt-12 mb-6 flex items-center gap-3.5 scroll-mt-24 select-text ${sizes.h2}`}>
                <span className="w-1 h-6 rounded-full bg-gradient-to-b from-pink-500 to-indigo-500 shrink-0 shadow-[0_0_10px_rgba(236,72,153,0.5)]"></span>
                <span className="bg-gradient-to-r from-indigo-200 to-slate-100 bg-clip-text text-transparent">{text}</span>
              </h2>
            );
          } else {
            blocks.push(
              <h3 id={id} key={`h-${blockCounter++}`} className={`font-extrabold text-slate-100 mt-8 mb-4 flex items-center gap-2 scroll-mt-24 select-text ${sizes.h3}`}>
                <span className="w-1.5 h-1.5 rounded-full bg-pink-500/80 inline-block shadow-[0_0_6px_rgba(236,72,153,0.3)]"></span>
                <span>{text}</span>
              </h3>
            );
          }
        }
        continue;
      }

      if (line.trim() === '---' && !isCode) {
        const flushed = flushNormalText(`block-${blockCounter++}`);
        if (flushed) blocks.push(flushed);
        blocks.push(<hr key={`hr-${blockCounter++}`} className="my-8 border-slate-800/50" />);
        continue;
      }

      currentBlock.push(line);
    }

    const flushed = flushNormalText(`block-${blockCounter++}`);
    if (flushed) blocks.push(flushed);

    return blocks;
  };

  const scrollToHeading = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="flex gap-8 relative flex-col lg:flex-row items-start w-full">
      {/* Markdown Content Frame */}
      <div className="flex-1 max-w-4xl w-full bg-[#090b16]/25 border border-slate-800/60 p-6 md:p-10 rounded-3xl backdrop-blur-md text-slate-100 shadow-xl overflow-hidden select-text">
        {/* Font Control Bar */}
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-slate-800/40 select-none">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse shadow-[0_0_8px_rgba(236,72,153,0.5)]"></span>
            <span className="text-xs font-bold text-slate-400 tracking-wider">📚 研讀講義視窗</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[11px] text-slate-500 font-semibold tracking-wide">調整字型大小：</span>
            <div className="flex items-center bg-slate-950/70 border border-white/5 p-1 rounded-xl shadow-inner select-none shrink-0">
              <button
                onClick={() => setFontSize('small')}
                className={`px-3 py-1 text-[10px] rounded-lg transition duration-200 active:scale-95 font-bold ${
                  fontSize === 'small'
                    ? 'bg-gradient-to-r from-pink-500 to-indigo-500 text-white shadow-md shadow-pink-500/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                }`}
                title="小字型"
              >
                A-
              </button>
              <button
                onClick={() => setFontSize('medium')}
                className={`px-3 py-1 text-[10px] rounded-lg transition duration-200 active:scale-95 font-bold ${
                  fontSize === 'medium'
                    ? 'bg-gradient-to-r from-pink-500 to-indigo-500 text-white shadow-md shadow-pink-500/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                }`}
                title="一般字型 (預設)"
              >
                A
              </button>
              <button
                onClick={() => setFontSize('large')}
                className={`px-3 py-1 text-[10px] rounded-lg transition duration-200 active:scale-95 font-bold ${
                  fontSize === 'large'
                    ? 'bg-gradient-to-r from-pink-500 to-indigo-500 text-white shadow-md shadow-pink-500/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                }`}
                title="大字型"
              >
                A+
              </button>
              <button
                onClick={() => setFontSize('xlarge')}
                className={`px-3 py-1 text-[10px] rounded-lg transition duration-200 active:scale-95 font-bold ${
                  fontSize === 'xlarge'
                    ? 'bg-gradient-to-r from-pink-500 to-indigo-500 text-white shadow-md shadow-pink-500/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                }`}
                title="特大字型"
              >
                A++
              </button>
            </div>
          </div>
        </div>

        {parseMarkdown()}
      </div>

      {/* Floating Dynamic Table of Contents (ToC) */}
      {headings.length > 0 && (
        <div className="hidden lg:block w-72 shrink-0 select-none">
          <div className="sticky top-24 p-5 rounded-2xl bg-slate-900/35 border border-white/5 backdrop-blur-md shadow-lg">
            <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-400 mb-4 pb-2 border-b border-slate-800/60">
              <List className="w-4 h-4 text-pink-400" />
              <span>本週單元導航</span>
            </h4>
            <nav className="space-y-2.5 max-h-[65vh] overflow-y-auto custom-scrollbar">
              {headings.map((h, i) => (
                <button
                  key={i}
                  onClick={() => scrollToHeading(h.id)}
                  className={`block text-left w-full text-xs transition duration-200 hover:text-pink-400 hover:translate-x-1.5 active:scale-95 ${
                    h.isSub 
                      ? 'pl-4 text-slate-400' 
                      : 'font-bold text-slate-300 border-l-2 border-slate-800 hover:border-pink-500/80 pl-2'
                  }`}
                >
                  {h.text}
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}
