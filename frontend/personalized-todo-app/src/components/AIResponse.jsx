"use client";

import React, { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import mermaid from 'mermaid';

// Mermaid Config: Dark theme setup
mermaid.initialize({
  startOnLoad: false,
  theme: 'dark',
  securityLevel: 'loose',
  themeVariables: {
    primaryColor: '#a855f7', // Purple color for nodes
    lineColor: '#94a3b8',
    fontFamily: 'Inter, sans-serif',
  }
});

const AIResponse = ({ content }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    // Har baar content update hone par Mermaid diagrams ko render karega
    if (content) {
      mermaid.contentLoaded();
    }
  }, [content]);

  return (
    <div ref={containerRef} className="w-full bg-[#0f172a] rounded-xl border border-gray-700 shadow-2xl overflow-hidden">
      {/* Header section */}
      <div className="bg-[#1e293b] px-4 py-2 border-b border-gray-700 flex items-center gap-2">
        <span className="text-purple-400">✨</span>
        <h3 className="text-sm font-medium text-gray-200">AI Execution Plan & Roadmap</h3>
      </div>

      {/* Main Content Area */}
      <div className="p-6 text-gray-300 leading-relaxed">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            // Tables styling
            table: ({ children }) => (
              <div className="overflow-x-auto my-4">
                <table className="min-w-full border border-gray-700 rounded-lg">{children}</table>
              </div>
            ),
            th: ({ children }) => <th className="bg-gray-800 border border-gray-700 px-4 py-2 text-left">{children}</th>,
            td: ({ children }) => <td className="border border-gray-700 px-4 py-2">{children}</td>,
            
            // Checkbox/List styling
            li: ({ children, checked }) => (
              <li className={`list-none flex gap-2 my-1 ${checked ? 'text-green-400 line-through' : ''}`}>
                <span>{checked ? '✅' : '•'}</span>
                {children}
              </li>
            ),

            // Mermaid Diagram handling
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '');
              const codeValue = String(children).replace(/\n$/, '');

              if (!inline && match && match[1] === 'mermaid') {
                return (
                  <div className="mermaid my-6 flex justify-center p-4 bg-white/5 rounded-lg border border-purple-500/20">
                    {codeValue}
                  </div>
                );
              }

              return (
                <code className="bg-gray-800 px-1.5 py-0.5 rounded text-purple-300 font-mono text-sm" {...props}>
                  {children}
                </code>
              );
            },
            
            // Heading styling
            h1: ({children}) => <h1 className="text-2xl font-bold text-white mt-6 mb-4 border-b border-gray-700 pb-2">{children}</h1>,
            h2: ({children}) => <h2 className="text-xl font-semibold text-purple-400 mt-6 mb-3">{children}</h2>,
            h3: ({children}) => <h3 className="text-lg font-medium text-gray-100 mt-4 mb-2">{children}</h3>,
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default AIResponse;