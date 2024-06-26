"use client";
import { Comrade } from "@prisma/client";
import { ElementRef, useEffect, useRef, useState } from "react";

import ChatMessage, { ChatMessageProps } from "@/components/chat-message";

interface ChatMessagesProps {
  messages: ChatMessageProps[];
  isLoading: boolean;
  comrade: Comrade;
}
const ChatMessages = ({
  messages = [],
  isLoading,
  comrade,
}: ChatMessagesProps) => {
  const scrollRef = useRef<ElementRef<"div">>(null);
  const [fakeLoading, setFakeLoading] = useState(
    messages.length === 0 ? true : false
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFakeLoading(false);
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, []);
  useEffect(() => {
    scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);
  return (
    <div className="flex-1 overflow-y-auto pr-4">
      <ChatMessage
        isLoading={fakeLoading}
        src={comrade.src}
        role="system"
        content={`Hello, I am ${comrade.name}, ${comrade.description}`}
      />
      {messages.map((message) => (
        <ChatMessage
          key={message.content}
          role={message.role}
          content={message.content}
          src={message.content}
        />
      ))}
      {isLoading && <ChatMessage src={comrade.src} role="system" isLoading />}
      <div ref={scrollRef} />
    </div>
  );
};

export default ChatMessages;
