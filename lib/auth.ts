import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import { CreateUserDefaultAccount } from "@/graphql/services/UserAccounts";
import { getMe } from "@/graphql/services/User";
import z from "zod";
import bcrypt from "bcryptjs";


const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials) return null;
        try {
          const { email, password } = loginSchema.parse(credentials)

          const user = await prisma.user.findUnique({ where: { email } })

          if (!user || !user.hashedPassword) {
            return null
          }

          const isPasswordValid = await bcrypt.compare(password, user.hashedPassword)

          if (!isPasswordValid) { return null }

          return { id: user.id, email: user.email, name: user.name, }
        } catch (error) {
          return null
        }
      }
    })
  ],
  callbacks: {
    session: async ({ session, token }: { session: any, token: any }) => {
      if (session?.user && token.sub) {
        // Get enriched user data from database
        const userProfile = await getMe(token.sub);
        
        if (userProfile) {
          session.user = {
            id: userProfile.id,
            email: userProfile.email,
            name: userProfile.name,
            image: userProfile.image,
            theme: userProfile.theme,
            colorTheme: userProfile.colorTheme,
            isAdmin: userProfile.isAdmin,
            createdAt: userProfile.createdAt,
            userAccounts: userProfile.userAccounts,
            categories: userProfile.categories,
            stats: userProfile.stats,
          };
        } else {
          // Fallback to basic user info if getMe fails
          session.user.id = token.sub;
        }
      }
      return session
    },
    jwt: async ({ user, token }) => {
      if (user) {
        token.uid = user.id
      }
      return token
    },
  },
  events: {
    createUser: async ({ user }) => {
      // This runs when a new user is created via OAuth (like Google)
      try {
        await CreateUserDefaultAccount(user.id, "PERSONAL");
        console.log(`Default account created for user: ${user.id}`);
      } catch (error) {
        console.error(`Failed to create default account for user ${user.id}:`, error);
      }
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/login",
  },
}
