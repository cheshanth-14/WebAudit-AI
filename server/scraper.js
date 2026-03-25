import axios from 'axios';
import * as cheerio from 'cheerio';

export async function scrapeWebsite(url) {
  const startTime = Date.now();
  
  try {
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9'
      },
      timeout: 30000 // Increased from 10s to 30s to allow massive, slow-to-respond e-commerce sites to load
    });
    
    const pageLoadTime = Date.now() - startTime;
    const html = response.data;
    const $ = cheerio.load(html);

    // Remove scripts, styles, and SVG paths to clean up text extraction
    $('script, style, svg, noscript, iframe').remove();

    // 1. Factual Metrics Extraction

    // Extract body text and word count
    const visibleText = $('body').text().replace(/\s+/g, ' ').trim();
    const wordCount = visibleText ? visibleText.split(/\s+/).length : 0;

    // Headings
    const h1Count = $('h1').length;
    const h2Count = $('h2').length;
    const h3Count = $('h3').length;

    const headingTexts = [];
    $('h1, h2, h3').each((i, el) => {
      headingTexts.push(`${el.tagName.toUpperCase()}: ${$(el).text().trim()}`);
    });

    // Links (Internal vs External)
    const baseUrl = new URL(url).origin;
    let internalLinks = 0;
    let externalLinks = 0;

    $('a[href]').each((i, el) => {
      const href = $(el).attr('href');
      if (href.startsWith('/') || href.startsWith(baseUrl)) {
        internalLinks++;
      } else if (href.startsWith('http')) {
        externalLinks++;
      }
    });

    // Images
    const totalImages = $('img').length;
    let imagesMissingAlt = 0;
    $('img').each((i, el) => {
      const alt = $(el).attr('alt');
      if (!alt || alt.trim() === '') {
        imagesMissingAlt++;
      }
    });
    const percentMissingAlt = totalImages > 0 
      ? Math.round((imagesMissingAlt / totalImages) * 100) 
      : 0;

    // Meta Tags
    const metaTitle = $('title').text().trim();
    const metaDescription = $('meta[name="description"]').attr('content') || '';

    // CTAs (buttons + specific action text)
    const ctaKeywords = ['get started', 'contact', 'buy', 'sign up', 'request', 'demo', 'free', 'try'];
    const ctaTexts = [];
    
    // Find buttons
    $('button, a.button, a.btn').each((i, el) => {
      const text = $(el).text().trim();
      if (text) ctaTexts.push(text);
    });

    // Find links with CTA text
    $('a').each((i, el) => {
      const text = $(el).text().trim().toLowerCase();
      if (text && ctaKeywords.some(kw => text.includes(kw))) {
        // Only add if not already caught by class
        const actualText = $(el).text().trim();
        if (!ctaTexts.includes(actualText)) {
          ctaTexts.push(actualText);
        }
      }
    });

    const ctaCount = ctaTexts.length;

    // Compile Metrics
    const metrics = {
      wordCount,
      h1Count,
      h2Count,
      h3Count,
      ctaCount,
      internalLinks,
      externalLinks,
      totalImages,
      imagesMissingAlt,
      percentMissingAlt,
      metaTitle,
      metaDescription,
      pageLoadTime
    };

    // Compile Page Context for AI
    // Truncate text to roughly 3000 words logic
    const wordsArray = visibleText.split(/\s+/);
    const truncatedText = wordsArray.slice(0, 3000).join(' ');

    const pageContext = {
      visibleText: truncatedText,
      headingTexts,
      ctaTexts,
      metaTitle,
      metaDescription
    };

    return { metrics, pageContext };

  } catch (error) {
    throw new Error(`Scraping failed: ${error.message}`);
  }
}
