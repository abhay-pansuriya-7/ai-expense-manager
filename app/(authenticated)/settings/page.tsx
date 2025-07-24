"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useThemeStore } from "@/hooks/use-theme-store"
import { ThemeKey, themes } from "@/lib/utils"
import { toast } from "sonner"
import { motion } from "framer-motion"
import { Check } from "lucide-react"


export default function SettingsPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const { colorTheme, setColorTheme } = useThemeStore()
  const [selectedTheme, setSelectedTheme] = useState(colorTheme)


  if (!session) {
    router.push("/auth/login")
    return null
  }

  const handleThemeChange = (theme: ThemeKey) => {
    setSelectedTheme(theme)
    setColorTheme(theme)
    toast.success(`Theme changed to ${theme}`)
    // Here you could save the theme preference to database for the user
  }

  return (
    <main className="flex-1 container mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="min-h-screen">
          <div className="container mx-auto px-4 pb-20 pt-4">
            <div className="mb-8">
              <h1 className="text-3xl font-bold">Settings</h1>
              <p className="text-muted-foreground mt-1">Customize your ExpenseTracker experience</p>
            </div>

            {/* Theme Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>
                  Choose a color theme that suits your style. This will change the accent color throughout the app.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="text-base font-medium">Color Theme</Label>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-3">
                    {themes.map((theme) => (
                      <motion.div key={theme.value} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                          variant="outline"
                          className={`h-20 w-full flex flex-col items-center justify-center gap-2 relative ${selectedTheme === theme.value ? "ring-2 ring-primary" : ""
                            }`}
                          onClick={() => handleThemeChange(theme.value as ThemeKey)}
                        >
                          <div className={`w-6 h-6 rounded-full ${theme.color}`} />
                          <span className="text-xs font-medium">{theme.name}</span>
                          {selectedTheme === theme.value && (
                            <Check className="absolute top-2 right-2 h-4 w-4 text-primary" />
                          )}
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Account Settings */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Account</CardTitle>
                <CardDescription>Manage your account settings and preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">Profile</Label>
                    <p className="text-sm text-muted-foreground">Update your profile information</p>
                  </div>
                  <Button variant="outline" asChild>
                    <a href="/profile">Edit Profile</a>
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">Data Export</Label>
                    <p className="text-sm text-muted-foreground">Download your expense data</p>
                  </div>
                  <Button variant="outline">Export Data</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
    </main>
  )
}
