import React from 'react';
import { Target } from 'lucide-react';

const RecommendationsPanel = ({ recommendations }) => {
  return (
    <section className="mt-8">
      <div className="mb-4">
        <h2 className="text-lg font-bold text-slate-800 flex items-center">
          <Target className="w-5 h-5 mr-2 text-rose-500" />
          Top 5 Recommendations
        </h2>
        <p className="text-sm text-slate-500">Actionable steps to improve the page</p>
      </div>

      <div className="space-y-4">
        {recommendations.map((rec, idx) => (
          <div key={idx} className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex gap-5">
            <div className="shrink-0 pt-1">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-900 text-white font-bold text-sm">
                #{rec.priority}
              </span>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-slate-800 mb-2">{rec.title}</h3>
              
              <div className="text-sm text-slate-600 mb-3 bg-red-50 p-3 rounded-lg border border-red-100">
                <span className="font-semibold text-red-800 block mb-1">Issue Detected:</span>
                {rec.issue}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mt-4">
                <div>
                  <span className="block font-semibold text-slate-700 mb-1">Action:</span>
                  <p className="text-slate-800 font-medium">{rec.action}</p>
                </div>
                <div>
                  <span className="block font-semibold text-slate-700 mb-1">Expected Impact:</span>
                  <p className="text-emerald-700 bg-emerald-50 px-3 py-2 rounded-lg text-xs font-semibold inline-block border border-emerald-100">
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
