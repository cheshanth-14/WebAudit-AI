import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

async function testModelVersion(modelName, apiVersion) {
  console.log(`Testing model ${modelName} with API version ${apiVersion}...`);
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: modelName }, { apiVersion: apiVersion });
  try {
    const result = await model.generateContent("Hello?");
    console.log(`${modelName} (${apiVersion}) success!`);
    console.log(result.response.text());
  } catch (e) {
    console.log(`${modelName} (${apiVersion}) error: ${e.message}`);
  }
}

async function run() {
  await testModelVersion("gemini-1.5-flash", "v1");
  await testModelVersion("gemini-1.5-flash", "v1beta");
}

run();
