// api/generate.js
// 這是運行在伺服器端的程式碼，絕對安全，不會暴露 API Key

export default async function handler(req, res) {
  // 1. 檢查請求方法
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  // 2. 取得前端傳來的資料
  const { destination, days } = req.body;

  if (!destination || !days) {
    return res.status(400).json({ message: 'Missing destination or days' });
  }

  try {
    // 3. 呼叫 OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}` // 從 Vercel 環境變數讀取
      },
      body: JSON.stringify({
        model: "gpt-4o-mini", // 使用最便宜且快速的模型
        messages: [
          {
            role: "system",
            content: "你是一個專業的旅遊規劃師。請用繁體中文，為使用者規劃旅遊行程。格式要求：使用 HTML 標籤 (如 <h3>Day 1</h3>, <ul><li>...</li></ul>) 讓排版漂亮，重點推薦必吃美食與景點。請不要包含 ```html 或 markdown 標記，直接回傳 HTML 內容。"
          },
          {
            role: "user",
            content: `請幫我規劃 ${destination} 的 ${days} 天 ${days - 1} 夜行程。`
          }
        ],
        max_tokens: 1000, // 限制長度以節省成本
        temperature: 0.7
      })
    });

    const data = await response.json();

    // 4. 錯誤處理
    if (data.error) {
      throw new Error(data.error.message);
    }

    // 5. 回傳結果給前端
    const itinerary = data.choices[0].message.content;
    return res.status(200).json({ result: itinerary });

  } catch (error) {
    console.error('OpenAI Error:', error);
    return res.status(500).json({ message: 'Failed to generate itinerary' });
  }
}