import React, { useState } from 'react';
import MetricsPanel from './components/MetricsPanel';
import InsightsPanel from './components/InsightsPanel';
import RecommendationsPanel from './components/RecommendationsPanel';
import PromptLogs from './components/PromptLogs';
import { Search, Loader2, AlertCircle } from 'lucide-react';

function App() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [auditData, setAuditData] = useState(null);

  const handleAudit = async (e) => {
    e.preventDefault();
    if (!url) return;

    setLoading(true);
    setError('');
    setAuditData(null);

    // Basic URL format fix
    let targetUrl = url;
    if (!/^https?:\/\//i.test(targetUrl)) {
      targetUrl = 'https://' + targetUrl;
    }

    try {
      const response = await fetch('http://localhost:3001/api/audit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: targetUrl }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to complete audit');
      }

      setAuditData({
        url: targetUrl,
        ...data
      });
    } catch (err) {
      setError(err.message || 'An unexpected error occurred. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pb-20 selection:bg-polar/30">
      {/* Premium Header */}
      <header className="relative overflow-hidden pt-20 pb-32 px-6 text-center border-b border-cosmic/20 bg-[#0b1120]/80 backdrop-blur-md">
        <div className="absolute inset-0 bg-gradient-to-b from-cosmic/10 to-transparent"></div>
        <div className="relative z-10">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight bg-gradient-to-br from-white to-slate-300 text-transparent bg-clip-text font-display drop-shadow-sm">
            WebAudit <span className="text-transparent bg-clip-text bg-gradient-to-r from-aurora via-polar to-cosmic">AI</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
            AI-powered website analysis by EIGHT25MEDIA. Enter any URL to extract factual SEO metrics and receive a structured, data-driven critique from Google Gemini.
          </p>
          
          <form onSubmit={handleAudit} className="mt-12 max-w-3xl mx-auto flex flex-col sm:flex-row gap-4 relative">
            <div className="relative flex-1 group">
              <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none transition-colors group-focus-within:text-aurora">
                <Search className="h-5 w-5 text-slate-500" />
              </div>
              <input
                type="text"
                required
                className="w-full pl-14 pr-6 py-5 rounded-2xl text-slate-100 bg-[#121b2e]/60 backdrop-blur-md border border-polar/30 focus:border-aurora focus:outline-none focus:ring-4 focus:ring-aurora/20 text-lg shadow-xl outline-none transition-all placeholder-slate-500"
                placeholder="https://example.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                disabled={loading}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-5 bg-gradient-to-r from-polar to-cosmic hover:from-polar/90 hover:to-cosmic/90 text-white font-semibold rounded-2xl transition-all shadow-[0_0_20px_rgba(61,111,160,0.4)] hover:shadow-[0_0_30px_rgba(93,58,128,0.5)] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center min-w-[200px] border border-cosmic/50 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-aurora/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              {loading ? (
                <>
                  <Loader2 className="animate-spin h-6 w-6 mr-3 relative z-10" />
                  <span className="relative z-10">Auditing...</span>
                </>
              ) : (
                <span className="text-lg relative z-10 font-bold tracking-wide">Audit This Page</span>
              )}
            </button>
          </form>

          {error && (
            <div className="mt-8 max-w-3xl mx-auto bg-rose-500/10 border border-rose-500/30 text-rose-200 px-5 py-4 rounded-xl flex items-center justify-center backdrop-blur-sm animate-in fade-in slide-in-from-top-4">
              <AlertCircle className="h-5 w-5 mr-3 shrink-0" />
              <p>{error}</p>
            </div>
          )}
        </div>
      </header>

      {/* Main Content Area */}
      {auditData && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20 space-y-8 animate-in fade-in duration-700">
          
          {/* Section 2: Overall Score */}
          <div className="bg-[#121b2e]/80 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.4)] p-8 md:p-10 border border-polar/20 flex flex-col md:flex-row items-center gap-10">
            <div className="shrink-0 relative">
              <div className="absolute inset-0 bg-aurora rounded-full blur-[30px] opacity-20"></div>
              <div className="relative flex flex-col items-center justify-center w-36 h-36 rounded-full border-[6px] border-[#0b1120] bg-gradient-to-br from-[#1a2642] to-[#0b1120] text-aurora shadow-[inset_0_4px_20px_rgba(34,196,160,0.15)]">
                <span className="text-5xl font-black font-display tracking-tight text-white drop-shadow-[0_2px_10px_rgba(34,196,160,0.5)]">{auditData.ai_insights.overall_score}</span>
                <span className="text-sm font-semibold text-aurora/70 uppercase tracking-widest mt-1">/ 10</span>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white mb-3 font-display">Overall Assessment for <span className="text-polar font-medium inline-block max-w-full truncate align-bottom" title={auditData.url}>{auditData.url.replace(/^https?:\/\//, '')}</span></h2>
              <p className="text-slate-300 text-lg leading-relaxed font-light">
                {auditData.ai_insights.overall_summary}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Section 1: Metrics Panel container */}
            <div className="lg:col-span-4 space-y-6">
              <MetricsPanel metrics={auditData.metrics} />
            </div>

            <div className="lg:col-span-8 space-y-8">
              {/* Section 3: AI Insights */}
              <InsightsPanel insights={auditData.ai_insights} />

              {/* Section 4: Recommendations */}
              <RecommendationsPanel recommendations={auditData.ai_insights.recommendations} />
            </div>
          </div>

          {/* Section 5: Prompt Logs */}
          <div className="pt-8">
            <PromptLogs logs={auditData.prompt_log} />
          </div>
          
        </main>
      )}
    </div>
  );
}

export default App;
