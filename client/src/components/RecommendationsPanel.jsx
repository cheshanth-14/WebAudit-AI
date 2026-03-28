import React from 'react';
import { Target, ArrowRight } from 'lucide-react';

const safeRender = (val) => {
  if (!val) return null;
  if (typeof val === 'string') return val;
  if (typeof val === 'number') return val.toString();
  if (typeof val === 'object') {
    return val.detail || val.description || val.summary || val.text || val.content || JSON.stringify(val);
  }
  return String(val);
};

const RecommendationsPanel = ({ recommendations }) => {
  return (
    <section className="mt-12">
      <div className="mb-10 text-center flex flex-col items-center">
        <h2 className="text-3xl font-bold text-white flex items-center justify-center font-display tracking-tight">
          <Target className="w-8 h-8 mr-4 text-cosmic" />
          Top Recommendations
        </h2>
        <p className="text-base text-slate-400 mt-3 font-light tracking-wide max-w-xl">Actionable, prioritized steps from our AI analysis to improve your page performance and conversion.</p>
      </div>

      <div className="flex flex-col gap-6 max-w-5xl mx-auto">
        {recommendations?.map((rec, idx) => {
          const glowClass = rec?.priority === 1 ? 'bg-rose-500' : (rec?.priority === 2 ? 'bg-cosmic' : 'bg-polar');

          return (
            <div 
              key={idx} 
              className="bg-[#121b2e]/60 backdrop-blur-md rounded-[24px] border border-white/5 shadow-2xl overflow-hidden group hover:border-aurora/30 transition-all hover:-translate-y-1"
            >
              <div className="flex flex-col md:flex-row min-h-[220px]">
                {/* Left Side: Priority & Title */}
                <div className={`md:w-1/3 p-8 border-b md:border-b-0 md:border-r border-white/5 flex flex-col justify-center relative overflow-hidden`}>
                  <div className={`absolute top-0 left-0 w-32 h-32 ${glowClass} opacity-10 blur-3xl rounded-full`}></div>
                  
                  <div className="relative z-10 space-y-4">
                    <span className={`inline-flex items-center justify-center w-12 h-12 rounded-xl text-white font-black text-lg border-2 shadow-lg font-display ${
                      rec?.priority === 1 ? 'bg-rose-500/20 text-rose-400 border-rose-500/30' : 
                      rec?.priority === 2 ? 'bg-cosmic/40 text-[#b5a1e5] border-cosmic/50' : 
                      'bg-polar/20 text-polar border-polar/30'
                    }`}>
                      #{rec?.priority ?? (idx + 1)}
                    </span>
                    <h3 className="text-2xl font-bold text-white font-display leading-tight group-hover:text-aurora transition-colors">
                      {safeRender(rec?.title) ?? 'Strategic Recommendation'}
                    </h3>
                  </div>
                </div>

                {/* Right Side: Analysis Detail */}
                <div className="md:w-2/3 p-8 bg-black/20 flex flex-col justify-between gap-6">
                  <div>
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-3 block">Current Issue</span>
                    <p className="text-slate-300 leading-relaxed font-light italic text-lg">
                      {safeRender(rec?.issue) ?? 'Analysis failed to identify specific issue detail.'}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-white/5">
                    <div>
                      <span className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-2">
                        Proposed Action <ArrowRight className="w-3 h-3 text-aurora" />
                      </span>
                      <p className="text-slate-200 font-medium text-sm leading-relaxed">
                        {safeRender(rec?.action) ?? 'No specific action plan provided.'}
                      </p>
                    </div>
                    <div>
                      <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-2 block">Expected Impact</span>
                      <p className="text-aurora text-sm font-bold leading-relaxed">
                        {safeRender(rec?.impact) ?? 'Minimal performance improvement expected.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        }) ?? <p className="text-slate-500 italic mt-8 text-center">No strategic recommendations were generated for this project.</p>}
      </div>
    </section>
  );
};

export default RecommendationsPanel;
