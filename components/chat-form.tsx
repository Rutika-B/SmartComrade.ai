"use client";

import { ChangeEvent } from "react";
import { ChatRequestOptions } from "ai";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SendHorizonal } from "lucide-react";

interface ChatFormProps {
  input: string;
  handleInputChange: (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => void;
  isLoading: boolean;
  onSubmit: (
    e: ChangeEvent<HTMLFormElement>,
    ChatRequestOptions?: ChatRequestOptions | undefined
  ) => void;
}
const ChatForm = ({
  input,
  handleInputChange,
  isLoading,
  onSubmit,
}: ChatFormProps) => {
  return (
    <form
      className="border-t flex items-center py-4 border-primary/10 gap-x-2"
      onSubmit={onSubmit}
    >
      <Input
        disabled={isLoading}
        value={input}
        onChange={handleInputChange}
        placeholder="Type a message"
        className="rounded-lg bg-primary/10"
      />
      <Button variant="ghost" disabled={isLoading}>
        <SendHorizonal className="h-6 w-6" />
      </Button>
    </form>
  );
};

export default ChatForm;
