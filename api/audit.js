import { scrapeWebsite } from '../server/scraper.js';
import { analyzeAuditedData } from '../server/aiAnalyzer.js';

export default async function handler(req, res) {
  // Add CORS headers for Vercel
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { url, model = 'gemini-2.0-flash' } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    // Basic URL validation
    new URL(url);
  } catch (err) {
    return res.status(400).json({ error: 'Invalid URL format' });
  }

  try {
    // Stage 1: Scrape
    const { metrics, pageContext } = await scrapeWebsite(url);

    // Stage 2: Analyze
    const aiAnalysisResult = await analyzeAuditedData({ url, metrics, pageContext }, model);

    // Return complete payload
    return res.status(200).json({
      metrics,
      ai_insights: aiAnalysisResult.insights,
      prompt_log: aiAnalysisResult.prompt_log
    });

  } catch (error) {
    console.error('Vercel Audit failed:', error.message);
    return res.status(500).json({ 
      error: 'Failed to complete audit', 
      details: error.message 
    });
  }
}
