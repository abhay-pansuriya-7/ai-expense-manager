
import { Link } from "react-router-dom";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { MessageCircle, Home, UserCircle2, Menu, X, Paintbrush } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="flex items-center space-x-2 mr-4">
          <MessageCircle className="h-6 w-6 text-primary" />
          <span className="font-bold">ExpenseAI</span>
        </div>
        
        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden ml-auto"
          onClick={toggleMenu}
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>

        {/* Desktop navigation */}
        <nav className="hidden md:flex flex-1 items-center space-x-2">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/" className="flex items-center space-x-2">
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/chat" className="flex items-center space-x-2">
              <MessageCircle className="h-4 w-4" />
              <span>Chat</span>
            </Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/custom-theme" className="flex items-center space-x-2">
              <Paintbrush className="h-4 w-4" />
              <span>Theme</span>
            </Link>
          </Button>
        </nav>
        
        <div className="hidden md:flex items-center space-x-4">
          <ThemeToggle />
          <Button variant="ghost" size="sm" asChild>
            <Link to="/auth" className="flex items-center space-x-2">
              <UserCircle2 className="h-4 w-4" />
              <span>Sign In</span>
            </Link>
          </Button>
        </div>

        {/* Mobile navigation */}
        <div
          className={cn(
            "fixed inset-x-0 top-[3.5rem] p-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b md:hidden",
            "transition-all duration-300 ease-in-out",
            isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
          )}
        >
          <nav className="flex flex-col space-y-4">
            <Button variant="ghost" size="sm" asChild onClick={() => setIsOpen(false)}>
              <Link to="/" className="flex items-center space-x-2">
                <Home className="h-4 w-4" />
                <span>Home</span>
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild onClick={() => setIsOpen(false)}>
              <Link to="/chat" className="flex items-center space-x-2">
                <MessageCircle className="h-4 w-4" />
                <span>Chat</span>
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild onClick={() => setIsOpen(false)}>
              <Link to="/custom-theme" className="flex items-center space-x-2">
                <Paintbrush className="h-4 w-4" />
                <span>Theme</span>
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild onClick={() => setIsOpen(false)}>
              <Link to="/auth" className="flex items-center space-x-2">
                <UserCircle2 className="h-4 w-4" />
                <span>Sign In</span>
              </Link>
            </Button>
            <div className="flex items-center">
              <ThemeToggle />
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};
