import React, { useState, useEffect } from 'react';
import { Copy, Check, List } from 'lucide-react';

export default function MarkdownViewer({ rawText }) {
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

  // A basic but beautifully precise Python syntax highlighter
  const highlightPython = (code) => {
    const lines = code.split('\n');
    
    return lines.map((line, idx) => {
      // Handle comments entirely
      if (line.trim().startsWith('#')) {
        return <div key={idx} className="text-emerald-400 font-mono select-text">{line}</div>;
      }

      // Simple tokenization by strings, keywords, builtins
      const tokens = [];
      let temp = '';
      let inString = false;
      let stringChar = '';
      
      const keywords = ['def', 'class', 'import', 'from', 'return', 'if', 'else', 'elif', 'for', 'in', 'while', 'try', 'except', 'as', 'pass', 'lambda', 'with'];
      const builtins = ['print', 'input', 'int', 'str', 'float', 'len', 'range', 'list', 'dict', 'set', 'type', 'append', 'sep', 'end'];

      let i = 0;
      while (i < line.length) {
        const char = line[i];
        
        // Handle comment mid-line (if not inside a string)
        if (char === '#' && !inString) {
          if (temp) {
            tokens.push({ text: temp, type: 'normal' });
            temp = '';
          }
          tokens.push({ text: line.substring(i), type: 'comment' });
          break;
        }

        // Handle string literals
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

        // Word dividers
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
        <div key={idx} className="table-row font-mono hover:bg-slate-800/40 select-text">
          <span className="table-cell text-right pr-4 text-slate-600 select-none text-xs w-8 border-r border-slate-800">{idx + 1}</span>
          <span className="table-cell pl-4 whitespace-pre">
            {tokens.map((tok, tIdx) => {
              let colorClass = 'text-slate-100';
              if (tok.type === 'comment') colorClass = 'text-emerald-400 italic';
              else if (tok.type === 'string') colorClass = 'text-amber-300';
              else if (tok.type === 'keyword') colorClass = 'text-pink-400 font-semibold';
              else if (tok.type === 'builtin') colorClass = 'text-cyan-400';
              else if (tok.type === 'operator') colorClass = 'text-indigo-300';
              return <span key={tIdx} className={colorClass}>{tok.text}</span>;
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

  // Parsing markdown body dynamically
  const parseMarkdown = () => {
    const blocks = [];
    const lines = rawText.split('\n');
    let currentBlock = [];
    let isCode = false;
    let codeLanguage = '';
    let headingCount = 0;
    let listItems = [];

    const flushNormalText = (key) => {
      if (currentBlock.length === 0) return null;
      const content = currentBlock.join('\n').trim();
      currentBlock = [];
      if (!content) return null;

      // Split into paragraphs or lists
      const parsedParagraphs = content.split('\n\n').map((para, pIdx) => {
        // Handle bolding **text**
        const parts = [];
        let tempText = para;
        const boldRegex = /\*\*(.*?)\*\*/g;
        let match;
        let lastIdx = 0;

        while ((match = boldRegex.exec(para)) !== null) {
          if (match.index > lastIdx) {
            parts.push(para.substring(lastIdx, match.index));
          }
          parts.push(<strong key={match.index} className="text-pink-400 font-semibold">{match[1]}</strong>);
          lastIdx = boldRegex.lastIndex;
        }
        if (lastIdx < para.length) {
          parts.push(para.substring(lastIdx));
        }

        const isList = para.trim().startsWith('*') || para.trim().startsWith('-');
        if (isList) {
          const listLines = para.split('\n');
          return (
            <ul key={pIdx} className="space-y-2 my-3 pl-6 list-disc text-slate-300">
              {listLines.map((li, lIdx) => {
                const liText = li.replace(/^[\*\-]\s+/, '').trim();
                // Simple inner bold parsing
                const liParts = [];
                const liBoldRegex = /\*\*(.*?)\*\*/g;
                let liMatch;
                let liLastIdx = 0;
                while ((liMatch = liBoldRegex.exec(liText)) !== null) {
                  if (liMatch.index > liLastIdx) {
                    liParts.push(liText.substring(liLastIdx, liMatch.index));
                  }
                  liParts.push(<strong key={liMatch.index} className="text-indigo-300 font-semibold">{liMatch[1]}</strong>);
                  liLastIdx = liBoldRegex.lastIndex;
                }
                if (liLastIdx < liText.length) {
                  liParts.push(liText.substring(liLastIdx));
                }
                return <li key={lIdx} className="leading-relaxed">{liParts.length > 0 ? liParts : liText}</li>;
              })}
            </ul>
          );
        }

        return <p key={pIdx} className="leading-relaxed text-slate-300 text-base mb-4">{parts.length > 0 ? parts : para}</p>;
      });

      return <div key={key} className="mb-4">{parsedParagraphs}</div>;
    };

    let blockCounter = 0;

    for (let idx = 0; idx < lines.length; idx++) {
      const line = lines[idx];

      // Code Block Start/End
      if (line.trim().startsWith('```')) {
        if (!isCode) {
          // Flush accumulated text first
          const flushed = flushNormalText(`block-${blockCounter++}`);
          if (flushed) blocks.push(flushed);
          
          isCode = true;
          codeLanguage = line.replace('```', '').trim() || 'python';
        } else {
          // Flush code block
          const codeString = currentBlock.join('\n');
          const currentCounter = blockCounter++;
          blocks.push(
            <div key={`code-${currentCounter}`} className="relative my-6 rounded-2xl border border-slate-700 bg-slate-900/90 overflow-hidden shadow-2xl backdrop-blur-md">
              <div className="flex items-center justify-between px-4 py-3 bg-slate-950/70 border-b border-slate-800 text-xs text-slate-400 font-mono select-none">
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-pink-500 inline-block"></span>
                  <span>{codeLanguage.toUpperCase()} CODE WORKSPACE</span>
                </span>
                <button
                  onClick={() => handleCopy(codeString, currentCounter)}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition active:scale-95"
                >
                  {copiedIndex === currentCounter ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-semibold">已複製！</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>複製程式碼</span>
                    </>
                  )}
                </button>
              </div>
              <div className="p-4 overflow-x-auto text-sm w-full table select-text">
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

      // Headers (H1, H2, H3)
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
              <h1 key={`h-${blockCounter++}`} className="text-3xl font-extrabold text-white mt-8 mb-6 border-b border-indigo-900/30 pb-4 bg-gradient-to-r from-pink-400 to-indigo-400 bg-clip-text text-transparent select-text">
                {text}
              </h1>
            );
          } else if (depth === 2) {
            blocks.push(
              <h2 id={id} key={`h-${blockCounter++}`} className="text-2xl font-bold text-indigo-200 mt-10 mb-4 flex items-center gap-2 border-l-4 border-pink-500 pl-3 scroll-mt-24 select-text">
                {text}
              </h2>
            );
          } else {
            blocks.push(
              <h3 id={id} key={`h-${blockCounter++}`} className="text-xl font-semibold text-slate-200 mt-6 mb-3 scroll-mt-24 select-text">
                {text}
              </h3>
            );
          }
        }
        continue;
      }

      // Horizon separator
      if (line.trim() === '---' && !isCode) {
        const flushed = flushNormalText(`block-${blockCounter++}`);
        if (flushed) blocks.push(flushed);
        blocks.push(<hr key={`hr-${blockCounter++}`} className="my-8 border-slate-800" />);
        continue;
      }

      // Accumulate normal text lines
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
    <div className="flex gap-8 relative">
      {/* Markdown Content Frame */}
      <div className="flex-1 max-w-4xl bg-slate-900/35 border border-slate-800/80 p-8 md:p-10 rounded-3xl backdrop-blur-md text-slate-100 shadow-xl overflow-hidden select-text">
        {parseMarkdown()}
      </div>

      {/* Floating Dynamic Table of Contents (ToC) */}
      {headings.length > 0 && (
        <div className="hidden lg:block w-72 shrink-0 select-none">
          <div className="sticky top-24 p-5 rounded-2xl bg-slate-900/60 border border-slate-800/60 backdrop-blur-md">
            <h4 className="flex items-center gap-2 text-sm font-semibold text-indigo-400 mb-4 pb-2 border-b border-slate-800">
              <List className="w-4 h-4" />
              <span>本週單元導航</span>
            </h4>
            <nav className="space-y-2.5 max-h-[70vh] overflow-y-auto custom-scrollbar">
              {headings.map((h, i) => (
                <button
                  key={i}
                  onClick={() => scrollToHeading(h.id)}
                  className={`block text-left w-full text-xs transition duration-200 hover:text-pink-400 active:scale-95 ${
                    h.isSub 
                      ? 'pl-4 text-slate-400 hover:translate-x-1' 
                      : 'font-semibold text-slate-300 border-l border-slate-800 hover:border-pink-500 pl-2'
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
