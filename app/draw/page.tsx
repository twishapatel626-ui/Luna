"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import tarotCards from "../data/tarotCards";

interface TarotCard {
  id: string | number;
  image: string;
  name: string;
  answer: string;
  shortMeaning: string;
}

function DrawContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const question = searchParams.get("question");

  const [cards, setCards] = useState<TarotCard[]>([]);
  const [selectedCard, setSelectedCard] = useState<TarotCard | null>(null);
  const [isShuffling, setIsShuffling] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showReading, setShowReading] = useState(false);

  const shuffleArray = (array: TarotCard[]): TarotCard[] => {
    return [...array].sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    setCards(shuffleArray(tarotCards as TarotCard[]));
  }, []);

  const handleShuffle = () => {
    if (isShuffling || selectedCard) return;

    setIsShuffling(true);

    setTimeout(() => {
      setCards(shuffleArray(tarotCards as TarotCard[]));
      setIsShuffling(false);
    }, 1000);
  };

  const handleSelectCard = (card: TarotCard) => {
    if (isShuffling || selectedCard) return;

    setSelectedCard(card);

    setTimeout(() => {
      setIsFlipped(true);
    }, 700);

    setTimeout(() => {
      setShowReading(true);
    }, 1500);
  };

  const handleCancel = () => {
    setShowReading(false);
    setSelectedCard(null);
    setIsFlipped(false);
  };

  const handleAskAgain = () => {
    router.push("/");
  };

  const handleBackHome = () => {
    router.push("/");
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#050816] text-white">
      {/* BACKGROUND AMBIENCE */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[-120px] top-[-100px] h-[300px] w-[300px] rounded-full bg-purple-700/10 blur-[100px]" />

        <div className="absolute bottom-[-120px] right-[-100px] h-[350px] w-[350px] rounded-full bg-pink-600/10 blur-[120px]" />
      </div>

      {/* BACK TO HOME */}
      <button
        onClick={handleBackHome}
        className="
          absolute
          left-4
          top-4
          z-50
          inline-flex
          items-center
          gap-2
          rounded-full
          border
          border-white/10
          bg-white/[0.04]
          px-4
          py-2.5
          text-sm
          font-medium
          text-gray-300
          backdrop-blur-xl
          transition-all
          duration-300
          hover:border-purple-400/40
          hover:bg-purple-500/10
          hover:text-white
          hover:shadow-lg
          hover:shadow-purple-500/10
          sm:left-6
          sm:top-6
          sm:px-5
          sm:py-3
        "
      >
        <span className="text-lg leading-none">←</span>
        <span>Back to Home</span>
      </button>

      {/* MAIN SECTION */}
      <section className="px-3 pb-10 pt-24 sm:px-6 sm:pt-28">
        {/* HEADER */}
        <div className="mx-auto max-w-6xl text-center">
          <p
            className="
              text-[10px]
              uppercase
              tracking-[0.35em]
              text-purple-300
              sm:text-sm
              sm:tracking-[0.4em]
            "
          >
            ✦ Luna Tarot
          </p>

          <h1
            className="
              mt-4
              text-2xl
              font-semibold
              leading-tight
              sm:mt-5
              sm:text-3xl
              md:text-4xl
            "
          >
            Focus on your question
          </h1>

          {question && (
            <p
              className="
                mx-auto
                mt-4
                max-w-2xl
                break-words
                px-4
                text-sm
                leading-6
                text-gray-400
                sm:text-lg
                sm:leading-7
              "
            >
              “{question}”
            </p>
          )}

          <p
            className="
              mt-3
              px-4
              text-xs
              leading-5
              text-gray-500
              sm:text-sm
            "
          >
            Shuffle the cards, then choose the one you feel drawn to.
          </p>
        </div>

        {/* CARD TABLE */}
        <div
          className="
            mx-auto
            mt-7
            max-w-7xl
            overflow-hidden
            rounded-[26px]
            border
            border-purple-400/10
            bg-gradient-to-b
            from-[#0b1024]
            via-[#080d1d]
            to-[#060918]
            shadow-2xl
            shadow-purple-950/30
            sm:mt-12
            sm:rounded-[40px]
          "
        >
          {/* TABLE HEADER */}
          <div
            className="
              flex
              items-center
              justify-between
              border-b
              border-white/5
              px-4
              py-4
              sm:px-6
              sm:py-5
            "
          >
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-purple-400 shadow-lg shadow-purple-400/60" />

              <span
                className="
                  text-[10px]
                  uppercase
                  tracking-[0.2em]
                  text-gray-500
                  sm:text-xs
                "
              >
                Tarot Deck
              </span>
            </div>

            <span className="text-[10px] text-gray-600 sm:text-xs">
              {cards.length} cards
            </span>
          </div>

          {/* MOBILE CARD SPREAD */}
          <div className="relative">
            {/* LEFT FADE */}
            <div
              className="
                pointer-events-none
                absolute
                left-0
                top-0
                z-20
                h-full
                w-8
                bg-gradient-to-r
                from-[#080d1d]
                to-transparent
                sm:hidden
              "
            />

            {/* RIGHT FADE */}
            <div
              className="
                pointer-events-none
                absolute
                right-0
                top-0
                z-20
                h-full
                w-8
                bg-gradient-to-l
                from-[#080d1d]
                to-transparent
                sm:hidden
              "
            />

            {/* CARD SCROLL */}
            <div
              className="
                overflow-x-auto
                overflow-y-hidden
                px-5
                py-7
                sm:overflow-visible
                sm:px-4
                sm:py-10
                [scrollbar-width:none]
                [-ms-overflow-style:none]
              "
            >
              <div
                className={`
                  flex
                  min-w-max
                  items-center
                  gap-3
                  transition-all
                  duration-700
                  sm:grid
                  sm:min-w-0
                  sm:grid-cols-7
                  sm:gap-x-2
                  sm:gap-y-5
                  sm:justify-items-center
                  md:grid-cols-10
                  lg:grid-cols-13
                  ${
                    isShuffling
                      ? "scale-[0.96] rotate-1 opacity-60"
                      : "scale-100 rotate-0 opacity-100"
                  }
                `}
              >
                {cards.map((card, index) => {
                  const rotation =
                    index % 5 === 0
                      ? "-rotate-2"
                      : index % 5 === 1
                      ? "rotate-1"
                      : index % 5 === 2
                      ? "-rotate-1"
                      : index % 5 === 3
                      ? "rotate-2"
                      : "rotate-1";

                  const isSelected = selectedCard?.id === card.id;

                  const isOtherCard =
                    selectedCard !== null &&
                    selectedCard.id !== card.id;

                  return (
                    <button
                      key={card.id}
                      onClick={() => handleSelectCard(card)}
                      disabled={!!selectedCard || isShuffling}
                      aria-label={`Choose ${card.name}`}
                      className={`
                        group
                        relative
                        shrink-0
                        overflow-hidden
                        rounded-md
                        border
                        border-purple-300/20
                        bg-[#0d1228]
                        shadow-lg
                        shadow-black/40
                        transition-all
                        duration-500

                        h-[105px]
                        w-[63px]

                        sm:h-[145px]
                        sm:w-[88px]

                        md:h-[165px]
                        md:w-[100px]

                        lg:h-[180px]
                        lg:w-[110px]

                        ${rotation}

                        ${
                          isSelected
                            ? `
                              z-50
                              scale-[1.35]
                              !rotate-0
                              border-purple-300
                              shadow-2xl
                              shadow-purple-500/50
                            `
                            : ""
                        }

                        ${isOtherCard ? "scale-90 opacity-15" : ""}

                        ${
                          !selectedCard
                            ? `
                              hover:z-40
                              hover:-translate-y-3
                              hover:scale-110
                              hover:border-purple-300/70
                              hover:shadow-xl
                              hover:shadow-purple-500/30
                            `
                            : ""
                        }
                      `}
                    >
                      {/* CARD FLIP */}
                      <div
                        className={`
                          relative
                          h-full
                          w-full
                          transition-transform
                          duration-700
                          [transform-style:preserve-3d]
                          ${
                            isSelected && isFlipped
                              ? "[transform:rotateY(180deg)]"
                              : ""
                          }
                        `}
                      >
                        {/* CARD BACK */}
                        <div
                          className="
                            absolute
                            inset-0
                            overflow-hidden
                            rounded-md
                            [backface-visibility:hidden]
                          "
                        >
                          <img
                            src="/tarot/backcover.png"
                            alt="Tarot card back"
                            className="h-full w-full object-cover"
                            draggable="false"
                          />
                        </div>

                        {/* CARD FRONT */}
                        <div
                          className="
                            absolute
                            inset-0
                            overflow-hidden
                            rounded-md
                            [backface-visibility:hidden]
                            [transform:rotateY(180deg)]
                          "
                        >
                          <img
                            src={card.image}
                            alt={card.name}
                            className="h-full w-full object-cover"
                            draggable="false"
                          />
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* MOBILE SCROLL HINT */}
          <div
            className="
              flex
              items-center
              justify-center
              gap-2
              border-t
              border-white/5
              px-4
              py-3
              sm:hidden
            "
          >
            <span className="text-xs text-gray-600">
              ← Swipe to explore the deck →
            </span>
          </div>

          {/* SHUFFLE BUTTON */}
          {!selectedCard && (
            <div
              className="
                flex
                flex-col
                items-center
                border-t
                border-white/5
                px-4
                py-6
                sm:mt-0
                sm:border-t-0
                sm:px-0
                sm:py-0
              "
            >
              <button
                onClick={handleShuffle}
                disabled={isShuffling}
                className="
                  w-full
                  max-w-xs
                  rounded-full
                  border
                  border-purple-400/30
                  bg-gradient-to-r
                  from-purple-600/20
                  to-pink-500/20
                  px-8
                  py-3.5
                  text-sm
                  font-medium
                  text-purple-100
                  shadow-lg
                  shadow-purple-950/30
                  backdrop-blur-md
                  transition-all
                  duration-300
                  hover:scale-105
                  hover:border-purple-400/70
                  hover:from-purple-600/30
                  hover:to-pink-500/30
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                  sm:mt-8
                  sm:w-auto
                  sm:px-10
                  sm:py-4
                "
              >
                {isShuffling ? "Shuffling..." : "↻ Shuffle Cards"}
              </button>

              <p
                className="
                  mt-3
                  px-4
                  text-center
                  text-[11px]
                  leading-5
                  text-gray-600
                  sm:text-xs
                "
              >
                Take a moment. Choose the card that calls to you.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* READING MODAL */}
      {showReading && selectedCard && (
        <div
          className="
            fixed
            inset-0
            z-[200]
            flex
            items-center
            justify-center
            overflow-y-auto
            bg-black/85
            px-4
            py-6
            backdrop-blur-md
            sm:px-5
            sm:py-8
          "
        >
          {/* BACKGROUND GLOW */}
          <div
            className="
              absolute
              inset-0
              bg-[radial-gradient(circle_at_center,rgba(88,28,135,0.18),transparent_50%)]
            "
          />

          {/* MODAL */}
          <div
            className="
              relative
              z-10
              w-full
              max-w-4xl
              rounded-[26px]
              border
              border-purple-300/20
              bg-[#090910]/95
              p-5
              shadow-[0_0_100px_rgba(0,0,0,0.95)]
              backdrop-blur-xl
              animate-[modalIn_0.5s_ease-out]
              sm:rounded-[32px]
              sm:p-8
            "
          >
            {/* TOP LABEL */}
            <div className="text-center">
              <p
                className="
                  text-[10px]
                  uppercase
                  tracking-[0.3em]
                  text-purple-300
                  sm:text-xs
                  sm:tracking-[0.4em]
                "
              >
                ✦ Your Reading
              </p>
            </div>

            {/* MODAL CONTENT */}
            <div
              className="
                mt-6
                flex
                flex-col
                items-center
                gap-6
                sm:mt-7
                sm:gap-8
                md:flex-row
                md:items-start
                md:gap-10
              "
            >
              {/* SELECTED CARD */}
              <div className="flex shrink-0 justify-center">
                <div
                  className="
                    h-[250px]
                    w-[155px]
                    overflow-hidden
                    rounded-2xl
                    border
                    border-purple-300/30
                    shadow-[0_0_45px_rgba(139,92,246,0.25)]
                    sm:h-[300px]
                    sm:w-[185px]
                    md:h-[340px]
                    md:w-[210px]
                  "
                >
                  <img
                    src={selectedCard.image}
                    alt={selectedCard.name}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>

              {/* READING */}
              <div
                className="
                  flex
                  w-full
                  flex-1
                  flex-col
                  justify-center
                  text-center
                  md:text-left
                "
              >
                <h2 className="text-2xl font-semibold sm:text-3xl">
                  {selectedCard.name}
                </h2>

                <p
                  className={`
                    mt-3
                    text-4xl
                    font-bold
                    tracking-[0.12em]
                    sm:mt-4
                    sm:text-5xl
                    sm:tracking-[0.15em]
                    ${
                      selectedCard.answer === "YES"
                        ? "text-emerald-400"
                        : selectedCard.answer === "NO"
                        ? "text-red-400"
                        : "text-yellow-400"
                    }
                  `}
                >
                  {selectedCard.answer}
                </p>

                <p
                  className="
                    mx-auto
                    mt-4
                    max-w-xl
                    text-sm
                    leading-6
                    text-gray-400
                    sm:mt-5
                    sm:text-base
                    sm:leading-7
                    md:mx-0
                  "
                >
                  {selectedCard.shortMeaning}
                </p>

                {question && (
                  <div
                    className="
                      mt-5
                      border-t
                      border-white/10
                      pt-4
                      sm:mt-6
                      sm:pt-5
                    "
                  >
                    <p
                      className="
                        text-[9px]
                        uppercase
                        tracking-[0.25em]
                        text-gray-600
                        sm:text-[10px]
                        sm:tracking-[0.3em]
                      "
                    >
                      Your question
                    </p>

                    <p
                      className="
                        mt-2
                        break-words
                        text-xs
                        italic
                        leading-5
                        text-gray-500
                        sm:text-sm
                        sm:leading-6
                      "
                    >
                      “{question}”
                    </p>
                  </div>
                )}

                {/* BUTTONS */}
                <div
                  className="
                    mt-6
                    flex
                    w-full
                    flex-col
                    gap-3
                    sm:mt-7
                    sm:flex-row
                  "
                >
                  <button
                    onClick={handleCancel}
                    className="
                      w-full
                      rounded-full
                      border
                      border-white/10
                      bg-white/5
                      px-7
                      py-3.5
                      text-sm
                      font-medium
                      text-gray-300
                      transition-all
                      duration-300
                      hover:border-white/20
                      hover:bg-white/10
                      hover:text-white
                      sm:w-auto
                    "
                  >
                    Cancel
                  </button>

                  <button
                    onClick={handleAskAgain}
                    className="
                      w-full
                      rounded-full
                      bg-gradient-to-r
                      from-purple-600
                      to-pink-500
                      px-7
                      py-3.5
                      text-sm
                      font-medium
                      text-white
                      shadow-lg
                      shadow-purple-500/20
                      transition-all
                      duration-300
                      hover:scale-[1.02]
                      hover:shadow-purple-500/40
                      sm:w-auto
                    "
                  >
                    Ask Again
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default function DrawPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-[#050816] text-white">
          <div className="text-center">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-purple-400/20 border-t-purple-400" />

            <p className="mt-4 text-sm text-gray-500">
              Preparing your reading...
            </p>
          </div>
        </main>
      }
    >
      <DrawContent />
    </Suspense>
  );
}