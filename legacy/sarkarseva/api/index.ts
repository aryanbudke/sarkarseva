import express from 'express';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());

// Check if Gemini API key exists
const hasApiKey = !!process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'MY_GEMINI_API_KEY';

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    hasApiKey,
    time: new Date().toISOString()
  });
});

app.post('/api/ask-gemini', async (req, res) => {
  try {
    const { prompt, history = [] } = req.body;

    if (!prompt) {
      res.status(400).json({ error: 'Prompt is required' });
      return;
    }

    if (!hasApiKey) {
      // Return dummy / offline response explanation to ensure graceful failover
      res.json({
        text: `[Offline AI Assistant] High-fidelity local helper activated. I see your Gemini API key is not yet configured in **Settings > Secrets**. However, I can still answer you:
For any civic queries, please use the navigation tabs to explore our step-by-step guides, check documents in our Document Checker, or run the Scheme Finder questionnaire.
If you asked about **Aadhaar**, updates take 3-5 days for ₹50.
If you asked about the **Driving Licence**, the process takes 15-30 days and requires simple forms, age proof, and physical test attendance.`,
        isDummy: true
      });
      return;
    }

    // Initialize the official @google/genai client with proper User-Agent
    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });

    // Prepare system instructions for high compliance
    const systemInstruction = 
      `You are "SarkarSeva Assistant", a highly specialized, friendly and professional AI civic advisor built for the Government of India portal.
Your primary role is to demystify complex government procedures, forms, document checklists, and schemes for everyday citizens.
Keep your tone warm, accessible, neutral and institutional.
Provide structured answers in markdown when requested. Mention relevant details such as required fees, typical timelines, mode (Online/Offline) and authorities based on your knowledge base.
If a certain process or service is not fully understood, tell the citizen precisely where they can look (e.g., local UIDAI hub, nearest RTO agency, official national portals).`;

    // Structure contents with chat history if any
    const contents = history.map((h: { role: 'user' | 'model'; text: string }) => ({
      role: h.role,
      parts: [{ text: h.text }]
    }));

    // Append current user message
    contents.push({
      role: 'user',
      parts: [{ text: prompt }]
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    res.json({
      text: response.text || 'Sorry, I was unable to compile an answer at this moment.',
      isDummy: false
    });

  } catch (error: any) {
    console.error('Gemini API Error:', error);
    res.status(500).json({
      error: error?.message || 'Server encountered an issue communicating with Gemini.',
      isDummy: true,
      text: `[AI Connection Error] I experienced an error trying to invoke the live chatbot API: ${error?.message || 'Check your Gemini key configuration'}. How else can I assist you today?`
    });
  }
});

// Export the Express app as a Vercel Serverless Function
export default app;
