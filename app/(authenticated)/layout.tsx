import type React from "react"
import type { Metadata } from "next"
import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import { Navbar } from "@/components/navbar"
import { BottomNavigation } from "@/components/bottom-navigation"

export const metadata: Metadata = {
    title: "ExpenseTracker - Smart Expense Management",
    description: "Track, manage, and analyze your expenses with ease",
}

export default async function RootLayout({ children, }: { children: React.ReactNode }) {
    const session = await getServerSession(authOptions)
    if (!session) { redirect("/auth/login") }
    return (<div>
        <div className="min-h-screen flex flex-col">
            <Navbar />
            {children}
            <BottomNavigation />
        </div>
    </div>)
}
