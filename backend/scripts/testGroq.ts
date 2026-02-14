import Groq from 'groq-sdk';
import dotenv from 'dotenv';

dotenv.config();

const testGroq = async () => {
  console.log('Testing Groq API...');
  console.log('API Key present:', !!process.env.GROQ_API_KEY);

  const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
  });

  try {
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: 'Hello'
        }
      ],
      model: 'llama-3.3-70b-versatile',
    });

    console.log('Success:', completion.choices[0]?.message?.content);
  } catch (error: any) {
    console.error('Groq API Error Details:');
    if (error.response) {
        console.error('Status:', error.response.status);
        console.error('Data:', JSON.stringify(error.response.data, null, 2));
    } else {
        console.error(error.message || error);
    }
  }
};

testGroq();
