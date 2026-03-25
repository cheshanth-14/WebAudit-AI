import React from 'react';
import { Database, LayoutTemplate, Link as LinkIcon, Image, Clock, FileText } from 'lucide-react';

const MetricCard = ({ icon: Icon, title, value, subtext }) => (
  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-start gap-4">
    <div className="p-3 bg-slate-50 text-slate-600 rounded-lg">
      <Icon className="w-5 h-5" />
    </div>
    <div>
      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">{title}</p>
      <div className="text-xl font-bold text-slate-800">{value}</div>
      {subtext && <p className="text-xs text-slate-500 mt-1">{subtext}</p>}
    </div>
  </div>
);

const MetricsPanel = ({ metrics }) => {
  return (
    <section>
      <div className="mb-4">
        <h2 className="text-lg font-bold text-slate-800 flex items-center">
          <Database className="w-5 h-5 mr-2 text-blue-600" />
          Factual Metrics
        </h2>
        <p className="text-sm text-slate-500">Scraped Data (No AI)</p>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <MetricCard 
          icon={FileText} 
          title="Word Count" 
          value={metrics.wordCount.toLocaleString()} 
        />
        <MetricCard 
          icon={LayoutTemplate} 
          title="Headings" 
          value={`${metrics.h1Count} / ${metrics.h2Count} / ${metrics.h3Count}`} 
          subtext="H1 / H2 / H3"
        />
        <MetricCard 
          icon={LayoutTemplate} 
          title="Call To Actions" 
          value={metrics.ctaCount} 
        />
        <MetricCard 
          icon={Clock} 
          title="Load Time" 
          value={`${metrics.pageLoadTime} ms`} 
        />
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-6">
        <div className="px-5 py-4 border-b border-slate-100 bg-slate-50 flex items-center gap-2">
          <LinkIcon className="w-4 h-4 text-slate-500" />
          <h3 className="font-semibold text-slate-700 text-sm">Links & Media</h3>
        </div>
        <div className="p-5 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-slate-600 text-sm">Internal Links</span>
            <span className="font-semibold text-slate-800">{metrics.internalLinks}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-600 text-sm">External Links</span>
            <span className="font-semibold text-slate-800">{metrics.externalLinks}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-600 text-sm">Total Images</span>
            <span className="font-semibold text-slate-800">{metrics.totalImages}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-600 text-sm">Missing Alt Text</span>
            <span className={`font-semibold ${metrics.imagesMissingAlt > 0 ? 'text-amber-600' : 'text-green-600'}`}>
              {metrics.imagesMissingAlt} ({metrics.percentMissingAlt}%)
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 bg-slate-50">
          <h3 className="font-semibold text-slate-700 text-sm">Meta Tags</h3>
        </div>
        <div className="p-5 space-y-4">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase">Title</span>
            <p className="mt-1 text-sm text-slate-800 break-words">{metrics.metaTitle || 'None found'}</p>
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase">Description</span>
            <p className="mt-1 text-sm text-slate-800 break-words line-clamp-3">{metrics.metaDescription || 'None found'}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MetricsPanel;
