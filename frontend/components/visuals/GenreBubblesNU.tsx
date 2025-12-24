import { motion } from "framer-motion";

type Bubble = {
  label: string;
  value: number;
};

const GENRE_COLOURS = [
  "#F27405", // orange
  "#00B021", // green
  "#4DA3FF", // blue
  "#F6B04C", // mustard
  "#8A9AAE", // grey-blue
];

function getBubblePosition(index: number) {
  const baseY = 30; // starting height %
  const stepY = 16; // vertical spacing %
  const y = baseY + index * stepY;

  const x =
    index === 0
      ? "50%" // biggest → centre
      : index % 2 === 1
      ? "62%" // odd → right
      : "38%"; // even → left

  return { x, y: `${y}%` };
}

export default function GenreBubbles({
  bubbles,
}: {
  bubbles: Bubble[];
}) {
  const sorted = [...bubbles].sort((a, b) => b.value - a.value);
  const max = sorted[0]?.value ?? 1;

  return (
    <div
      style={{
        position: "relative",
        width: 720,
        height: 680,
        margin: "0 auto",
      }}
    >
      {sorted.map((b, i) => {
        const size = 120 + (b.value / max) * 240;
        const colour = GENRE_COLOURS[i % GENRE_COLOURS.length];
        const pos = getBubblePosition(i);

        return (
          <motion.div
            key={b.label}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: i * 0.12, duration: 0.6 }}
            style={{
              position: "absolute",
              left: pos.x,
              top: pos.y,
              width: size,
              height: size,
              transform: "translate(-50%, -50%)",
              borderRadius: "50%",
              background: colour,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 18px 45px rgba(0,0,0,0.35)",
            }}
          >
            <div
              style={{
                color: "#14171C",
                textAlign: "center",
                fontWeight: 700,
              }}
            >
              <div style={{ fontSize: "1.2rem" }}>{b.label}</div>
              <div style={{ fontSize: "1rem", opacity: 0.85 }}>
                {b.value}%
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
