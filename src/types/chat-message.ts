export interface ChatMessage {
    id?: string;
    type: 'user' | 'system' | 'assistant';
    content: string;
    createdAt?: Date;
  }
  
  export interface AIModel {
    id: string;
    name: string;
    provider: string;
  }