import React from 'react';
import { Database, LayoutTemplate, Link as LinkIcon, Image, Clock, FileText } from 'lucide-react';

const MetricCard = ({ icon: Icon, title, value, subtext }) => (
  <div className="bg-slate-800/50 backdrop-blur-md p-5 rounded-2xl border border-polar/20 shadow-lg flex items-start gap-4 transition-all hover:bg-slate-800/70 hover:border-aurora/50 group">
    <div className="p-3 bg-polar/10 text-polar rounded-xl shadow-inner group-hover:bg-aurora/10 group-hover:text-aurora transition-colors">
      <Icon className="w-6 h-6" />
    </div>
    <div>
      <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1 group-hover:text-slate-300 transition-colors">{title}</p>
      <div className="text-2xl font-bold text-white font-display">{value}</div>
      {subtext && <p className="text-xs text-slate-500 mt-1">{subtext}</p>}
    </div>
  </div>
);

const MetricsPanel = ({ metrics }) => {
  return (
    <section>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white flex items-center font-display tracking-tight">
          <Database className="w-6 h-6 mr-3 text-aurora" />
          Factual Metrics
        </h2>
        <p className="text-sm text-slate-400 mt-1 font-light tracking-wide">Scraped Data Only (No AI)</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <MetricCard 
          icon={FileText} 
          title="Word Count" 
          value={metrics?.wordCount?.toLocaleString() || '0'} 
        />
        <MetricCard 
          icon={LayoutTemplate} 
          title="Headings" 
          value={`${metrics.h1Count} / ${metrics.h2Count} / ${metrics.h3Count}`} 
          subtext="H1 / H2 / H3"
        />
        <MetricCard 
          icon={LayoutTemplate} 
          title="Actionable CTAs" 
          value={metrics.ctaCount} 
        />
        <MetricCard 
          icon={Clock} 
          title="Load Time" 
          value={`${metrics.pageLoadTime} ms`} 
        />
      </div>

      <div className="bg-[#121b2e]/60 backdrop-blur-md rounded-2xl border border-polar/20 shadow-lg overflow-hidden mb-8">
        <div className="px-6 py-4 border-b border-polar/20 bg-[#0b1120]/60 flex items-center gap-3">
          <LinkIcon className="w-5 h-5 text-polar" />
          <h3 className="font-semibold text-slate-200 text-sm tracking-wide uppercase">Links & Media</h3>
        </div>
        <div className="p-6 space-y-5">
          <div className="flex justify-between items-center bg-[#0b1120]/40 p-3 rounded-xl">
            <span className="text-slate-400 text-sm font-medium">Internal Links</span>
            <span className="font-bold text-white text-lg">{metrics.internalLinks}</span>
          </div>
          <div className="flex justify-between items-center bg-[#0b1120]/40 p-3 rounded-xl">
            <span className="text-slate-400 text-sm font-medium">External Links</span>
            <span className="font-bold text-white text-lg">{metrics.externalLinks}</span>
          </div>
          <div className="flex justify-between items-center bg-[#0b1120]/40 p-3 rounded-xl">
            <span className="text-slate-400 text-sm font-medium">Total Images</span>
            <span className="font-bold text-white text-lg">{metrics.totalImages}</span>
          </div>
          <div className="flex justify-between items-center bg-[#0b1120]/60 p-3 rounded-xl border border-rose-500/20">
            <span className="text-slate-400 text-sm font-medium">Missing Alt Text</span>
            <span className={`font-bold text-lg ${metrics.imagesMissingAlt > 0 ? 'text-amber-400' : 'text-aurora'}`}>
              {metrics.imagesMissingAlt} <span className="text-sm opacity-80 font-normal">({metrics.percentMissingAlt}%)</span>
            </span>
          </div>
        </div>
      </div>

      <div className="bg-[#121b2e]/60 backdrop-blur-md rounded-2xl border border-polar/20 shadow-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-polar/20 bg-[#0b1120]/60 flex items-center gap-3">
          <FileText className="w-5 h-5 text-cosmic" />
          <h3 className="font-semibold text-slate-200 text-sm tracking-wide uppercase">Meta Tags</h3>
        </div>
        <div className="p-6 space-y-6">
          <div className="bg-[#0b1120]/40 p-4 rounded-xl border border-slate-800">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Title</span>
            <p className="mt-2 text-base text-slate-200 font-medium break-words leading-snug">{metrics.metaTitle || 'None found'}</p>
          </div>
          <div className="bg-[#0b1120]/40 p-4 rounded-xl border border-slate-800">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Description</span>
            <p className="mt-2 text-sm text-slate-300 break-words leading-relaxed">{metrics.metaDescription || 'None found'}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MetricsPanel;
