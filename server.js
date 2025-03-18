const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.use(express.json());

app.post('/api/ask', async (req, res) => {
    const { query, context } = req.body;

    if (!query || !context) {
        return res.status(400).json({ error: 'Missing query or context' });
    }

    try {
        const response = await axios.post(
            'https://api.x.ai/v1/chat/completions',
            {
                model: 'grok-2', // Confirmed working model
                messages: [
                    { role: 'system', content: context },
                    { role: 'user', content: query }
                ],
                max_tokens: 500
            },
            {
                headers: {
                    'Authorization': 'Bearer xai-yc0REtABShtYHIGTyO84CPTHDBNs9GMNE6fHcUoGWJVzmrkvMmbFTGyunf1giumrXjWUwHeskyryp38W', // Replace with your key
                    'Content-Type': 'application/json'
                },
                timeout: 30000 // 30-second timeout
            }
        );

        const answer = response.data.choices[0].message.content;
        res.json({ answer });
    } catch (error) {
        console.error('xAI Error:', error.message, error.response?.data);
        res.status(500).json({ error: 'Failed to fetch answer' });
    }
});

app.listen(port, () => console.log(`Server running at http://localhost:${port}`));