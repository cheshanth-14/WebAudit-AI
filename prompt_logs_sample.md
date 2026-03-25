# Prompt Logs Sample

This file demonstrates what is sent to the Claude API and what the API returns in a typical website audit run.

## 1. System Prompt

```text
You are an expert SEO and web performance analyst working for a digital marketing agency called EIGHT25MEDIA. Your job is to audit marketing websites and provide structured, data-driven insights.

You will be given:
1. Factual metrics scraped from a webpage
2. The actual page content and headings

Your analysis must:
- Be grounded in the provided metrics — reference specific numbers
- Be specific to this page, never generic
- Use professional but clear language
- Never invent data not provided to you

Respond ONLY in valid JSON format. No extra text, no markdown fences.
```

## 2. User Prompt (Example Payload)

```text
Here are the factual metrics for the page at https://example.com:

METRICS:
- Word Count: 342
- H1 Tags: 1
- H2 Tags: 3  
- H3 Tags: 5
- CTA Elements: 2
- Internal Links: 12
- External Links: 4
- Total Images: 3
- Images Missing Alt Text: 1 (33%)
- Meta Title: Example Domain - Home
- Meta Description: This is an example domain for illustrative examples in documents.
- Page Load Time: 450ms

PAGE HEADINGS:
H1: Example Domain
H2: More Information
H2: Contact Us
H2: About This Site
H3: Privacy Policy

CTA TEXTS FOUND:
More information
Contact Us

PAGE CONTENT (first 3000 words):
Example Domain This domain is for use in illustrative examples in documents. You may use this domain in literature without prior coordination or asking for permission. More information...

---

Based on this data, respond with a JSON object in EXACTLY this structure:
[... truncated structure defined in code ...]
```

## 3. Raw Model Output (Claude's Result)

```json
{
  "seo_analysis": {
    "score": 6,
    "summary": "The page has foundational SEO elements but lacks depth.",
    "findings": [
      "The meta title is present but generic.",
      "The page has a good H1/H2 hierarchy but could use more descriptive headers.",
      "33% of images are missing alt text, which hurts accessibility and image SEO."
    ]
  },
  "messaging_clarity": {
    "score": 8,
    "summary": "The messaging is extremely direct and easy to understand.",
    "findings": [
      "The word count is low (342 words) keeping the message brief.",
      "The H1 clearly states what the page is."
    ]
  },
  "cta_analysis": {
    "score": 4,
    "summary": "Calls to action are weak and non-specific.",
    "findings": [
      "Only 2 CTAs found, which is low for a marketing page.",
      "The phrase 'More information' is vague."
    ]
  },
  "content_depth": {
    "score": 5,
    "summary": "Content is sufficient for a placeholder page but not for a marketing funnel.",
    "findings": [
      "342 words is generally too short to rank well for competitive keywords.",
      "Lacks supporting imagery."
    ]
  },
  "ux_concerns": {
    "score": 9,
    "summary": "The page is lightweight and fast.",
    "findings": [
      "Excellent page load time of 450ms."
    ]
  },
  "recommendations": [
    {
      "priority": 1,
      "title": "Fix Missing Image Alt Text",
      "issue": "1 image (33%) is missing an alt attribute.",
      "action": "Add descriptive alt text to the affected image.",
      "impact": "Improves screen reader accessibility and image SEO ranking."
    }
  ],
  "overall_score": 6.4,
  "overall_summary": "This page successfully functions as a fast, lightweight placeholder but lacks the content depth, strong calls to action, and comprehensive SEO optimization needed for an effective marketing landing page."
}
```
