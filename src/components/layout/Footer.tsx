
import { Link } from "react-router-dom";
import { Copyright, Mail } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
            <Copyright className="h-4 w-4" />
            <span>{new Date().getFullYear()} ExpenseAI. All rights reserved.</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link 
              to="/contact" 
              className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Mail className="h-4 w-4" />
              <span>Contact Us</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
