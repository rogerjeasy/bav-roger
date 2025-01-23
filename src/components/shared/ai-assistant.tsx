"use client";

import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Maximize2, Minimize2, User, Cpu, Bot } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { AI_MODELS } from "@/lib/constants";
import { scrollToBottom } from "@/lib/utils/index";
import type { ChatMessage } from "@/types/chat-message";

interface AIMessage extends ChatMessage {
  id: string;
  createdAt: Date;
}

const AIChat = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState<string>("");
  const [selectedModel, setSelectedModel] = useState<string>("gpt-4");
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const scrollAreaRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  if (isOpen || messages.length > 0) {
    const timer = setTimeout(() => {
      const viewport = scrollAreaRef.current?.querySelector('[data-radix-scroll-area-viewport]');
      if (viewport) {
        viewport.scrollTop = viewport.scrollHeight;
      }
    }, 100);
    return () => clearTimeout(timer);
  }
}, [isOpen, messages]);

  const handleSend = async () => {
    if (!inputMessage.trim()) return;
    
    const newMessage: ChatMessage = {
      type: "user",
      content: inputMessage,
      createdAt: new Date(),
    };
    
    setMessages((prev) => [...prev, newMessage]);
    setInputMessage("");
    setIsLoading(true);
   
    try {
      const response = await fetch("/api/chat", {
        method: "POST", 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: inputMessage,
          modelId: selectedModel,
        }),
      });
   
      if (!response.ok) throw new Error("Failed to send message");
      
      const { message } = await response.json();
      
      const aiMessage: ChatMessage = {
        type: "assistant",
        content: message,
        createdAt: new Date(),
      };
   
      setMessages((prev) => [...prev, aiMessage]);
   
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsLoading(false);
    }
   };

  const handleModelChange = (value: string) => {
    setSelectedModel(value);
    const systemMessage: ChatMessage = {
      type: "system",
      content: `Switched to ${AI_MODELS.find((m) => m.id === value)?.name}`,
      createdAt: new Date(),
    };
    setMessages((prev) => [...prev, systemMessage]);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) {
    return (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 rounded-full p-4 bg-emerald-500 hover:bg-emerald-600"
        >
          <div className="relative">
            <MessageCircle className="h-6 w-6" />
            <Bot className="h-4 w-4 absolute -top-2 -right-2 bg-white rounded-full p-0.5 text-emerald-500" />
          </div>
        </Button>
      );
  }

  const renderMessageIcon = (type: string) => {
    switch(type) {
      case "user":
        return <div className="bg-emerald-100 p-2 rounded-full">
          <User className="h-4 w-4 text-emerald-600" />
        </div>;
      case "assistant":
        return <div className="bg-indigo-100 p-2 rounded-full">
          <Bot className="h-4 w-4 text-indigo-600" />
        </div>;
      default:
        return <div className="bg-gray-100 p-2 rounded-full">
          <Cpu className="h-4 w-4 text-gray-600" />
        </div>;
    }
   };

  return (
    <Card
      className={`fixed bottom-4 right-4 bg-background border shadow-lg transition-all duration-300 ${
        isMinimized ? "w-72 h-14" : "w-80 sm:w-96 h-[600px]"
      }`}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center space-x-2">
            <MessageCircle className="h-5 w-5" />
            <h3 className="font-semibold">Chat with Roger</h3>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMinimized(!isMinimized)}
            >
              {isMinimized ? (
                <Maximize2 className="h-4 w-4" />
              ) : (
                <Minimize2 className="h-4 w-4" />
              )}
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {!isMinimized && (
          <>
            <div className="p-4 border-b">
              <Select value={selectedModel} onValueChange={handleModelChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select AI Model" />
                </SelectTrigger>
                <SelectContent>
                  {AI_MODELS.map((model) => (
                    <SelectItem key={model.id} value={model.id}>
                      {model.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex-1 overflow-hidden">
                <ScrollArea ref={scrollAreaRef} className="h-[400px]">
                <div className="flex flex-col space-y-4 p-4">
                  {messages.map((message, index) => (
                    <div
                    key={index}
                    className={`flex flex-col ${
                      message.type === "user" ? "items-end" : "items-start"
                    } mb-4`}
                   >
                    <div className={`flex items-start ${
                      message.type === "user" ? "flex-row-reverse" : "flex-row"
                    } space-x-2`}>
                      {renderMessageIcon(message.type)}
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.type === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        }`}
                      >
                        <p>{message.content}</p>
                        <span className="text-xs text-muted-foreground">
                          {(message.createdAt ?? new Date()).toLocaleTimeString()}
                        </span>
                      </div>
                    </div>
                   </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="flex items-center space-x-2">
                        <Cpu className="h-4 w-4 text-secondary" />
                        <div className="max-w-[80%] rounded-lg p-3 bg-muted">
                          <p className="animate-pulse">Thinking...</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </div>

            <div className="p-4 border-t mt-auto">
              <div className="flex space-x-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1"
                />
                <Button onClick={handleSend}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </Card>
  );
};

export default AIChat;
