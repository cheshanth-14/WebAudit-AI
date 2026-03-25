import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { scrapeWebsite } from './scraper.js';
import { analyzeAuditedData } from './aiAnalyzer.js';

dotenv.config({ path: '.env' });

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.post('/api/audit', async (req, res) => {
  const { url, model = 'gemini-1.5-flash' } = req.body;

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
    console.log(`[${new Date().toLocaleTimeString()}] Starting audit for ${url} using ${model}...`);

    // Step 1 & 2: Scrape the page
    console.log('1. Scraping website...');
    const { metrics, pageContext } = await scrapeWebsite(url);

    // Step 3 & 4: Analyze with Google Gemini
    console.log('2. Analyzing with Google Gemini...');
    const aiAnalysisResult = await analyzeAuditedData(url, metrics, pageContext);

    // Step 5: Return complete payload
    console.log('Audit complete.');
    res.json({
      metrics,
      ai_insights: aiAnalysisResult.insights,
      prompt_log: aiAnalysisResult.prompt_log
    });

  } catch (error) {
    console.error('Audit failed:', error.message);
    res.status(500).json({ 
      error: 'Failed to complete audit', 
      details: error.message 
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
