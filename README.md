# WebAudit AI — Premium Site Analysis Dashboard

**WebAudit AI** is a high-end, agency-standard website auditing tool powered by Google Gemini. It captures real-time SEO and UX metrics from any URL and provides a deep, data-driven AI analysis using a multi-model failover system.

---

## 🚀 Key Features

*   **Symmetric Design Language**: A "Center-Weighted" luxury dashboard featuring a custom 2+2+1 symmetric card layout for all insights and recommendations.
*   **Multi-Model Toggle**: A stylish, glassmorphic dropdown to swap between **Gemini 2.0 Flash**, **Gemini 2.5 Flash**, and **Gemini 2.0 Lite** on-the-fly to manage API quotas.
*   **Deep Marketing Analysis**: Segmented breakdown across 5 key performance areas (SEO, Messaging, CTAs, Content Depth, and UX).
*   **Factual Metric Internalization**: AI and Scraper are fully synced – the AI critiques the exact word counts, heading tags, and load times recorded by the engine.
*   **Glassmorphic Aesthetic**: A premium dark-mode interface with `backdrop-blur-xl`, subtle gradients, and custom iconography.

---

## 🛠️ Technical Stack

*   **Frontend**: React.js, Tailwind CSS, Lucide Icons.
*   **Backend**: Express.js, Cheerio (Advanced Web Scraping), Axios.
*   **AI Engine**: Google Generative AI (Gemini 2.0 / 2.5 Flash).
*   **Design Philosophy**: Mathematical centering, high-end agency aesthetic (EIGHT25MEDIA style).

---

## ⚡ Quick Start

### 1. Prerequisites
*   Node.js installed.
*   A Google AI Studio API Key ([Get one here](https://aistudio.google.com/)).

### 2. Environment Setup
Create a `.env` file in the root directory:
```env
PORT=3001
GEMINI_API_KEY=your_key_here
```

### 3. Install & Run
From the root directory:
```bash
# Install dependencies
npm install

# Run both Client and Server concurrently
npm run dev
```
The app will be available at `http://localhost:5173`.

---

## 📂 Project Structure

*   `/client`: Vite-powered React frontend.
    *   `/src/components`: Premium UI card and panel components.
*   `/server`: Node.js backend.
    *   `scraper.js`: DOM extraction and SSL bypass logic.
    *   `aiAnalyzer.js`: Dynamic multi-model prompt orchestration.

---

**Developed for high-performance marketing agency benchmarks.**
