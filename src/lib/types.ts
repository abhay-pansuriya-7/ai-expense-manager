
export interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
  type?: "text" | "expense" | "report";
  loading?: boolean;
  html?: boolean;
}

export interface User {
  id: string;
  email: string;
  name: string;
}
