# WebAudit AI — Agency-Grade Website Analysis Dashboard

**WebAudit AI** is a premium, high-performance website auditing tool built specifically for **EIGHT25MEDIA's** internal evaluation needs. It captures real-time SEO, UX, and performance metrics from any single page and provides a deep, data-grounded AI analysis via a custom-tuned Gemini 2.5 Flash engine.

---

## 🚀 Compliance with Agency Requirements

This tool was designed from the ground up to meet all **EIGHT25MEDIA** technical specifications:

1.  **Factual Metrics Section**: Extracts word count, heading structures (H1-H3), CTA counts, image metadata (missing alt text counts), and meta-tags.
2.  **AI Insights Engine**: Generates a structured analysis of SEO, Messaging, CTAs, and UX, directly grounded in the captured factual metrics (verified for zero hallucination).
3.  **Prioritized Recommendations**: Provides a dedicated "Top Recommendations" panel with 3-5 prioritized, actionable steps.
4.  **Prompt Transparency (Logs)**: Includes a full reasoning trace that reveals:
    -   The official **System Prompt** used for the audit.
    -   The structured **User Prompt** payload constructed from scraped data.
    -   The **Raw Model Output** before frontend formatting.

---

## 🛠️ Technical Implementation

*   **Scraper (`server/scraper.js`)**: Uses **Cheerio + Axios** with custom User-Agent and SSL-bypass logic to extract raw DOM content without being blocked.
*   **AI Orchestration (`server/aiAnalyzer.js`)**: Currently optimized for **Gemini 2.5 Flash**, the only model with confirmed high-speed prototype quota for this API project.
*   **Frontend (`client/src`)**: A high-end, dark-mode React interface featuring **Glassmorphism**, Lucide iconography, and a **Symmetric Hybrid Layout** (Horizontal cards for recommendations).

---

## ⚡ Setup Instructions

### 1. Prerequisites
*   Node.js (v18+)
*   A Google AI Studio API Key ([Get one here](https://aistudio.google.com/)).

### 2. Configure Environment
Create a `.env` file in the root directory:
```env
PORT=3001
GEMINI_API_KEY=your_key_here
```

### 3. Launch App
From the root directory:
```bash
# Install all dependencies (concurrently manages client/server)
npm install

# Run the full stack in development mode
npm run dev
```
The app will open automatically at `http://localhost:5173`.

---

## 📂 Project Logic Map

*   `server/scraper.js`: Handles DOM selection, word counting, and CTA detection.
*   `server/aiAnalyzer.js`: Normalizes LLM JSON keys and builds the multi-shot prompt.
*   `client/src/components/PromptLogs.jsx`: The transparency layer that shows how we "ground" the AI.

**Built for high-performance marketing agency standards.**
