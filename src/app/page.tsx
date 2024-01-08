import Image from "next/image";
import { CheckCard } from "@/components/CheckCard";

export default function Home() {
  return (
    <main
      className={
        "flex min-h-screen flex-col items-center justify-center space-y-4 bg-amber-200 bg-gradient-to-r from-cyan-500 to-blue-500"
      }
    >
      <h1 className={"text-4xl font-bold text-white"}>February Days</h1>
      <p className={"text-white"}>Input the year and press the check button!</p>
      <CheckCard />
    </main>
  );
}
