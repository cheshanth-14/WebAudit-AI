import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

async function tryModels() {
  const apiKey = process.env.GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const tests = [
    "gemini-1.5-flash",
    "gemini-1.5-flash-latest",
    "gemini-1.5-flash-001",
    "gemini-1.5-flash-002",
    "gemini-1.5-pro",
    "gemini-pro",
    "gemini-2.0-flash-exp",
    "gemini-2.0-flash-lite-preview-02-05",
    "gemini-2.0-flash"
  ];

  for (const modelName of tests) {
    try {
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent("hi");
      console.log(`Model ${modelName}: SUCCESS`);
      break; 
    } catch (e) {
      if (e.message.includes("429")) {
        console.log(`Model ${modelName}: QUOTA`);
      } else if (e.message.includes("404")) {
         console.log(`Model ${modelName}: 404`);
      } else {
        console.log(`Model ${modelName}: ERROR ${e.message}`);
      }
    }
  }
}

tryModels();
