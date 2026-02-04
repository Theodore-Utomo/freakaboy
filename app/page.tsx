"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export default function Home() {
  const [noClickCount, setNoClickCount] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [angryEmojis, setAngryEmojis] = useState<{ id: number; x: number; y: number }[]>([]);
  const [floatingHearts, setFloatingHearts] = useState<{ id: number; left: number; top: number; delay: number; duration: number }[]>([]);

  useEffect(() => {
    const hearts = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 5 + Math.random() * 5,
    }));
    setFloatingHearts(hearts);
  }, []);

  const handleNoClick = () => {
    const newCount = noClickCount + 1;
    setNoClickCount(newCount);

    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);

    if (newCount > 2) {
      const newEmoji = {
        id: Date.now(),
        x: Math.random() * 80 + 10,
        y: Math.random() * 80 + 10,
      };
      setAngryEmojis([...angryEmojis, newEmoji]);
    }
  };

  const handleYesClick = () => {
    setShowVideo(true);
  };

  if (showVideo) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-200 via-red-200 to-pink-300 p-4 sm:p-8">
        <div className="flex flex-col items-center gap-4 sm:gap-6 max-w-full">
          <h1 className="text-3xl sm:text-5xl font-bold text-red-600 text-center animate-pulse px-4">
            Good
          </h1>
          <video
            controls
            autoPlay
            className="max-w-4xl w-full rounded-lg shadow-2xl"
          >
            <source src="/gemini_generated_video_47E555CE.MOV" type="video/quicktime" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-red-100 to-pink-200 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        {floatingHearts.map((heart) => (
          <div
            key={heart.id}
            className="absolute text-2xl sm:text-4xl animate-float"
            style={{
              left: `${heart.left}%`,
              top: `${heart.top}%`,
              animationDelay: `${heart.delay}s`,
              animationDuration: `${heart.duration}s`,
            }}
          >
            ❤️
          </div>
        ))}
      </div>

      {/* Angry emojis */}
      {angryEmojis.map((emoji) => (
        <div
          key={emoji.id}
          className="absolute text-4xl sm:text-6xl animate-bounce z-20"
          style={{
            left: `${emoji.x}%`,
            top: `${emoji.y}%`,
          }}
        >
          😠
        </div>
      ))}

      {showToast && (
        <div className="fixed top-4 sm:top-8 left-1/2 transform -translate-x-1/2 z-50 animate-bounce max-w-[90vw] sm:max-w-none">
          <div className="bg-red-600 text-white px-4 py-3 sm:px-8 sm:py-6 rounded-lg shadow-2xl flex items-center gap-2 sm:gap-4 border-2 sm:border-4 border-red-800">
            {noClickCount === 1 && (
              <>
                <Image
                  src="/Subject4.png"
                  alt="Warning"
                  width={50}
                  height={50}
                  className="rounded-full sm:w-[80px] sm:h-[80px]"
                />
                <p className="text-sm sm:text-xl font-bold">
                  I wasn't asking, you cannot say No
                </p>
              </>
            )}
            {noClickCount === 2 && (
              <>
                <Image
                  src="/Subject4.png"
                  alt="Warning"
                  width={40}
                  height={40}
                  className="rounded-full sm:w-[60px] sm:h-[60px]"
                />
                <Image
                  src="/Subject3.png"
                  alt="Threat"
                  width={40}
                  height={40}
                  className="rounded-full sm:w-[60px] sm:h-[60px]"
                />
                <p className="text-sm sm:text-xl font-bold">I'm going to eat you</p>
              </>
            )}
            {noClickCount > 2 && (
              <>
                <Image
                  src="/Subject4.png"
                  alt="Warning"
                  width={40}
                  height={40}
                  className="rounded-full sm:w-[60px] sm:h-[60px]"
                />
                <Image
                  src="/Subject3.png"
                  alt="Threat"
                  width={40}
                  height={40}
                  className="rounded-full sm:w-[60px] sm:h-[60px]"
                />
                <p className="text-base sm:text-2xl font-bold">YOU CANNOT SAY NO</p>
              </>
            )}
          </div>
        </div>
      )}

      <main className="relative z-10 flex flex-col items-center gap-3 sm:gap-6 p-4 sm:p-8 max-h-screen justify-center">
        <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold text-red-600 text-center drop-shadow-lg px-2 leading-tight">
          You Will Be My Valentine
        </h1>

        <div className="relative">
          <Image
            src="/Subject2.png"
            alt="Will you be my valentine?"
            width={250}
            height={250}
            priority
            className="rounded-2xl sm:rounded-3xl shadow-2xl border-4 sm:border-8 border-white w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] md:w-[400px] md:h-[400px] object-cover"
          />
        </div>

        <div className="flex gap-4 sm:gap-6">
          <button
            onClick={handleYesClick}
            className="px-8 py-3 sm:px-12 sm:py-4 text-xl sm:text-2xl font-bold text-white bg-green-500 hover:bg-green-600 rounded-full shadow-lg transform hover:scale-110 transition-all duration-200"
          >
            Yes! 💕
          </button>
          <button
            onClick={handleNoClick}
            className="font-bold text-white bg-red-500 hover:bg-red-600 rounded-full shadow-lg transform hover:scale-110 transition-all duration-200"
            style={{
              paddingLeft: `${Math.max(1.5, 2 - noClickCount * 0.08)}rem`,
              paddingRight: `${Math.max(1.5, 2 - noClickCount * 0.08)}rem`,
              paddingTop: `${Math.max(0.5, 0.75 - noClickCount * 0.02)}rem`,
              paddingBottom: `${Math.max(0.5, 0.75 - noClickCount * 0.02)}rem`,
              fontSize: `${Math.max(0.7, 1.25 - noClickCount * 0.03)}rem`,
            }}
          >
            No
          </button>
        </div>

        {noClickCount > 0 && (
          <p className="text-base sm:text-xl text-red-700 font-semibold animate-pulse">
            Wrong answer! Try again... 😤
          </p>
        )}
      </main>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
            opacity: 0.6;
          }
        }
        .animate-float {
          animation: float linear infinite;
        }
      `}</style>
    </div>
  );
}
