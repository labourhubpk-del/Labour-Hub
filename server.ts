import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Initialize Gemini Client
const apiKey = process.env.GEMINI_API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

// System instruction for LabourHub AI Advisor
const SYSTEM_INSTRUCTION = `You are "LabourHub AI Ustad", Pakistan's premier intelligent trade advisor, rate estimator, and hardware market guide for LabourHub.pk.
You are fluent in English, Urdu (اردو), and natural Pakistani Roman Urdu.

Your roles:
1. **Accurate PKR Labor & Material Estimator**: Give realistic labor rates for electricians, plumbers, carpenters, masons, painters, AC mechanics in Lahore, Karachi, Islamabad, Rawalpindi, Faisalabad, Multan, etc.
2. **Pakistani Hardware & Trade Sourcing Guide**: Recommend famous local wholesale markets, e.g.:
   - Lahore: Hall Road (Electronics), Bilal Gunj (Auto/Machinery), Badami Bagh, Montgomery Road, Circular Road (Pipes/Pumps).
   - Karachi: Saddar / Empress Market, Shershah (Tools/Hardware), Timber Market (Woodwork), Water Pump Federal B Area.
   - Rawalpindi/Islamabad: College Road, Raja Bazaar, G-9 Markaz, I-9 Industrial Area.
3. **Task & Bid Polish**: Help homeowners write clear task posts and help Karigars compose polite, professional bids with tool guarantees.
4. Always provide grounded, practical, safety-conscious advice. When discussing locations or stores, highlight verifiable local landmarks. Keep responses structured, concise, and helpful.`;

// 1. Multi-turn Chat Endpoint with Gemini (supporting gemini-3.8-flash, gemini-3.1-flash-lite, gemini-4-argon)
app.post('/api/chat', async (req, res) => {
  try {
    const { messages, modelChoice = 'gemini-3.8-flash', userCity = 'Lahore' } = req.body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Messages array is required.' });
    }

    // Map model choices based on guidelines
    let selectedModel = 'gemini-3.8-flash';
    if (modelChoice === 'fast') {
      selectedModel = 'gemini-3.1-flash-lite';
    } else if (modelChoice === 'complex') {
      selectedModel = 'gemini-4-argon';
    } else if (modelChoice) {
      selectedModel = modelChoice;
    }

    // Convert messages to Gemini SDK contents format
    const contents = messages.map((m: { role: string; content: string }) => ({
      role: m.role === 'assistant' || m.role === 'model' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }));

    const response = await ai.models.generateContent({
      model: selectedModel,
      contents,
      config: {
        systemInstruction: `${SYSTEM_INSTRUCTION}\nActive User City Context: ${userCity}.`,
      },
    });

    const reply = response.text || 'Maazrat, jawab tayar nahi ho saka. Baraye meherbani dobara try karein.';
    res.json({ reply, model: selectedModel });
  } catch (error: any) {
    console.error('Gemini Chat API Error:', error);
    res.status(500).json({
      error: error.message || 'Gemini API call failed',
      reply: 'Maazrat, server se rabta nahi ho saka. Baraye meherbani internet connection aur API key check karain.',
    });
  }
});

// 2. Maps Grounding Endpoint using gemini-3.8-flash with googleMaps tool
app.post('/api/maps-grounding', async (req, res) => {
  try {
    const { query, city = 'Lahore' } = req.body;
    if (!query) {
      return res.status(400).json({ error: 'Search query is required' });
    }

    const prompt = `Find real local hardware stores, electrical wholesale markets, sanitary spare parts dealers, or Karigar hubs in ${city}, Pakistan for: "${query}".
Provide exact market names, popular roads, areas, and what items they specialize in. Be specific to ${city}.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        tools: [{ googleMaps: {} }],
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });

    const reply = response.text || 'No market locations found.';
    
    // Extract grounding chunks/metadata if available
    const groundingMetadata = response.candidates?.[0]?.groundingMetadata || null;

    res.json({
      reply,
      city,
      groundingMetadata,
    });
  } catch (error: any) {
    console.error('Gemini Maps Grounding Error:', error);
    res.status(500).json({
      error: error.message || 'Maps Grounding failed',
      reply: `Baraye meherbani ${req.body.city || 'local area'} ke maroof wholesale markets check karain.`,
    });
  }
});

// Setup Vite middlewares in development
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`LabourHub Server running at http://0.0.0.0:${port}`);
  });
}

startServer();
