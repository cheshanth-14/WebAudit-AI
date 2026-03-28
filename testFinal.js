import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

async function testFetch() {
  const apiKey = process.env.GEMINI_API_KEY;
  
  const tests = [
    { model: 'gemini-1.5-flash', ver: 'v1' },
    { model: 'models/gemini-1.5-flash', ver: 'v1' },
    { model: 'gemini-pro', ver: 'v1' },
    { model: 'models/gemini-pro', ver: 'v1' }
  ];

  for (const t of tests) {
    const url = `https://generativelanguage.googleapis.com/${t.ver}/${t.model}:generateContent?key=${apiKey}`;
    try {
      const response = await axios.post(url, {
        contents: [{ parts: [{ text: "hi" }] }]
      });
      console.log(`✅ ${t.model} (${t.ver}) SUCCESS`);
    } catch (e) {
      const status = e.response ? e.response.status : 'ERR';
      const msg = e.response ? e.response.data.error.message : e.message;
      console.log(`❌ ${t.model} (${t.ver}) FAILED [${status}]: ${msg}`);
    }
  }
}

testFetch();
