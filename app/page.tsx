"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [question, setQuestion] = useState("");
  const router = useRouter();

  const startReading = () => {
    if (!question.trim()) {
      return;
    }

    router.push(`/draw?question=${encodeURIComponent(question)}`);
  };

  return (
    <main className="min-h-screen bg-[#050816] text-white">
      <section className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <p className="mb-6 text-sm tracking-[0.4em] text-purple-300">
          ✦ LUNA TAROT
        </p>

        <h1 className="max-w-4xl text-5xl font-semibold leading-tight md:text-7xl">
          Ask the{" "}
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-300 bg-clip-text text-transparent">
            Universe.
          </span>
          <br />
          Reveal your answer.
        </h1>

        <p className="mt-6 max-w-xl text-gray-400 md:text-lg">
          Ask a question that can be answered with yes or no,
          draw a Tarot card, and let the cards guide your intuition.
        </p>

        <div className="mt-10 w-full max-w-xl">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Will I get the opportunity I'm hoping for?"
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-6 py-5 text-center text-white outline-none backdrop-blur-md placeholder:text-gray-500 focus:border-purple-400"
          />

          <button
            onClick={startReading}
            className="mt-5 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 px-8 py-4 font-medium shadow-lg shadow-purple-500/20 transition hover:scale-105"
          >
            Draw My Card ✦
          </button>
        </div>
      </section>
    </main>
  );
}