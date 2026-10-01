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
    <main className="relative min-h-screen overflow-hidden bg-[#050816] text-white">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Purple glow - top left */}
        <div
          className="
            absolute
            -left-32
            -top-32
            h-[420px]
            w-[420px]
            rounded-full
            bg-purple-600/10
            blur-[120px]
          "
        />

        {/* Pink glow - right */}
        <div
          className="
            absolute
            -right-40
            top-1/3
            h-[400px]
            w-[400px]
            rounded-full
            bg-pink-500/10
            blur-[130px]
          "
        />

        {/* Purple glow - bottom */}
        <div
          className="
            absolute
            bottom-[-200px]
            left-1/2
            h-[500px]
            w-[500px]
            -translate-x-1/2
            rounded-full
            bg-purple-700/10
            blur-[140px]
          "
        />

        {/* Stars */}
        <span className="absolute left-[8%] top-[15%] h-1 w-1 animate-pulse rounded-full bg-white/70 shadow-[0_0_8px_rgba(255,255,255,0.8)]" />

        <span className="absolute left-[17%] top-[31%] h-1.5 w-1.5 animate-pulse rounded-full bg-purple-200/70 shadow-[0_0_12px_rgba(216,180,254,0.8)]" />

        <span className="absolute left-[28%] top-[11%] h-1 w-1 animate-pulse rounded-full bg-pink-200/60 shadow-[0_0_10px_rgba(244,114,182,0.8)]" />

        <span className="absolute left-[38%] top-[23%] h-1 w-1 animate-pulse rounded-full bg-white/60 shadow-[0_0_8px_rgba(255,255,255,0.8)]" />

        <span className="absolute left-[48%] top-[9%] h-1.5 w-1.5 animate-pulse rounded-full bg-purple-200/60 shadow-[0_0_12px_rgba(216,180,254,0.8)]" />

        <span className="absolute right-[38%] top-[17%] h-1 w-1 animate-pulse rounded-full bg-white/60 shadow-[0_0_8px_rgba(255,255,255,0.8)]" />

        <span className="absolute right-[24%] top-[10%] h-1.5 w-1.5 animate-pulse rounded-full bg-pink-200/70 shadow-[0_0_12px_rgba(244,114,182,0.8)]" />

        <span className="absolute right-[11%] top-[27%] h-1 w-1 animate-pulse rounded-full bg-white/70 shadow-[0_0_8px_rgba(255,255,255,0.8)]" />

        <span className="absolute left-[7%] top-[57%] h-1.5 w-1.5 animate-pulse rounded-full bg-purple-200/60 shadow-[0_0_12px_rgba(216,180,254,0.8)]" />

        <span className="absolute left-[19%] top-[72%] h-1 w-1 animate-pulse rounded-full bg-white/50 shadow-[0_0_8px_rgba(255,255,255,0.7)]" />

        <span className="absolute bottom-[12%] left-[32%] h-1 w-1 animate-pulse rounded-full bg-pink-200/60 shadow-[0_0_10px_rgba(244,114,182,0.8)]" />

        <span className="absolute bottom-[17%] right-[29%] h-1.5 w-1.5 animate-pulse rounded-full bg-purple-200/60 shadow-[0_0_12px_rgba(216,180,254,0.8)]" />

        <span className="absolute bottom-[29%] right-[15%] h-1 w-1 animate-pulse rounded-full bg-white/60 shadow-[0_0_8px_rgba(255,255,255,0.8)]" />

        <span className="absolute bottom-[13%] right-[7%] h-1.5 w-1.5 animate-pulse rounded-full bg-pink-200/60 shadow-[0_0_12px_rgba(244,114,182,0.8)]" />

        {/* Decorative stars */}
        <div
          className="
            absolute
            left-[12%]
            top-[22%]
            animate-pulse
            text-lg
            text-purple-300/60
            drop-shadow-[0_0_10px_rgba(216,180,254,0.7)]
          "
        >
          ✦
        </div>

        <div
          className="
            absolute
            right-[14%]
            top-[38%]
            animate-pulse
            text-2xl
            text-pink-300/50
            drop-shadow-[0_0_14px_rgba(244,114,182,0.7)]
          "
        >
          ✧
        </div>

        <div
          className="
            absolute
            bottom-[20%]
            left-[14%]
            animate-pulse
            text-xl
            text-purple-300/50
            drop-shadow-[0_0_12px_rgba(216,180,254,0.7)]
          "
        >
          ✧
        </div>

        <div
          className="
            absolute
            bottom-[20%]
            right-[9%]
            animate-pulse
            text-lg
            text-white/40
            drop-shadow-[0_0_10px_rgba(255,255,255,0.7)]
          "
        >
          ✦
        </div>
      </div>

      {/* Main Content */}
      <section
        className="
          relative
          z-10
          flex
          min-h-screen
          flex-col
          items-center
          justify-center
          px-5
          py-12
          text-center
          sm:px-6
        "
      >
        {/* Center glow */}
        <div
          className="
            pointer-events-none
            absolute
            left-1/2
            top-1/2
            h-[500px]
            w-[500px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-purple-600/[0.06]
            blur-[100px]
          "
        />

        {/* Heading */}
        <h1
          className="
            relative
            max-w-4xl
            text-4xl
            font-semibold
            leading-[1.15]
            tracking-tight
            sm:text-5xl
            md:text-7xl
          "
        >
          Ask the{" "}

          <span
            className="
              bg-gradient-to-r
              from-purple-300
              via-pink-300
              to-purple-200
              bg-clip-text
              text-transparent
              drop-shadow-[0_0_25px_rgba(192,132,252,0.15)]
            "
          >
            Universe.
          </span>

          <br />

          Reveal your answer.

          {/* Decorative sparkle */}
          <span
            className="
              absolute
              -right-5
              -top-3
              animate-pulse
              text-sm
              text-purple-300/70
              drop-shadow-[0_0_10px_rgba(216,180,254,0.9)]
              sm:-right-7
              sm:-top-4
              sm:text-lg
            "
          >
            ✦
          </span>
        </h1>

        {/* Description */}
        <p
          className="
            relative
            mt-5
            max-w-xl
            px-2
            text-sm
            leading-6
            text-gray-400
            sm:mt-6
            sm:px-0
            sm:text-base
            sm:leading-7
            md:text-lg
          "
        >
          Ask a question that can be answered with yes or no,
          draw a Tarot card, and let the cards guide your intuition.
        </p>

        {/* Question + Button */}
        <div
          className="
            relative
            mt-8
            w-full
            max-w-xl
            sm:mt-10
          "
        >
          {/* Question Input */}
          <div className="group relative">
            {/* Input glow */}
            <div
              className="
                pointer-events-none
                absolute
                -inset-1
                rounded-[18px]
                bg-gradient-to-r
                from-purple-500/10
                via-pink-500/10
                to-purple-500/10
                opacity-0
                blur-lg
                transition-opacity
                duration-500
                group-focus-within:opacity-100
              "
            />

            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  startReading();
                }
              }}
              placeholder="Will I get the opportunity I'm hoping for?"
              className="
                relative
                w-full
                rounded-2xl
                border
                border-white/10
                bg-white/[0.045]
                px-5
                py-4
                text-center
                text-sm
                text-white
                outline-none
                backdrop-blur-xl
                transition-all
                duration-300
                placeholder:text-gray-600
                hover:border-white/15
                hover:bg-white/[0.06]
                focus:border-purple-400/60
                focus:bg-white/[0.07]
                focus:ring-2
                focus:ring-purple-500/10
                sm:px-6
                sm:py-5
                sm:text-base
              "
            />
          </div>

          {/* Draw Button */}
          <button
            onClick={startReading}
            className="
              relative
              mt-4
              w-full
              overflow-hidden
              rounded-full
              bg-gradient-to-r
              from-purple-600
              to-pink-500
              px-8
              py-4
              text-sm
              font-medium
              text-white
              shadow-lg
              shadow-purple-500/20
              transition-all
              duration-300
              hover:scale-[1.02]
              hover:shadow-[0_0_30px_rgba(168,85,247,0.3)]
              active:scale-[0.98]
              sm:mt-5
              sm:w-auto
              sm:px-10
              sm:text-base
            "
          >
            {/* Button shine */}
            <span
              className="
                pointer-events-none
                absolute
                inset-0
                -translate-x-full
                bg-gradient-to-r
                from-transparent
                via-white/15
                to-transparent
                transition-transform
                duration-700
                hover:translate-x-full
              "
            />

            <span className="relative">
              Draw My Card ✦
            </span>
          </button>
        </div>

        {/* Bottom Text */}
        <div
          className="
            absolute
            bottom-8
            left-1/2
            flex
            -translate-x-1/2
            items-center
            gap-3
            text-[10px]
            uppercase
            tracking-[0.3em]
            text-gray-600
          "
        >
          <span className="h-px w-8 bg-gradient-to-r from-transparent to-purple-400/30" />

          <span>Trust your intuition</span>

          <span className="h-px w-8 bg-gradient-to-l from-transparent to-purple-400/30" />
        </div>
      </section>
    </main>
  );
}