import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

async function verifyKey() {
  const apiKey = process.env.GEMINI_API_KEY;
  console.log(`Using Key: ${apiKey.substring(0, 10)}...`);
  const genAI = new GoogleGenerativeAI(apiKey);
  
  // Try to list models (this might fail if listModels isn't supported, but we'll try)
  try {
     const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-flash" }, { apiVersion: "v1beta" });
     const result = await model.generateContent("test");
     console.log("SUCCESS with gemini-1.5-flash (v1beta)");
  } catch (e) {
     console.log(`gemini-1.5-flash (v1beta) FAILED: ${e.message}`);
  }

  try {
     const model = genAI.getGenerativeModel({ model: "models/gemini-2.0-flash" }, { apiVersion: "v1beta" });
     const result = await model.generateContent("test");
     console.log("SUCCESS with gemini-2.0-flash (v1beta)");
  } catch (e) {
     console.log(`gemini-2.0-flash (v1beta) FAILED: ${e.message}`);
  }
}

verifyKey();
