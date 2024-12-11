const axios = require('axios');

async function summarizeContent(content) {
  if (!process.env.GPT_API_KEY) return '';
  
  const prompt = `以下のテキストを要約してください:\n${content}\n短い箇条書きポイントでお願いします。`;
  
  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', 
      {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.GPT_API_KEY}`
        }
      }
    );
    return response.data.choices[0].message.content.trim();
  } catch (error) {
    console.error(error);
    return '';
  }
}

module.exports = { summarizeContent };
