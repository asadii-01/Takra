import Groq from 'groq-sdk';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
const pdf = require('pdf-parse');

dotenv.config();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

let knowledgeBase = '';

// Load Knowledge Base on startup
const loadKnowledgeBase = async () => {
    try {
        const filePath = path.join(__dirname, '../../resources/rules.pdf');
        if (fs.existsSync(filePath)) {
            const dataBuffer = fs.readFileSync(filePath);
            const data = await pdf(dataBuffer);
            knowledgeBase = data.text;
            console.log('Knowledge Base loaded successfully');
        } else {
            console.warn('Knowledge Base file (rules.pdf) not found in resources/, skipping.');
        }
    } catch (error) {
        console.error('Error loading Knowledge Base:', error);
    }
};

loadKnowledgeBase();

export const getChatResponse = async (message: string) => {
  try {
    const systemPrompt = `You are Takra AI, a helpful assistant for the Takra Youth Festival platform. 
    Use the following CONTEXT to answer the user's question. 
    If the answer is found in the context, be specific. 
    If the answer is NOT in the context, use your general knowledge but mention that this isn't in the official rules.
    
    CONTEXT:
    ${knowledgeBase.substring(0, 20000)} // Limit context size if necessary
    
    User Question: ${message}`;

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: systemPrompt
        },
        {
          role: 'user',
          content: message
        }
      ],
      model: 'llama-3.3-70b-versatile',
    });

    return completion.choices[0]?.message?.content || "I'm sorry, I couldn't generate a response.";
  } catch (error) {
    console.error('Groq API Error:', error);
    return "I'm having trouble connecting to my brain right now. Please try again later.";
  }
};
