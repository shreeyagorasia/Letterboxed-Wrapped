import { useEffect, useState } from "react";
import type { ReactElement } from "react";
import { AnimatePresence } from "framer-motion";

import Slide from "./Slide";
import SlideNav from "./SlideNav";

import OpeningSlide from "../slides/OpeningSlide";
import GenreSlide from "../slides/GenreSlide";
import TimeSlide from "../slides/TimeSlide";

import type { Narrative } from "../../types/wrapped";

export default function WrappedPlayer() {
  const narratives: Narrative[] = [
    { type: "opening", text: "This was your year on Letterboxd." },
    { type: "genre", text: "What kind of movie person were you this year?" },
    { type: "time", text: "Time well spent" },
    { type: "closing", text: "That’s a wrap." },
  ];

  const slides: Array<() => ReactElement> = narratives.map((n) => {
    if (n.type === "opening") {
      return () => <OpeningSlide text={n.text} />;
    }

    if (n.type === "genre") {
      return () => (
        <GenreSlide
          headline={n.text}
          topGenre="Drama"
          percentage={42}
          genres={[
            { label: "Drama", value: 42 },
            { label: "Thriller", value: 18 },
            { label: "Romance", value: 14 },
            { label: "Crime", value: 11 },
            { label: "Indie", value: 9 },
          ]}
        />
      );
    }

    if (n.type === "time") {
      return () => (
        <TimeSlide
          stats={{
            total_hours: 312,
            total_minutes: 18720,
            average_runtime: 98,
          }}
        />
      );
    }

    // fallback (closing slide for now)
    return () => (
      <h1 style={{ fontSize: "3rem", textAlign: "center" }}>
        {n.text}
      </h1>
    );
  });

  const [index, setIndex] = useState(0);

  const next = () => setIndex((i) => Math.min(i + 1, slides.length - 1));
  const prev = () => setIndex((i) => Math.max(i - 1, 0));

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") next();
      if (e.key === "ArrowLeft") prev();
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [slides.length]);

  const CurrentSlide = slides[index];

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "#111",
        color: "white",
      }}
    >
      <AnimatePresence mode="wait">
        <Slide key={index}>
          <CurrentSlide />
        </Slide>
      </AnimatePresence>

      <SlideNav
        current={index}
        total={slides.length}
        onNext={next}
        onPrev={prev}
      />
    </div>
  );
}
