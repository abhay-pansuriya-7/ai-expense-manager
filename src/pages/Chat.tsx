
import { ChatContainer } from "@/components/chat/ChatContainer";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const Chat = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto pt-14">
        <ChatContainer />
      </main>
      <Footer />
    </div>
  );
};

export default Chat;
