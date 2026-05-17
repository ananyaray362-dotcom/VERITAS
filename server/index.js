const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const axios = require('axios');
const cheerio = require('cheerio');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const GROQ_API_KEY = process.env.GROQ_API_KEY;

const scrapeContent = async (url) => {
  try {
    const { data } = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    const $ = cheerio.load(data);
    
    // Remove script and style elements
    $('script, style').remove();
    
    const title = $('title').text();
    const content = $('p').text().substring(0, 5000); // Limit content for AI
    
    return { title, content };
  } catch (error) {
    console.error('Scraping error:', error);
    return null;
  }
};

app.post('/api/analyze', async (req, res) => {
  const { input } = req.body;

  if (!input) {
    return res.status(400).json({ error: 'Input is required' });
  }

  let textToAnalyze = input;
  let isUrl = false;

  if (input.startsWith('http')) {
    isUrl = true;
    const scraped = await scrapeContent(input);
    if (scraped) {
      textToAnalyze = `Title: ${scraped.title}\n\nContent: ${scraped.content}`;
    } else {
      return res.status(400).json({ error: 'Failed to scrape content from URL' });
    }
  }

  try {
    if (!GROQ_API_KEY) {
      throw new Error("GROQ_API_KEY is not defined in backend .env");
    }

    const response = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: 'llama3-70b-8192',
        messages: [
          {
            role: 'system',
            content: 'You are an expert fact-checker and media literacy specialist. You analyze content for fake news patterns, emotional manipulation, bias, and credibility. You must return response strictly in JSON format.'
          },
          {
            role: 'user',
            content: `Analyze the following content:
            
            "${textToAnalyze}"
            
            Return the analysis in STRICT JSON format with the following keys:
            - trustScore (number 0-100)
            - realProb (number 0-100)
            - fakeProb (number 0-100)
            - reasoning (string, detailed explanation)
            - emotionalAnalysis (string, description of emotional manipulation/sentiment)
            - credibilityMarkers (string, description of source credibility and factual markers)
            - sourceVerification (string, verification of the source or general advice if source unknown)
            - sentimentScores (object with keys: fear, anger, joy, sadness, surprise, each a number 0-100)
            - manipulationType (string: 'Fear-mongering', 'Outrage-bait', 'Sensationalism', 'False Urgency', or 'Neutral')
            - manipulationDescription (string, explanation of how the content targets these specific emotions)
            - nlpClassifierScore (number 0-100, representing BERT/DeBERTa semantic text classification real probability score)
            - panicScore (number 0-100, where 100 represents severe alarmist panic/fear triggers and 0 represents completely calm/safe content)
            - panicVerdict (string, e.g. 'Calm / Fully Verified Official Data', 'High Risk / Active Scam', 'Moderate Caution')
            - panicAdvice (string, comforting explanation stating why the user does not need to panic, referencing verified official resource behaviors)
            - factCheckMatches (array of objects, each containing: source (string, e.g., 'PolitiFact', 'Snopes'), verdict (string, e.g. 'False', 'Mostly True'), details (string, summary of their check), and url (string, clickable official URL if verified, or empty string))
            - weightedScoring (object with keys: nlpScore (number 0-100), groqScore (number 0-100), apiScore (number 0-100), nlpWeight (always 30), groqWeight (always 40), apiWeight (always 30). Ensure (nlpScore * 0.3) + (groqScore * 0.4) + (apiScore * 0.3) equals the final trustScore)
            
            Ensure realProb + fakeProb = 100.
            The response must be valid JSON only.`
          }
        ],
        response_format: { type: 'json_object' }
      },
      {
        headers: {
          'Authorization': `Bearer ${GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const jsonText = response.data.choices[0].message.content;
    const analysis = JSON.parse(jsonText);
    res.json(analysis);
  } catch (error) {
    console.error('AI Analysis Error:', error);
    res.status(500).json({ error: 'Analysis failed', details: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
