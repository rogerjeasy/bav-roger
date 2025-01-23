import { NextRequest, NextResponse } from 'next/server';
import { generateAIResponse } from '@/lib/server/ai';
import { prisma } from "@/lib/db";

export async function POST(req: NextRequest) {
 try {
   const body = await req.json();
   const { content, modelId } = body;

   if (!content || !modelId) {
     return NextResponse.json({ error: "Missing content or modelId" }, { status: 400 });
   }

   const chatMessage = await prisma.chatMessage.create({
     data: {
       content,
       model: modelId,
       role: 'user',
       type: 'user'
     }
   });

   const aiResponse = await generateAIResponse(content, modelId);
   
   if (!aiResponse) {
     throw new Error('No response received from AI service');
   }

   await prisma.chatMessage.create({
     data: {
       content: aiResponse,
       model: modelId,
       role: 'assistant', 
       type: 'assistant'
     }
   });

   return new NextResponse(JSON.stringify({ message: aiResponse }), {
     status: 200,
     headers: {
       'Content-Type': 'application/json',
     },
   });

 } catch (error) {
   const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
   return new NextResponse(JSON.stringify({ error: errorMessage }), {
     status: 500,
     headers: {
       'Content-Type': 'application/json',
     },
   });
 }
}