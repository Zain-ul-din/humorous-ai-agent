/* eslint-disable @next/next/no-img-element */
"use client";
import { Button } from "@/components/ui/button";
import {
  ChatBubble,
  ChatBubbleMessage
} from "@/components/ui/chat/chat-bubble";
import { ChatInput } from "@/components/ui/chat/chat-input";
import { ChatMessageList } from "@/components/ui/chat/chat-message-list";
import MessageLoading from "@/components/ui/chat/message-loading";
import { ModeToggle } from "@/components/ui/mode-toggle";
import runAgent from "@/lib/agent";
import { CornerDownLeft, Github, Paintbrush } from "lucide-react";
import { useActionState, useEffect, useMemo, useRef } from "react";
import { LocalStoragePreset } from "lowdb/browser";
import { Content } from "@google/generative-ai";
import Link from "next/link";

export default function Chat() {
  const storage = useMemo(
    () => LocalStoragePreset<Content[]>("messages", []),
    []
  );

  const dbMessages = useMemo(() => {
    storage.read();
    console.log("data: ", storage.data);
    return storage.data;
  }, [storage]);

  const foo = dbMessages;

  const [messages, action, isLoading] = useActionState(runAgent, foo);
  const msgListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    storage.data = messages;
    storage.write();
  }, [storage, messages]);

  useEffect(() => {
    if (msgListRef.current) {
      msgListRef.current!.scrollBy({
        top: msgListRef.current!.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [messages]);

  return (
    <>
      <main className="w-screen mx-auto max-w-screen-lg h-[100svh] flex flex-col gap-4 px-2">
        <header className="flex items-center w-full rounded-xl border p-4 border-b bg-accent/40 mt-4">
          <h1 className="text-xl font-semibold text-foreground/80">
            Humor AI 😅
          </h1>
          <nav className="ml-auto flex items-center gap-2">
            <Button
              variant={"outline"}
              size={"icon"}
              onClick={() => {
                storage.data = [];
                storage.write();
                window.location.reload();
              }}
            >
              <Paintbrush />
            </Button>
            <ModeToggle />
            <Link href={"https://github.com/Zain-ul-din/humorous-ai-agent"}>
              <Button variant={"link"} size={"icon"}>
                <Github />
              </Button>
            </Link>
          </nav>
        </header>
        <section className="w-full px-4 py-8 flex-1 overflow-y-auto">
          <ChatMessageList ref={msgListRef}>
            {messages.map((message, i) => {
              const variant = message.role === "user" ? "sent" : "received";
              const isImage =
                variant === "received" &&
                (message.parts[0].text?.startsWith("https") ||
                  message.parts[0].text?.startsWith("/"));

              return (
                <ChatBubble variant={variant} key={i}>
                  <ChatBubbleMessage variant={variant}>
                    {isImage ? (
                      <>
                        <img
                          src={message.parts[0].text}
                          alt={message.parts[0].text}
                          className="md:w-full flex mb-2 max-w-[500px] object-cover"
                          width={300}
                          height={300}
                        />
                      </>
                    ) : (
                      <>{message.parts[0].text}</>
                    )}
                  </ChatBubbleMessage>
                </ChatBubble>
              );
            })}
            {isLoading && (
              <ChatBubble variant={"received"}>
                <ChatBubbleMessage variant={"received"}>
                  <MessageLoading />
                </ChatBubbleMessage>
              </ChatBubble>
            )}
          </ChatMessageList>
        </section>

        <form
          action={action}
          className="relative rounded-lg border mt-auto bottom-6  bg-background focus-within:ring-1 focus-within:ring-ring p-1"
        >
          <ChatInput
            placeholder="Type your message here..."
            name="message"
            className="min-h-12 resize-none rounded-lg bg-background border-0 p-3 shadow-none focus-visible:ring-0"
          />
          <div className="flex items-center p-3 pt-0">
            <Button size="sm" className="ml-auto gap-1.5" disabled={isLoading}>
              Send Message
              <CornerDownLeft className="size-3.5" />
            </Button>
          </div>
        </form>
      </main>
    </>
  );
}
