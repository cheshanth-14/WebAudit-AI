import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function test() {
  const models = ['gemini-2.0-flash', 'gemini-1.5-flash', 'gemini-1.5-flash-8b', 'gemini-1.5-pro'];
  for (const m of models) {
    try {
      console.log(`Checking ${m} with v1beta...`);
      const model = genAI.getGenerativeModel({ model: m }, { apiVersion: 'v1beta' });
      const result = await model.generateContent("test");
      console.log(`✅ ${m} works: ${result.response.text().substring(0, 20)}...`);
    } catch (e) {
      console.log(`❌ ${m} failed: ${e.message}`);
    }
  }
}

test();
