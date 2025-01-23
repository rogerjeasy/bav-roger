import OpenAI from 'openai';
import { Anthropic } from '@anthropic-ai/sdk';
import { GoogleGenerativeAI } from '@google/generative-ai';

if (!process.env.NEXT_PUBLIC_OPENAI_API_KEY || !process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY || !process.env.NEXT_PUBLIC_GOOGLE_API_KEY) {
    throw new Error("Missing required API keys in environment variables.");
  }
  

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY!
});

const anthropic = new Anthropic({
  apiKey: process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY!
});

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GOOGLE_API_KEY!);

export async function generateAIResponse(content: string, modelId: string) {
    console.log('AI Model:', modelId);
  try {
    switch (modelId) {
      case 'gpt-4':
      case 'gpt-3.5':
        return handleOpenAIResponse(content, modelId);
      case 'claude':
        return handleClaudeResponse(content);
      case 'gemini':
        return handleGeminiResponse(content);
      default:
        throw new Error('Invalid model selected');
    }
  } catch (error) {
    console.error('AI Response Error:', error);
    throw error;
  }
}

async function handleOpenAIResponse(content: string, modelId: string) {
    const model = modelId === 'gpt-4' ? 'gpt-4-turbo-preview' : 'gpt-3.5-turbo';
    const completion = await openai.chat.completions.create({
      model,
      messages: [{ role: 'user', content }],
      temperature: 0.7,
    });
    return completion.choices[0].message.content || '';
  }

async function handleClaudeResponse(content: string) {
  const message = await anthropic.messages.create({
    model: 'claude-3-opus-20240229',
    max_tokens: 1024,
    messages: [{ role: 'user', content }],
    system: "You are an AI assistant for Roger Jeasy. Answer questions based on his profile and experience."
  });
  
  return message.content[0].type === 'text' ? message.content[0].text : '';
}

async function handleGeminiResponse(content: string) {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.0-pro' });
  const result = await model.generateContent(content);
  const response = await result.response;
  
  return response.text();
}