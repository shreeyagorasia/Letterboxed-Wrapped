import { motion } from "framer-motion";
import { ReactNode } from "react";

export type SlideVariant =
  | "fadeUp"
  | "slideLeft"
  | "scalePop"
  | "wipe"
  | "float";

const VARIANTS = {
  fadeUp: {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  },

  slideLeft: {
    initial: { opacity: 0, x: 80 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -60 },
  },

  scalePop: {
    initial: { opacity: 0, scale: 0.92 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.96 },
  },

  wipe: {
    initial: { clipPath: "inset(0 0 100% 0)" },
    animate: { clipPath: "inset(0 0 0% 0)" },
    exit: { clipPath: "inset(100% 0 0 0)" },
  },

  float: {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: [0, -6, 0],
    },
    exit: { opacity: 0, y: -10 },
  },
};

type Props = {
  children: ReactNode;
  variant?: SlideVariant;
};

export default function AnimatedSlide({
  children,
  variant = "fadeUp",
}: Props) {
  const v = VARIANTS[variant];

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={v}
      transition={{
        duration: 0.7,
        ease: "easeOut",
      }}
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      {children}
    </motion.div>
  );
}
