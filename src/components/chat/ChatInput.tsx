
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Smile, Send, Paperclip } from "lucide-react";
import { useState } from "react";

interface ChatInputProps {
  onSendMessage: (content: string) => void;
  disabled?: boolean;
}

export const ChatInput = ({ onSendMessage, disabled }: ChatInputProps) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    onSendMessage(message);
    setMessage("");
  };

  return (
    <Card className="border-t rounded-none border-x-0 border-b-0">
      <CardContent className="p-4">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Button
            size="icon"
            variant="ghost"
            type="button"
            className="shrink-0"
            disabled={disabled}
          >
            <Smile className="h-5 w-5" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            type="button"
            className="shrink-0"
            disabled={disabled}
          >
            <Paperclip className="h-5 w-5" />
          </Button>
          <Input
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="rounded-full"
            disabled={disabled}
          />
          <Button
            size="icon"
            type="submit"
            className="shrink-0"
            disabled={disabled || !message.trim()}
          >
            <Send className="h-5 w-5" />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
