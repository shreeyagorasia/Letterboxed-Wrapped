import { useEffect, useMemo, useState } from "react";
import { AnimatePresence } from "framer-motion";

import Slide from "../wrapped/Slide";
import SlideNav from "../wrapped/SlideNav";
import SlideBackground from "../wrapped/SlideBackground";

import { buildSlides } from "../../utils/slideFactory";
import type { Stats } from "../../types/wrapped";

type Props = {
  stats: Stats;
};

export default function WrappedPlayer({ stats }: Props) {
  const slides = useMemo(() => buildSlides(stats), [stats]);
  const [index, setIndex] = useState(0);

  // 🔒 CRITICAL: reset when slides change
  useEffect(() => {
    setIndex(0);
  }, [slides.length]);

  const next = () =>
    setIndex((i) => Math.min(i + 1, slides.length - 1));
  const prev = () =>
    setIndex((i) => Math.max(i - 1, 0));

  if (slides.length === 0) {
    return (
      <div style={{ color: "white", padding: "2rem" }}>
        No slides to display.
      </div>
    );
  }

  const CurrentSlide = slides[index];

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        color: "white",
        overflow: "hidden",
      }}
    >
      <SlideBackground />

      <AnimatePresence mode="wait">
        <Slide key={index}>
          <CurrentSlide />
        </Slide>
      </AnimatePresence>

      {slides.length > 1 && (
        <SlideNav
          current={index}
          total={slides.length}
          onNext={next}
          onPrev={prev}
        />
      )}
    </div>
  );
}
