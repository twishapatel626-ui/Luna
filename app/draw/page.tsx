"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import tarotCards from "../data/tarotCards";

export default function DrawPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const question = searchParams.get("question");

  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isShuffling, setIsShuffling] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showReading, setShowReading] = useState(false);

  const shuffleArray = (array) => {
    return [...array].sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    setCards(shuffleArray(tarotCards));
  }, []);

  const handleShuffle = () => {
    if (isShuffling || selectedCard) return;

    setIsShuffling(true);

    setTimeout(() => {
      setCards(shuffleArray(tarotCards));
      setIsShuffling(false);
    }, 1000);
  };

  const handleSelectCard = (card) => {
    if (isShuffling || selectedCard) return;

    setSelectedCard(card);

    // Flip the card first
    setTimeout(() => {
      setIsFlipped(true);
    }, 700);

    // Then show the reading modal
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

  return (
    <main className="min-h-screen bg-[#050816] text-white">
      <section className="px-6 py-12">

        {/* HEADER */}

        <div className="mx-auto max-w-6xl text-center">

          <p className="text-sm uppercase tracking-[0.4em] text-purple-300">
            ✦ Luna Tarot
          </p>

          <h1 className="mt-5 text-3xl font-semibold md:text-4xl">
            Focus on your question
          </h1>

          {question && (
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-400">
              “{question}”
            </p>
          )}

          <p className="mt-3 text-sm text-gray-500">
            Shuffle the cards, then choose the one you feel drawn to.
          </p>

        </div>


        {/* CARD TABLE */}

        <div
          className="
            mx-auto
            mt-12
            max-w-7xl
            rounded-[40px]
            border
            border-purple-400/10
            bg-gradient-to-b
            from-[#0b1024]
            to-[#070a18]
            px-4
            py-10
            shadow-2xl
            shadow-purple-950/20
          "
        >

          {/* CARD SPREAD */}

          <div
            className={`
              grid
              grid-cols-6
              gap-2
              justify-items-center
              transition-all
              duration-700

              sm:grid-cols-8
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
                  ? "-rotate-3"
                  : index % 5 === 1
                  ? "rotate-2"
                  : index % 5 === 2
                  ? "-rotate-1"
                  : index % 5 === 3
                  ? "rotate-3"
                  : "rotate-1";

              const isSelected =
                selectedCard?.id === card.id;

              const isOtherCard =
                selectedCard &&
                selectedCard.id !== card.id;

              return (
                <button
                  key={card.id}
                  onClick={() => handleSelectCard(card)}
                  disabled={!!selectedCard || isShuffling}
                  className={`
                    group
                    relative
                    h-[120px]
                    w-[72px]
                    overflow-hidden
                    rounded-lg
                    border
                    border-purple-300/20
                    bg-[#0d1228]
                    shadow-lg
                    shadow-black/30
                    transition-all
                    duration-500

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
                          scale-125
                          !rotate-0
                          border-purple-300
                          shadow-2xl
                          shadow-purple-500/40
                        `
                        : ""
                    }

                    ${
                      isOtherCard
                        ? "scale-90 opacity-20"
                        : ""
                    }

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
                        rounded-lg
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


          {/* SHUFFLE BUTTON */}

          {!selectedCard && (
            <div className="mt-10 flex flex-col items-center">

              <button
                onClick={handleShuffle}
                disabled={isShuffling}
                className="
                  rounded-full
                  border
                  border-purple-400/30
                  bg-gradient-to-r
                  from-purple-600/20
                  to-pink-500/20
                  px-10
                  py-4
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
                "
              >
                {isShuffling
                  ? "Shuffling..."
                  : "↻ Shuffle Cards"}
              </button>

              <p className="mt-3 text-xs text-gray-600">
                Take a moment. Choose the card that calls to you.
              </p>

            </div>
          )}

        </div>

      </section>
{/* ========================================= */}
{/* READING MODAL */}
{/* ========================================= */}

{showReading && selectedCard && (
  <div
    className="
      fixed
      inset-0
      z-[200]
      flex
      items-center
      justify-center
      bg-black/85
      px-5
      py-8
      backdrop-blur-md
    "
  >
    {/* Background glow */}

    <div
      className="
        absolute
        inset-0
        bg-[radial-gradient(circle_at_center,rgba(88,28,135,0.18),transparent_50%)]
      "
    />

    {/* HORIZONTAL MODAL */}

    <div
      className="
        relative
        z-10
        w-full
        max-w-4xl
        rounded-[32px]
        border
        border-purple-300/20
        bg-[#090910]/95
        p-6
        shadow-[0_0_100px_rgba(0,0,0,0.95)]
        backdrop-blur-xl
        animate-[modalIn_0.5s_ease-out]

        md:p-8
      "
    >

      {/* TOP LABEL */}

      <div className="text-center">

        <p className="text-xs uppercase tracking-[0.4em] text-purple-300">
          ✦ Your Reading
        </p>

      </div>


      {/* HORIZONTAL CONTENT */}

      <div
        className="
          mt-7
          flex
          flex-col
          items-center
          gap-8

          md:flex-row
          md:items-start
          md:gap-10
        "
      >

        {/* ========================= */}
        {/* CARD */}
        {/* ========================= */}

        <div className="flex shrink-0 justify-center">

          <div
            className="
              h-[300px]
              w-[185px]
              overflow-hidden
              rounded-2xl
              border
              border-purple-300/30
              shadow-[0_0_45px_rgba(139,92,246,0.25)]

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


        {/* ========================= */}
        {/* READING */}
        {/* ========================= */}

        <div className="flex flex-1 flex-col justify-center text-left">

          {/* CARD NAME */}

          <h2 className="text-3xl font-semibold text-white">
            {selectedCard.name}
          </h2>


          {/* ANSWER */}

          <p
            className={`
              mt-4
              text-5xl
              font-bold
              tracking-[0.15em]

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


          {/* INTERPRETATION */}

          <p className="mt-5 max-w-xl text-base leading-7 text-gray-400">
            {selectedCard.shortMeaning}
          </p>


          {/* QUESTION */}

          {question && (
            <div className="mt-6 border-t border-white/10 pt-5">

              <p className="text-[10px] uppercase tracking-[0.3em] text-gray-600">
                Your question
              </p>

              <p className="mt-2 text-sm italic text-gray-500">
                “{question}”
              </p>

            </div>
          )}


          {/* BUTTONS */}

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">

            {/* CANCEL */}

            <button
              onClick={handleCancel}
              className="
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
              "
            >
              Cancel
            </button>


            {/* ASK AGAIN */}

            <button
              onClick={handleAskAgain}
              className="
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