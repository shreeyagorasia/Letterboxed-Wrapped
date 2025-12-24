import { motion } from "framer-motion";

type Props = {
  high: number;
  mid: number;
  low: number;
};

export default function RatingBlocks({ high, mid, low }: Props) {
  const blocks = [
    { label: "4.5–5★", value: high, color: "#00B021" },   // green
    { label: "2.5–4★", value: mid, color: "#4DA3FF" },   // blue
    { label: "1–2★", value: low, color: "#F27405" },     // orange
  ];

  return (
    <div
      style={{
        display: "flex",
        gap: "1.5rem",
        justifyContent: "center",
        marginTop: "2.5rem",
      }}
    >
      {blocks.map((b, i) => (
        <motion.div
          key={b.label}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: i * 0.15, duration: 0.6 }}
          style={{
            width: 180,
            height: 140,
            borderRadius: 20,
            background: b.color,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 18px 40px rgba(0,0,0,0.35)",
          }}
        >
          <div style={{ fontSize: "2.2rem", fontWeight: 800, color: "#14171C" }}>
            {b.value}%
          </div>
          <div style={{ fontSize: "1rem", fontWeight: 600, opacity: 0.9 }}>
            {b.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
