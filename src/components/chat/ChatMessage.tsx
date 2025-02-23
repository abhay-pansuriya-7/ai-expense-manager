
import { Message } from "@/lib/types";
import { cn } from "@/lib/utils";
import { formatMessageContent } from "@/lib/utils/message-utils";
import { Loader2 } from "lucide-react";

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  const isUser = message.role === "user";

  return (
    <div
      className={cn(
        "flex w-full",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "flex max-w-[80%] rounded-2xl px-4 py-2 text-sm",
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-muted",
          message.loading && "animate-pulse"
        )}
      >
        {message.loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : message.html ? (
          <div
            dangerouslySetInnerHTML={{
              __html: formatMessageContent(message.content),
            }}
            className="prose prose-sm dark:prose-invert max-w-none"
          />
        ) : (
          <p className="whitespace-pre-wrap">{message.content}</p>
        )}
      </div>
    </div>
  );
};
