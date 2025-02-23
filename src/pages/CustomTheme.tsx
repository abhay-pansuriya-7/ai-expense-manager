
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTheme } from "next-themes";
import { Paintbrush } from "lucide-react";

const themes = [
  { name: "Green", primary: "#22c55e" },
  { name: "Blue", primary: "#3b82f6" },
  { name: "Purple", primary: "#8b5cf6" },
  { name: "Pink", primary: "#ec4899" },
  { name: "Orange", primary: "#f97316" },
];

const CustomTheme = () => {
  const { setTheme } = useTheme();

  const applyTheme = (color: string) => {
    document.documentElement.style.setProperty('--primary', color);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto pt-14 p-4">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Paintbrush className="h-5 w-5" />
              Customize Theme
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {themes.map((theme) => (
                  <Button
                    key={theme.name}
                    variant="outline"
                    className="h-20 flex flex-col gap-2"
                    onClick={() => applyTheme(theme.primary)}
                    style={{ '--theme-color': theme.primary } as React.CSSProperties}
                  >
                    <div
                      className="w-6 h-6 rounded-full"
                      style={{ backgroundColor: theme.primary }}
                    />
                    <span>{theme.name}</span>
                  </Button>
                ))}
              </div>
              <div className="pt-4 border-t">
                <h3 className="font-medium mb-2">Mode</h3>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" onClick={() => setTheme("light")}>
                    Light Mode
                  </Button>
                  <Button variant="outline" onClick={() => setTheme("dark")}>
                    Dark Mode
                  </Button>
                  <Button variant="outline" onClick={() => setTheme("system")}>
                    System
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default CustomTheme;
