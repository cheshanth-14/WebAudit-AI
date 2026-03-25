import React from 'react';
import { Target, ArrowRight } from 'lucide-react';

const RecommendationsPanel = ({ recommendations }) => {
  return (
    <section className="mt-12">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-white flex items-center font-display tracking-tight">
          <Target className="w-6 h-6 mr-3 text-cosmic" />
          Top Recommendations
        </h2>
        <p className="text-sm text-slate-400 mt-1 font-light tracking-wide">Actionable, prioritized steps to improve the page</p>
      </div>

      <div className="space-y-5">
        {recommendations.map((rec, idx) => (
          <div key={idx} className="bg-[#121b2e]/60 backdrop-blur-md rounded-2xl border border-polar/20 p-6 sm:p-8 shadow-lg flex flex-col sm:flex-row gap-6 relative overflow-hidden group hover:border-aurora/50 transition-colors">
            
            {/* Subtle Gradient Glow Based on Priority */}
            <div className={`absolute top-0 right-0 w-64 h-64 mix-blend-screen opacity-10 rounded-full blur-3xl pointer-events-none ${
              rec.priority === 1 ? 'bg-rose-500' : 
              rec.priority === 2 ? 'bg-cosmic' : 
              'bg-polar'
            }`}></div>

            <div className="shrink-0 relative z-10">
              <span className={`flex items-center justify-center w-12 h-12 rounded-xl text-white font-black text-lg border-2 shadow-inner font-display ${
                rec.priority === 1 ? 'bg-rose-500/20 text-rose-400 border-rose-500/30' : 
                rec.priority === 2 ? 'bg-cosmic/40 text-[#b5a1e5] border-cosmic/50' : 
                'bg-polar/20 text-polar border-polar/30'
              }`}>
                #{rec.priority}
              </span>
            </div>
            
            <div className="flex-1 relative z-10">
              <h3 className="text-xl font-bold text-white mb-4 font-display group-hover:text-aurora transition-colors">{rec.title}</h3>
              
              <div className="text-sm text-slate-300 mb-5 bg-rose-500/10 p-4 rounded-xl border border-rose-500/20 leading-relaxed">
                <span className="font-semibold text-rose-400 block mb-1.5 uppercase tracking-widest text-xs">Issue Detected</span>
                {rec.issue}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
                <div className="bg-[#0b1120]/60 p-4 rounded-xl border border-polar/20">
                  <span className="block font-semibold text-slate-500 mb-2 uppercase tracking-widest text-xs flex items-center">
                    Action <ArrowRight className="w-3 h-3 ml-1" />
                  </span>
                  <p className="text-slate-200 font-medium text-sm leading-relaxed">{rec.action}</p>
                </div>
                <div className="bg-[#0b1120]/60 p-4 rounded-xl border border-polar/20">
                  <span className="block font-semibold text-slate-500 mb-2 uppercase tracking-widest text-xs flex items-center">
                    Expected Impact
                  </span>
                  <p className="text-aurora text-sm font-medium leading-relaxed">
                    {rec.impact}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecommendationsPanel;
