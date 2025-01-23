import { z } from 'zod';

export const chatMessageSchema = z.object({
    content: z.string().min(1, 'Message cannot be empty'),
    modelId: z.string(),
    type: z.enum(['user', 'system', 'assistant']).default('user'),
  });

export type ChatMessageInput = z.infer<typeof chatMessageSchema>;