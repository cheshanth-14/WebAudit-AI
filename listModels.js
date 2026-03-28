import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

async function listModels() {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  try {
    const list = await genAI.listModels();
    console.log(JSON.stringify(list, null, 2));
  } catch (e) {
    console.error(e);
  }
}

listModels();
