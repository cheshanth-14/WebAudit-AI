# WebAudit AI

## 1. Project Overview
WebAudit AI is a complete, single-page web application that performs automated website audits. It takes a URL, extracts factual on-page SEO metrics using Cheerio, and sends this data alongside the page content to Anthropic's Claude AI for structured, professional analysis.

The tool provides an "Agency-level" report split into:
- Scraped Metrics (Word count, Links, Meta Tags, etc.)
- Overall Score
- AI Insights (SEO, Messaging, UX, CTAs)
- Prioritized Actionable Recommendations

## 2. Setup Instructions

### Prerequisites
- Node.js (v18+ recommended)
- Your own Anthropic API Key

### Installation

1. Install all dependencies from root:
```bash
npm install
cd client && npm install
cd ..
```

2. Environment Setup:
Copy the example env file and add your Anthropic API Key.
```bash
cp .env.example .env
```
Edit `.env` and fill in `ANTHROPIC_API_KEY=sk-ant-api03-...`

3. Run the complete application (Frontend & Backend together):
```bash
npm run dev
```

The frontend will start on http://localhost:5173
The backend server will start on http://localhost:3001

## 3. Architecture Overview

```text
[ React Frontend ] 
        |
        | (POST /api/audit { url })
        v
[ Express Backend ] ---> [ Scraper (Cheerio) ]
        |                   - Fetch HTML
        |                   - Extract metrics
        v                   - Extract text
[ Prompt Builder ]  <------ (Returns Metrics + Content)
        |
        | (System + User Prompt)
        v
[ Claude API ]
        | (Structured JSON Response)
        v
[ Express Backend ]
        | (Send aggregated JSON payload)
        v
[ React Frontend ] ---> Render UI (Metrics, Insights, Logs)
```

## 4. AI Design Decisions
- **Structured JSON Output:** By enforcing a strict JSON schema via the system prompt, the frontend can reliably parse the response and map it into UI components like progress bars and recommendation cards.
- **Factual Grounding:** Instead of letting the AI hallucinate stats, we extract factual metrics (word counts, tag counts) via code layer and *inject* them into the prompt. The AI acts exclusively as an analyst interpreting real data.
- **Prompt Separation:** System prompt establishes the persona (EIGHT25MEDIA agency analyst) and constraints. User prompt delivers the factual payload and desired schema.

## 5. Trade-offs
- **Cheerio vs Puppeteer:** Cheerio is used because it's significantly faster and perfectly extracts standard DOM metrics. However, it cannot execute JavaScript, meaning Client-Side Rendered (CSR-only) pages won't be audited successfully.
- **Single Page Only:** Expanding this to an entire site crawl requires queuing systems, much higher token limits, and DB storage to maintain state over time.

## 6. What I'd Improve With More Time
- **Multi-page Crawling:** Implement a queue to crawl entire sitemaps and provide aggregate domain-level insights.
- **Puppeteer Integration:** Add a headless browser fallback for JS-heavy SPA websites.
- **Database & Caching:** Connect PostgreSQL or Redis to cache audit results so the same URL doesn't repeatedly consume Anthropic tokens within a short timeframe.
- **Historical Comparisons:** Allow users to diff today's audit score against last month's to track improvement.

## 7. Prompt Logs Sample
See the `prompt_logs_sample.md` file in the root directory for an exact example of the system prompt, user prompt, and Claude's raw JSON output.
