import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;

async function listModels() {
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
    const data = await response.json();
    if (data.models) {
        console.log("AVAILABLE MODELS:");
        data.models.forEach(m => console.log(`- ${m.name} (${m.displayName})`));
    } else {
        console.log("NO MODELS FOUND:", JSON.stringify(data));
    }
  } catch (err) {
    console.error(err);
  }
}

listModels();
