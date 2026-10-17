"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const words = ["Works", "Guides", "Empowers", "Accelerates"];

export default function AnimatedWords() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % words.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <span className="inline-block relative min-w-[200px] text-left text-[#1cdb55] italic font-serif overflow-hidden">
      <span className="block animate-slide-up bg-clip-text text-transparent bg-gradient-to-r from-[#1cdb55] to-[#5bc2e7]">
        {words[index]}
      </span>
    </span>
  );
}
