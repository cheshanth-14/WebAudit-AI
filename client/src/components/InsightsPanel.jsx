import React from 'react';
import { Sparkles } from 'lucide-react';

const ScoreBar = ({ score }) => {
  let colorClass = "bg-aurora";
  let dropShadow = "drop-shadow-[0_0_8px_rgba(34,196,160,0.5)]";
  if (score < 5) {
    colorClass = "bg-rose-500";
    dropShadow = "drop-shadow-[0_0_8px_rgba(244,63,94,0.5)]";
  } else if (score < 8) {
    colorClass = "bg-polar";
    dropShadow = "drop-shadow-[0_0_8px_rgba(61,111,160,0.5)]";
  }

  return (
    <div className="w-full bg-[#0b1120] rounded-full h-2 mt-3 overflow-hidden border border-polar/20">
      <div 
        className={`${colorClass} ${dropShadow} h-full rounded-full transition-all duration-1000 ease-out`} 
        style={{ width: `${(score / 10) * 100}%` }}
      ></div>
    </div>
  );
};

const CategoryCard = ({ title, data }) => (
  <div className="bg-[#121b2e]/60 backdrop-blur-md rounded-2xl border border-polar/10 p-6 shadow-lg hover:bg-[#1a2642]/80 hover:border-polar/30 transition-all duration-300 group">
    <div className="flex justify-between items-center mb-4">
      <h3 className="font-bold text-lg text-white capitalize font-display tracking-wide">{title.replace('_', ' ')}</h3>
      <div className="flex items-end gap-1 bg-[#0b1120]/50 px-3 py-1.5 rounded-lg border border-polar/20 group-hover:border-polar/40 transition-colors">
        <span className="text-xl font-black text-white leading-none font-display">{data.score}</span>
        <span className="text-xs text-slate-500 font-semibold mb-0.5">/ 10</span>
      </div>
    </div>
    <ScoreBar score={data.score} />
    <p className="mt-5 text-sm text-slate-300 font-medium leading-relaxed">
      {data.summary}
    </p>
    <ul className="mt-5 space-y-3">
      {data.findings.map((finding, idx) => (
        <li key={idx} className="flex items-start text-sm text-slate-400">
          <span className="text-aurora mr-3 mt-1 opacity-80">✦</span>
          <span className="leading-snug">{finding}</span>
        </li>
      ))}
    </ul>
  </div>
);

const InsightsPanel = ({ insights }) => {
  const categories = [
    { key: 'seo_analysis', label: 'SEO Analysis' },
    { key: 'messaging_clarity', label: 'Messaging Clarity' },
    { key: 'cta_analysis', label: 'CTA Effectiveness' },
    { key: 'content_depth', label: 'Content Depth' },
    { key: 'ux_concerns', label: 'UX & Performance' }
  ];

  return (
    <section>
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-white flex items-center font-display tracking-tight">
          <Sparkles className="w-6 h-6 mr-3 text-cosmic" />
          AI Analysis
        </h2>
        <p className="text-sm text-slate-400 mt-1 font-light tracking-wide">Generated natively by Google Gemini 2.5</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {categories.map((cat) => (
          <CategoryCard 
            key={cat.key} 
            title={cat.label} 
            data={insights[cat.key]} 
          />
        ))}
      </div>
    </section>
  );
};

export default InsightsPanel;
