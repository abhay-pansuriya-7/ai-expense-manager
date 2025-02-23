
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type AuthMode = "signin" | "signup" | "forgot";

export const AuthForm = () => {
  const [mode, setMode] = useState<AuthMode>("signin");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast({
        title: "Success",
        description: mode === "forgot" 
          ? "Recovery email sent. Please check your inbox."
          : "Authentication successful!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Authentication failed. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>
          {mode === "signin" 
            ? "Sign In" 
            : mode === "signup" 
            ? "Create Account" 
            : "Reset Password"}
        </CardTitle>
        <CardDescription>
          {mode === "signin" 
            ? "Welcome back! Sign in to manage your expenses."
            : mode === "signup"
            ? "Create an account to start tracking expenses."
            : "Enter your email to receive a recovery link."}
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {(mode === "signup") && (
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="John Doe"
                required
                disabled={loading}
              />
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              required
              disabled={loading}
            />
          </div>
          {(mode !== "forgot") && (
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                disabled={loading}
              />
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button type="submit" className="w-full" disabled={loading}>
            {mode === "signin" 
              ? "Sign In" 
              : mode === "signup" 
              ? "Create Account" 
              : "Send Recovery Link"}
          </Button>
          <div className="flex flex-col items-center gap-2 text-sm">
            {mode === "signin" ? (
              <>
                <Button
                  variant="link"
                  onClick={() => setMode("signup")}
                  disabled={loading}
                >
                  Don't have an account? Sign Up
                </Button>
                <Button
                  variant="link"
                  onClick={() => setMode("forgot")}
                  disabled={loading}
                >
                  Forgot password?
                </Button>
              </>
            ) : (
              <Button
                variant="link"
                onClick={() => setMode("signin")}
                disabled={loading}
              >
                Already have an account? Sign In
              </Button>
            )}
          </div>
        </CardFooter>
      </form>
    </Card>
  );
};
