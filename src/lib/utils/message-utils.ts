
import { Message } from "../types";

export const formatMessageContent = (content: string) => {
  if (!content) return "";
  
  // Convert URLs to clickable links
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return content.replace(urlRegex, (url) => `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:text-blue-600">${url}</a>`);
};

export const generateId = () => {
  return Math.random().toString(36).substring(2, 15);
};

export const createMessage = (content: string, role: "user" | "assistant", html = false): Message => {
  return {
    id: generateId(),
    content,
    role,
    timestamp: new Date(),
    html,
  };
};
