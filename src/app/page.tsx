"use client";
import dynamic from "next/dynamic";

const DynamicChat = dynamic(() => import("../components/chat"), {
  ssr: false
});

export default function Home() {
  return <DynamicChat />;
}
