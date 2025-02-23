
import { AuthForm } from "@/components/auth/AuthForm";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const Auth = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center p-4 pt-14">
        <AuthForm />
      </main>
      <Footer />
    </div>
  );
};

export default Auth;
