import React from 'react';
import { Sparkles } from 'lucide-react';

const ScoreBar = ({ score }) => {
  const color = score < 5 ? '#f43f5e' : (score < 8 ? '#3D6FA0' : '#22C4A0');
  return (
    <div className="w-full h-1 bg-slate-900/50 rounded-full mt-4 overflow-hidden relative border border-white/5">
      <div 
        className="h-full rounded-full transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(255,255,255,0.1)]" 
        style={{ 
          width: `${(score / 10) * 100}%`,
          backgroundColor: color,
        }}
      ></div>
    </div>
  );
};

const CategoryCard = ({ title, data }) => (
  <div className="w-full bg-[#121b2e]/40 p-10 rounded-[32px] border border-white/[0.04] shadow-2xl backdrop-blur-xl group flex flex-col items-center text-center h-full">
    <div className="mb-6 space-y-2">
      <p className="text-[10px] font-black tracking-[0.4em] text-slate-500 uppercase">Analysis Segment</p>
      <h3 className="text-3xl font-bold text-white tracking-tight group-hover:text-aurora transition-colors">{title.replace('_', ' ')}</h3>
    </div>
    
    <div className="flex flex-col items-center mb-8">
      <div className="text-5xl font-black text-white font-display mb-2 drop-shadow-md">
        {data.score}
        <span className="text-base text-slate-500 font-bold ml-1 opacity-40">/10</span>
      </div>
      <ScoreBar score={data.score} />
    </div>

    <div className="mb-10 text-center flex-1">
      <p className="text-lg text-slate-300 leading-relaxed font-light italic">
        {data.summary}
      </p>
    </div>
    
    <div className="w-full pt-8 border-t border-white/5 text-left">
      <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-6 text-center">Observations</p>
      <ul className="space-y-4 w-full">
        {data.findings.map((finding, idx) => (
          <li key={idx} className="flex items-start text-sm text-slate-400">
            <span className="mr-4 text-aurora font-bold text-lg leading-none mt-0.5">/</span>
            <span className="leading-relaxed">{finding}</span>
          </li>
        ))}
      </ul>
    </div>
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
    <section className="w-full py-20 flex flex-col items-center">
      {/* Centralized Section Header */}
      <div className="w-full text-center flex flex-col items-center justify-center mb-24 px-6">
        <div className="p-4 bg-cosmic/10 rounded-3xl border border-cosmic/20 mb-6">
          <Sparkles className="w-10 h-10 text-cosmic" />
        </div>
        <h2 className="text-5xl font-black text-white tracking-tight mb-4 text-center w-full">
          Deep Analysis <span className="text-transparent bg-clip-text bg-gradient-to-r from-aurora via-polar to-cosmic">Insights</span>
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-aurora to-cosmic rounded-full mb-6"></div>
        <p className="text-xl text-slate-400 font-light max-w-xl text-center">
          Segmented breakdown of page performance across our core marketing agency benchmarks.
        </p>
      </div>

      {/* Symmetric Grid Layout (2 per row) */}
      <div className="w-full max-w-7xl flex flex-wrap justify-center gap-10 px-6">
        {categories.map((cat, index) => (
          <div 
            key={cat.key} 
            className={`flex ${index === 4 ? 'w-full' : 'w-full lg:w-[calc(50%-20px)] xl:w-[calc(50%-20px)]'}`}
          >
            <CategoryCard 
              title={cat.label} 
              data={insights[cat.key]} 
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default InsightsPanel;
