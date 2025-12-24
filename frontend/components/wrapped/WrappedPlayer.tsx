import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Slide from "./Slide";
import SlideNav from "./SlideNav";

function Placeholder({ text }: { text: string }) {
  return <h1 style={{ fontSize: "3rem" }}>{text}</h1>;
}

export default function WrappedPlayer() {
  const slides = [
    () => <Placeholder text="Opening" />,
    () => <Placeholder text="Genre" />,
    () => <Placeholder text="Time" />,
    () => <Placeholder text="Ratings" />,
    () => <Placeholder text="Closing" />,
  ];

  const [index, setIndex] = useState(0);

  const next = () => setIndex(i => Math.min(i + 1, slides.length - 1));
  const prev = () => setIndex(i => Math.max(i - 1, 0));

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const CurrentSlide = slides[index];

  return (
    <div style={{ width: "100vw", height: "100vh", background: "#111", color: "white" }}>
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
