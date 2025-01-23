export const AI_CONFIG = {
    openai: {
      apiKey: process.env.OPENAI_API_KEY!,
      models: ['gpt-4', 'gpt-3.5']
    },
    anthropic: {
      apiKey: process.env.ANTHROPIC_API_KEY!,
      models: ['claude']
    },
    google: {
      apiKey: process.env.GOOGLE_API_KEY!,
      models: ['gemini']
    }
  };