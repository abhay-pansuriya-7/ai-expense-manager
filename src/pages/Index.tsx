import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center p-4 space-y-6 text-center mt-14">
        <span className="inline-flex items-center rounded-lg bg-muted px-3 py-1 text-sm font-medium">
          Your Personal Finance Assistant
        </span>
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          Manage Your Expenses with AI
        </h1>
        <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
          Simplify your expense tracking with our intelligent chatbot. Get insights, reports, and manage your finances effortlessly.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button asChild size="lg">
            <Link to="/chat">Try the Chatbot</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/auth">Sign In</Link>
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-t bg-muted/40">
        <div className="container mx-auto py-20 grid gap-8 px-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border bg-card p-6 space-y-2">
            <h3 className="text-xl font-semibold">Natural Conversations</h3>
            <p className="text-muted-foreground">
              Interact naturally with our AI to manage your expenses, no complex forms needed.
            </p>
          </div>
          <div className="rounded-lg border bg-card p-6 space-y-2">
            <h3 className="text-xl font-semibold">Smart Insights</h3>
            <p className="text-muted-foreground">
              Get intelligent analytics and recommendations for better financial management.
            </p>
          </div>
          <div className="rounded-lg border bg-card p-6 space-y-2">
            <h3 className="text-xl font-semibold">Easy Integration</h3>
            <p className="text-muted-foreground">
              Upload receipts and documents effortlessly through chat.
            </p>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
