
import { useEffect, useRef, useState } from "react";
import { Message } from "@/lib/types";
import { createMessage } from "@/lib/utils/message-utils";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";

export const ChatContainer = () => {
  const [messages, setMessages] = useState<Message[]>([
    createMessage(
      "Hi! I'm your expense management assistant. How can I help you today?",
      "assistant"
    ),
  ]);
  const [loading, setLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    const userMessage = createMessage(content, "user");
    setMessages((prev) => [...prev, userMessage]);

    setLoading(true);
    const loadingMessage = createMessage("", "assistant", false);
    loadingMessage.loading = true;
    setMessages((prev) => [...prev, loadingMessage]);

    try {
      // Simulated API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      const response = {
        content: `Here's your expense report in a nice format:<br/><ul class="list-disc pl-5 mt-2"><li>Total Expenses: $1,234</li><li>Categories:<ul class="list-disc pl-5 mt-1"><li>Food: $500</li><li>Transport: $200</li><li>Entertainment: $534</li></ul></li></ul>`,
        html: true,
      };

      setMessages((prev) => [
        ...prev.slice(0, -1),
        createMessage(response.content, "assistant", response.html),
      ]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get a response. Please try again.",
        variant: "destructive",
      });
      setMessages((prev) => prev.slice(0, -1));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      <ScrollArea
        ref={scrollAreaRef}
        className="flex-1 p-4 space-y-4"
      >
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
      </ScrollArea>
      <ChatInput onSendMessage={handleSendMessage} disabled={loading} />
    </div>
  );
};
