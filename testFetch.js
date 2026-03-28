import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

async function testFetch() {
  const apiKey = process.env.GEMINI_API_KEY;
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
  
  try {
    const response = await axios.post(url, {
      contents: [{ parts: [{ text: "hi" }] }]
    });
    console.log('SUCCESS with fetch!');
    console.log(JSON.stringify(response.data, null, 2));
  } catch (e) {
    if (e.response) {
      console.log('FAILED with fetch (status):', e.response.status);
      console.log(JSON.stringify(e.response.data, null, 2));
    } else {
      console.log('FAILED with fetch:', e.message);
    }
  }
}

testFetch();
