import { NextRequest, NextResponse } from 'next/server';
import { generateAIResponse } from '@/lib/server/ai';
import { prisma } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { content, modelId } = await req.json();

    const message = await prisma.message.create({
      data: {
        content,
        aiModel: modelId,
        userId: 'system'
      }
    });

    const aiResponse = await generateAIResponse(content, modelId);
    
    return NextResponse.json({ message: aiResponse });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}