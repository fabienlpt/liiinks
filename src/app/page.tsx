import Image from "next/image";
import Header from "@/components/header";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <Header isConnected={false} />
    </main>
  );
}
