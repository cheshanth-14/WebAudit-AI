import { analyzeAuditedData } from './server/aiAnalyzer.js';
import dotenv from 'dotenv';
dotenv.config();

const mockData = {
  url: 'https://example.com',
  metrics: {
    wordCount: 500,
    h1Count: 1,
    h2Count: 2,
    h3Count: 0,
    ctaCount: 2,
    totalImages: 5,
    imagesMissingAlt: 1,
    metaTitle: 'Example Site',
    metaDescription: 'An example site for testing.',
    pageLoadTime: 1500
  },
  pageContext: {
    visibleText: 'This is a test website for auditing logic. It has some text and links.',
    headingTexts: ['H1: Welcome', 'H2: About Us'],
    ctaTexts: ['Get Started', 'Contact Us'],
    metaTitle: 'Example Site',
    metaDescription: 'An example site for testing.'
  }
};

async function test() {
  try {
    const result = await analyzeAuditedData(mockData, 'gemini-1.5-flash');
    console.log('SUCCESS!');
    console.log(JSON.stringify(result.insights, null, 2));
  } catch (e) {
    console.error('FAILED:', e.message);
  }
}

test();
