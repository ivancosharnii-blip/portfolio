"use client";

import { useEffect, useState } from "react";

const LATIN = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const CYRILLIC = "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ";

type ScrambleTextProps = {
  words: string[];
  charset?: "latin" | "cyrillic";
};

export function ScrambleText({
  words,
  charset = "latin",
}: ScrambleTextProps) {
  const pool = charset === "cyrillic" ? CYRILLIC : LATIN;
  const [wordIndex, setWordIndex] = useState(0);
  const [display, setDisplay] = useState(words[0] ?? "");

  useEffect(() => {
    setWordIndex(0);
    setDisplay(words[0] ?? "");
  }, [words.join("|")]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (words.length === 0) return;

    const cycleId = window.setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 4000);

    return () => window.clearInterval(cycleId);
  }, [words.join("|")]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const target = words[wordIndex];
    if (!target) return;

    let lockedCount = 0;
    let frame = 0;

    const scrambleId = window.setInterval(() => {
      frame += 1;

      if (frame % 3 === 0) {
        lockedCount = Math.min(lockedCount + 1, target.length);
      }

      const next = target
        .split("")
        .map((char, i) =>
          i < lockedCount
            ? char
            : pool[Math.floor(Math.random() * pool.length)],
        )
        .join("");

      setDisplay(next);

      if (lockedCount >= target.length) {
        window.clearInterval(scrambleId);
        setDisplay(target);
      }
    }, 40);

    return () => window.clearInterval(scrambleId);
  }, [wordIndex, words.join("|"), charset]); // eslint-disable-line react-hooks/exhaustive-deps

  return <span aria-live="polite">{display}</span>;
}
