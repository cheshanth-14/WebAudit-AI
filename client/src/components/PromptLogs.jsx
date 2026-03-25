import React, { useState } from 'react';
import { Terminal, Copy, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';

const PromptLogs = ({ logs }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copiedSection, setCopiedSection] = useState(null);

  const handleCopy = (text, section) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(section);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const LogSection = ({ title, content, sectionKey }) => (
    <div className="mt-4">
      <div className="flex justify-between items-center mb-2">
        <h4 className="text-sm font-semibold text-slate-300">{title}</h4>
        <button 
          onClick={() => handleCopy(content, sectionKey)}
          className="text-xs flex items-center gap-1 text-slate-400 hover:text-white transition-colors bg-slate-800 px-2 py-1 rounded"
        >
          {copiedSection === sectionKey ? (
            <><CheckCircle className="w-3 h-3 text-green-400" /> Copied!</>
          ) : (
            <><Copy className="w-3 h-3" /> Copy</>
          )}
        </button>
      </div>
      <div className="bg-slate-950 rounded-lg p-4 max-h-[400px] overflow-y-auto">
        <pre className="text-xs text-green-400 whitespace-pre-wrap font-mono leading-relaxed">
          {content}
        </pre>
      </div>
    </div>
  );

  return (
    <section className="mt-12 bg-slate-900 rounded-2xl overflow-hidden shadow-xl border border-slate-700">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 flex items-center justify-between bg-slate-800 hover:bg-slate-700 transition-colors"
      >
        <div className="flex items-center gap-3">
          <Terminal className="w-5 h-5 text-blue-400" />
          <div className="text-left">
            <h2 className="text-base font-bold text-white">Prompt Logs</h2>
            <p className="text-xs text-slate-400">AI Transparency & Debugging</p>
          </div>
        </div>
        {isOpen ? <ChevronUp className="text-slate-400" /> : <ChevronDown className="text-slate-400" />}
      </button>

      {isOpen && (
        <div className="p-6 border-t border-slate-700 bg-slate-900">
          <LogSection 
            title="System Prompt" 
            content={logs.system_prompt} 
            sectionKey="system" 
          />
          <LogSection 
            title="User Prompt (Data Payload)" 
            content={logs.user_prompt} 
            sectionKey="user" 
          />
          <LogSection 
            title="Raw Model Output (JSON Response)" 
            content={logs.raw_model_output} 
            sectionKey="output" 
          />
        </div>
      )}
    </section>
  );
};

export default PromptLogs;
