import type { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "@/lib/prisma"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: { 
    session: async ({ session, token }) => {  
      if (session?.user) {
        session.user.id = token.sub!
      }
      return session  
    },
/**
 * Adds the user's ID to the JWT token if a user is present.
 *
 * @param {Object} params - The parameter object.
 * @param {Object} params.user - The user object, if available.
 * @param {Object} params.token - The JWT token to be returned.
 * @returns {Object} The updated JWT token with the user ID added if the user is present.
 */

    jwt: async ({ user, token }) => {
      if (user) {
        token.uid = user.id
      }
      return token
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/login",
  },
}
