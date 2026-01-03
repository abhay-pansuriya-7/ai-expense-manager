import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string | null;
      image: string | null;
      theme: string;
      isAdmin: boolean;
      createdAt: Date;
      userAccounts: {
        id: string;
        type: string;
        currency: string;
        isActive: boolean;
        subAccounts: {
          id: string;
          name: string;
          balance: number;
          description: string | null;
          isActive: boolean;
        }[];
      }[];
      categories: {
        id: string;
        name: string;
        type: string;
        color: string | null;
        icon: string | null;
      }[];
      stats: {
        totalTransactions: number;
        totalCategories: number;
        totalAccounts: number;
        totalBalance: number;
      };
    } & DefaultSession["user"];
  }
}