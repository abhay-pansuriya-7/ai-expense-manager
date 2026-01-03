import { useSession } from "next-auth/react";
import type { UserProfile } from "@/graphql/types/User";

export const useUser = () => {
  const { data: session, status } = useSession();
  
  return {
    user: session?.user as UserProfile | undefined,
    isLoading: status === "loading",
    isAuthenticated: status === "authenticated",
    isUnauthenticated: status === "unauthenticated",
  };
};