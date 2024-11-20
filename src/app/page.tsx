import dynamic from "next/dynamic";

const DynamicChat = dynamic(() => import("../components/chat"));

export default function Home() {
  return <DynamicChat />;
}
