"use client";

import { Comrade, Message } from "@prisma/client";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import BotAvatar from "./bot-avatar";

import {
  ChevronLeft,
  Edit,
  Ghost,
  MessageSquare,
  MoreVertical,
  Trash,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";

interface ChatHeaderProps {
  comrade: Comrade & {
    messages: Message[];
    _count: {
      messages: number;
    };
  };
}
export const ChatHeader = ({ comrade }: ChatHeaderProps) => {
  const router = useRouter();
  const { user } = useUser();
  const { toast } = useToast();

  const onDelete = async () => {
    try {
      await axios.delete(`/api/comrade/${comrade.id}`);
      toast({
        description: "success",
      });
      router.refresh();
      router.push(`/`);
    } catch (error) {
      toast({
        variant: "destructive",
        description: "something went wrong",
      });
    }
  };
  return (
    <div className="flex w-full items-center justify-between border-b border-primary/10 pb-4">
      <div className="flex gap-x-2 items-center">
        <Button size="icon" variant="ghost" onClick={() => router.back()}>
          <ChevronLeft className="h-8 w-8" />
        </Button>
        <BotAvatar src={comrade.src} />
        <div className="flex flex-col gap-y-1">
          <div className="flex  items-center gap-x-2">
            <p className="font-bold">{comrade.name}</p>
            <div className="flex items-center text-sm text-muted-foreground">
              <MessageSquare className="w-4 h-4 mr-1" />
              {comrade._count.messages}
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Created by {comrade.username}
          </p>
        </div>
      </div>
      {user?.id === comrade.userId && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon">
              <MoreVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => router.push(`/comrade/${comrade.id}`)}
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onDelete}>
              <Trash className="w-4 h-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};
