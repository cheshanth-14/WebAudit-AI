import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

export async function analyzeAuditedData(data, selectedModel = "gemini-1.5-flash") {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not set in environment variables');
  }

  const { url, metrics, pageContext } = data;

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ 
    model: String(selectedModel),
    generationConfig: {
      temperature: 0.1,
      topP: 0.95,
      topK: 40,
      maxOutputTokens: 2048,
      responseMimeType: "application/json",
    }
  });

  const systemPrompt = `You are an expert SEO and web performance analyst working for a digital marketing agency called EIGHT25MEDIA. Your job is to audit marketing websites and provide structured, data-driven insights.

Your analysis must:
- Be grounded in the provided metrics — reference specific numbers
- Be specific to this page, never generic
- Use professional but clear language
- Never invent data not provided to you

Respond ONLY in valid JSON format representing the exact object structure requested. Do NOT output markdown code fences (\`\`\`json). Return purely the JSON text.`;

  const userPrompt = `Here are the factual metrics for the page at ${url}:

METRICS:
- Word Count: ${metrics.wordCount}
- H1 Tags: ${metrics.h1Count}
- H2 Tags: ${metrics.h2Count}  
- H3 Tags: ${metrics.h3Count}
- CTA Elements: ${metrics.ctaCount}
- Internal Links: ${metrics.internalLinks}
- External Links: ${metrics.externalLinks}
- Total Images: ${metrics.totalImages}
- Images Missing Alt Text: ${metrics.imagesMissingAlt} (${metrics.percentMissingAlt}%)
- Meta Title: ${metrics.metaTitle}
- Meta Description: ${metrics.metaDescription}
- Page Load Time: ${metrics.pageLoadTime}ms

PAGE HEADINGS:
${pageContext.headingTexts.join('\n')}

CTA TEXTS FOUND:
${pageContext.ctaTexts.join('\n')}

PAGE CONTENT (first 3000 words):
${pageContext.visibleText}

---

Based on this data, respond with a JSON object in EXACTLY this structure:

{
  "seo_analysis": {
    "score": <number 1-10>,
    "summary": "<2-3 sentence summary>",
    "findings": ["<specific finding 1>", "<specific finding 2>", "<specific finding 3>"]
  },
  "messaging_clarity": {
    "score": <number 1-10>,
    "summary": "<2-3 sentence summary>",
    "findings": ["<finding 1>", "<finding 2>", "<finding 3>"]
  },
  "cta_analysis": {
    "score": <number 1-10>,
    "summary": "<2-3 sentence summary>",
    "findings": ["<finding 1>", "<finding 2>", "<finding 3>"]
  },
  "content_depth": {
    "score": <number 1-10>,
    "summary": "<2-3 sentence summary>",
    "findings": ["<finding 1>", "<finding 2>", "<finding 3>"]
  },
  "ux_concerns": {
    "score": <number 1-10>,
    "summary": "<2-3 sentence summary>",
    "findings": ["<finding 1>", "<finding 2>", "<finding 3>"]
  },
  "recommendations": [
    {
      "priority": 1,
      "title": "<short title>",
      "issue": "<what the problem is, referencing a specific metric>",
      "action": "<specific actionable fix>",
      "impact": "<expected outcome>"
    },
    {
      "priority": 2,
      "title": "<short title>",
      "issue": "<issue>",
      "action": "<action>",
      "impact": "<impact>"
    },
    {
      "priority": 3,
      "title": "<short title>",
      "issue": "<issue>",
      "action": "<action>",
      "impact": "<impact>"
    },
    {
      "priority": 4,
      "title": "<short title>",
      "issue": "<issue>",
      "action": "<action>",
      "impact": "<impact>"
    },
    {
      "priority": 5,
      "title": "<short title>",
      "issue": "<issue>",
      "action": "<action>",
      "impact": "<impact>"
    }
  ],
  "overall_score": <number 1-10>,
  "overall_summary": "<3-4 sentence executive summary of the entire page audit>"
}`;

  try {
    const response = await model.generateContent([
      { text: systemPrompt },
      { text: userPrompt }
    ]);

    const rawOutput = response.response.text();
    
    // Parse JSON safely
    let parsedJson;
    try {
      const jsonMatch = rawOutput.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        parsedJson = JSON.parse(jsonMatch[0]);
      } else {
        parsedJson = JSON.parse(rawOutput);
      }
    } catch (parseError) {
      console.error("Failed to parse JSON from Gemini:", rawOutput);
      throw new Error("Gemini returned invalid JSON");
    }

    return {
      insights: parsedJson,
      prompt_log: {
        system_prompt: systemPrompt,
        user_prompt: userPrompt,
        raw_model_output: rawOutput
      }
    };

  } catch (error) {
    throw new Error(`AI Analysis failed: ${error.message}`);
  }
}
