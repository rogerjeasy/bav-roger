export const AI_CONFIG = {
    openai: {
      apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY!,
      models: ['gpt-4', 'gpt-3.5']
    },
    anthropic: {
      apiKey: process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY!,
      models: ['claude']
    },
    google: {
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY!,
      models: ['gemini']
    }
  };