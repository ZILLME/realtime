const axios = require('axios');

async function analyzeSentiment(content) {
  if (!process.env.GPT_API_KEY) return 'neutral';

  const prompt = `以下のテキストの全体的な感情トーンを「ポジティブ」「ネガティブ」「ニュートラル」のいずれかで回答してください:\n${content}`;
  
  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', 
      {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        temperature: 0
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.GPT_API_KEY}`
        }
      }
    );
    const sentiment = response.data.choices[0].message.content.trim();
    if (sentiment.includes('ポジティブ')) return 'positive';
    if (sentiment.includes('ネガティブ')) return 'negative';
    return 'neutral';
  } catch (error) {
    console.error(error);
    return 'neutral';
  }
}

module.exports = { analyzeSentiment };
