"use client";

import { useEffect, useState } from "react";

type TypewriterProps = {
  text: string;
};

export function Typewriter({ text }: TypewriterProps) {
  const [replayKey, setReplayKey] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setReplayKey((prev) => prev + 1);
    }, 7000);

    return () => window.clearInterval(id);
  }, []);

  return (
    <p key={replayKey}>
      {text.split("").map((char, index) => (
        <span
          key={`${replayKey}-${index}`}
          className="typewriter-char"
          style={{ animationDelay: `${index * 0.02}s` }}
        >
          {char}
        </span>
      ))}
    </p>
  );
}
