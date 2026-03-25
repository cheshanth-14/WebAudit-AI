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
    <div className="min-h-screen pb-20">
      {/* Header */}
      <header className="bg-slate-900 text-white pt-16 pb-24 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-indigo-400 text-transparent bg-clip-text">
          WebAudit AI
        </h1>
        <p className="text-slate-300 text-lg max-w-2xl mx-auto">
          AI-powered website analysis by EIGHT25MEDIA. Enter any URL to extract factual SEO metrics and receive a structured, data-driven critique from Claude 3.5 Sonnet.
        </p>
        
        <form onSubmit={handleAudit} className="mt-10 max-w-3xl mx-auto flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              required
              className="w-full pl-12 pr-4 py-4 rounded-xl text-slate-900 bg-white border border-slate-300 focus:outline-none focus:ring-4 focus:ring-blue-500/30 text-lg shadow-sm"
              placeholder="https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              disabled={loading}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center min-w-[180px]"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin h-5 w-5 mr-2" />
                Auditing...
              </>
            ) : (
              'Audit This Page'
            )}
          </button>
        </form>

        {error && (
          <div className="mt-6 max-w-3xl mx-auto bg-red-500/10 border border-red-500/30 text-red-200 px-4 py-3 rounded-lg flex items-center justify-center">
            <AlertCircle className="h-5 w-5 mr-2" />
            {error}
          </div>
        )}
      </header>

      {/* Main Content Area */}
      {auditData && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10 space-y-8">
          
          {/* Section 2: Overall Score */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-100 flex flex-col md:flex-row items-center gap-8">
            <div className="shrink-0 flex flex-col items-center justify-center w-32 h-32 rounded-full border-8 border-blue-100 bg-blue-50 text-blue-700">
              <span className="text-4xl font-extrabold">{auditData.ai_insights.overall_score}</span>
              <span className="text-sm font-semibold opacity-70">/ 10</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-2">Overall Assessment for {auditData.url}</h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                {auditData.ai_insights.overall_summary}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Section 1: Metrics Panel */}
            <div className="lg:col-span-1 space-y-6">
              <MetricsPanel metrics={auditData.metrics} />
            </div>

            <div className="lg:col-span-2 space-y-8">
              {/* Section 3: AI Insights */}
              <InsightsPanel insights={auditData.ai_insights} />

              {/* Section 4: Recommendations */}
              <RecommendationsPanel recommendations={auditData.ai_insights.recommendations} />
            </div>
          </div>

          {/* Section 5: Prompt Logs */}
          <PromptLogs logs={auditData.prompt_log} />
          
        </main>
      )}
    </div>
  );
}

export default App;
