"use client"

import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Moon, Sun, User, Settings, LogOut, Menu, X } from "lucide-react"
import { useThemeStore } from "@/hooks/use-theme-store"

export function Navbar() {
  const { data: session } = useSession()
  const { theme, setTheme } = useThemeStore()

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">E</span>
            </div>
            <span className="font-bold text-xl">ExpenseTracker</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {session && (<></>)}</div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="h-9 w-9"
            >
              {
                theme === "dark" ? (
                  <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                ) : (
                  <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                )
              }
            </Button>

            {session ? (
              <>
                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={session.user?.image || ""} alt={session.user?.name || ""} />
                        <AvatarFallback>{session.user?.name?.charAt(0) || "U"}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <div className="flex items-center justify-start gap-2 p-2">
                      <div className="flex flex-col space-y-1 leading-none">
                        {session.user?.name && <p className="font-medium">{session.user.name}</p>}
                        {session.user?.email && (
                          <p className="w-[200px] truncate text-sm text-muted-foreground">{session.user.email}</p>
                        )}
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="flex items-center">
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/settings" className="flex items-center">
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-red-600 focus:text-red-600"
                      onClick={() => signOut({ callbackUrl: "/" })}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <div className="hidden md:flex items-center space-x-2">
                  <Button variant="ghost" asChild>
                    <Link href="/auth/login">Sign In</Link>
                  </Button>
                  <Button asChild>
                    <Link href="/auth/signup">Sign Up</Link>
                  </Button>
                </div>
                <div className="md:hidden">
                  <Button variant="ghost" size="icon" asChild>
                    <Link href="/auth/login">
                      <User className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
