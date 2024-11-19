import { Button } from "@/components/ui/button";
import {
  ChatBubble,
  ChatBubbleMessage
} from "@/components/ui/chat/chat-bubble";
import { ChatInput } from "@/components/ui/chat/chat-input";
import { ChatMessageList } from "@/components/ui/chat/chat-message-list";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { CornerDownLeft } from "lucide-react";

export default function Home() {
  return (
    <>
      <main className="w-screen mx-auto max-w-screen-lg h-[100svh] flex flex-col gap-4 px-2">
        <header className="flex items-center w-full rounded-xl border p-4 border-b bg-accent/40 mt-4">
          <h1 className="text-xl font-semibold text-foreground/80">
            Humor AI 😅
          </h1>
          <nav className="ml-auto">
            <ModeToggle />
          </nav>
        </header>
        <section className=" w-full px-4 py-8 flex-1 overflow-y-auto">
          <ChatMessageList>
            <ChatBubble variant="sent">
              <ChatBubbleMessage variant="sent">
                Hello, how has your day been? I hope you are doing well.
              </ChatBubbleMessage>
            </ChatBubble>
            {new Array(3).fill("").map((_, i) => {
              return (
                <ChatBubble variant="received" key={i}>
                  <ChatBubbleMessage variant="received">
                    Hi, I am doing well, thank you for asking. How can I help
                    you today?
                  </ChatBubbleMessage>
                </ChatBubble>
              );
            })}
          </ChatMessageList>
        </section>

        <form className="relative rounded-lg border mt-auto bottom-6  bg-background focus-within:ring-1 focus-within:ring-ring p-1">
          <ChatInput
            placeholder="Type your message here..."
            className="min-h-12 resize-none rounded-lg bg-background border-0 p-3 shadow-none focus-visible:ring-0"
          />
          <div className="flex items-center p-3 pt-0">
            <Button size="sm" className="ml-auto gap-1.5">
              Send Message
              <CornerDownLeft className="size-3.5" />
            </Button>
          </div>
        </form>
      </main>
    </>
  );
}
