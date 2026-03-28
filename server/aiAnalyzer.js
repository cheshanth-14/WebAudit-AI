import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

/**
 * Helper to pause execution
 */
async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


/**
 * Main Analysis function for audited data
 */
export async function analyzeAuditedData(data, selectedModelName = "gemini-2.5-flash") {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not set in environment variables');
  }

  const { url, metrics, pageContext } = data;
  const genAI = new GoogleGenerativeAI(apiKey);

  const systemPrompt = `You are an expert SEO and web performance analyst. Your job is to audit marketing websites and provide structured, data-driven insights.
Respond ONLY in valid JSON format. Do NOT output markdown code fences.

Respond with a JSON object in EXACTLY this structure:
{
  "seo_analysis": { "score": 1-10, "summary": "...", "findings": [] },
  "messaging_clarity": { "score": 1-10, "summary": "...", "findings": [] },
  "cta_analysis": { "score": 1-10, "summary": "...", "findings": [] },
  "content_depth": { "score": 1-10, "summary": "...", "findings": [] },
  "ux_concerns": { "score": 1-10, "summary": "...", "findings": [] },
  "recommendations": [ { "priority": 1, "title": "...", "issue": "...", "action": "...", "impact": "..." } ],
  "overall_score": 1-10,
  "overall_summary": "..."
}`;

  const userPrompt = `Audit metrics for ${url}:
- Word Count: ${metrics.wordCount}
- H1: ${metrics.h1Count}, H2: ${metrics.h2Count}, H3: ${metrics.h3Count}
- CTA Elements: ${metrics.ctaCount}
- Images: ${metrics.totalImages} (Missing Alt: ${metrics.imagesMissingAlt})
- Meta Title: ${metrics.metaTitle}
- Meta Description: ${metrics.metaDescription}
- Load Time: ${metrics.pageLoadTime}ms

PAGE CONTENT SNIPPET:
${pageContext.visibleText.substring(0, 5000)}`;

  // Use 2.5-flash as it's the only one verified working for this key
  const config = { id: "gemini-2.5-flash", apiVersion: "v1beta" };
  const modelsToTry = [config];

  for (const config of modelsToTry) {
    const modelId = config.id.startsWith('models/') ? config.id : `models/${config.id}`;
    try {
      console.log(`[AI] Attempting audit with ${modelId} (${config.apiVersion})...`);
      
      const model = genAI.getGenerativeModel(
        { model: modelId },
        { apiVersion: config.apiVersion }
      );

      const result = await model.generateContent([
        { text: systemPrompt },
        { text: userPrompt }
      ]);

      const rawOutput = result.response.text();
      const cleaned = rawOutput.replace(/```json\n?|```/g, '').trim();
      
      let parsed;
      try {
        parsed = JSON.parse(cleaned);
      } catch (e) {
        const match = cleaned.match(/\{[\s\S]*\}/);
        if (match) parsed = JSON.parse(match[0]);
        else throw new Error("JSON Parse Error");
      }

      // FUZZY NORMALIZE keys to ensure they match frontend expectations
      const fuzzyNormalize = (obj) => {
        const result = {};
        const targetKeys = [
          'seo_analysis', 'messaging_clarity', 'cta_analysis', 
          'content_depth', 'ux_concerns', 'overall_score', 'overall_summary'
        ];
        
        // Helper to find best target key for a source key
        const getTarget = (sKey) => {
          const lower = sKey.toLowerCase();
          if (lower.includes('seo')) return 'seo_analysis';
          if (lower.includes('message') || lower.includes('clarity')) return 'messaging_clarity';
          if (lower.includes('cta') || lower.includes('call') || lower.includes('action')) return 'cta_analysis';
          if (lower.includes('content') || lower.includes('depth')) return 'content_depth';
          if (lower.includes('ux') || lower.includes('user') || lower.includes('exper')) return 'ux_concerns';
          if (lower.includes('score')) return 'overall_score';
          if (lower.includes('summary')) return 'overall_summary';
          return null;
        };

        for (let key in obj) {
          const target = getTarget(key);
          if (target) result[target] = obj[key];
          // Keep original too just in case
          result[key] = obj[key];
        }
        return result;
      };

      const normalized = fuzzyNormalize(parsed);

      return {
        insights: normalized,
        prompt_log: {
          model_used: `${modelId} (${config.apiVersion})`,
          system_prompt: systemPrompt,
          user_prompt: userPrompt,
          raw_model_output: rawOutput
        }
      };

    } catch (error) {
      const msg = error.message.toLowerCase();
      console.warn(`[AI] ${config.id} failed: ${error.message}`);

      // Special handling for quota 0 which indicates project restriction
      if (msg.includes('limit: 0') || msg.includes('quota exceeded')) {
        if (config.id.includes('2.0')) {
           continue;
        }
      }

      // If we hit quota or not found, try the next model in the list
      if (msg.includes('quota') || msg.includes('404') || msg.includes('not found') || msg.includes('429')) {
        continue;
      }
      
      continue;
    }
  }

  throw new Error("AI Quota Issue: All models hit a limit or were not found for this key. IMPORTANT: If 'limit: 0' appears, please generate a NEW API key in Google AI Studio (aistudio.google.com) as your current project might be restricted.");
}
