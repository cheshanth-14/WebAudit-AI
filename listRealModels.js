import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

async function listModels() {
  const apiKey = process.env.GEMINI_API_KEY;
  const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
  
  try {
    const response = await axios.get(url);
    console.log('SUCCESS!');
    console.log(response.data.models.map(m => m.name).join('\n'));
  } catch (e) {
    if (e.response) {
      console.log('FAILED (status):', e.response.status);
      console.log(JSON.stringify(e.response.data, null, 2));
    } else {
      console.log('FAILED:', e.message);
    }
  }
}

listModels();
