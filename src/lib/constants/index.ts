import { AIModel } from '@/types/chat-message';

export const AI_MODELS: AIModel[] = [
  { id: 'gpt-4', name: 'OpenAI GPT-4', provider: 'openai' },
  { id: 'gpt-3.5', name: 'OpenAI GPT-3.5', provider: 'openai' },
  { id: 'claude', name: 'Anthropic Claude', provider: 'anthropic' },
  { id: 'gemini', name: 'Google Gemini', provider: 'google' }
];