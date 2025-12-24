import { motion } from "framer-motion";

type Genre = {
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

export default function GenreStack({ genres }: { genres: Genre[] }) {
  if (!genres || genres.length === 0) return null;

  const max = Math.max(...genres.map(g => g.value));

  return (
    <div style={{ width: "100%", maxWidth: 760, margin: "0 auto" }}>
      {genres.map((g, i) => {
        const width = (g.value / max) * 100;
        const colour = GENRE_COLOURS[i % GENRE_COLOURS.length];

        return (
          <div
            key={g.label}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "1.4rem",
              gap: "1.2rem",
            }}
          >
            {/* LEFT LABEL */}
            <div
              style={{
                width: 110,
                color: "white",
                fontSize: "1.1rem",
                fontWeight: 600,
                textAlign: "right",
                opacity: 0.9,
                flexShrink: 0,
              }}
            >
              {g.label}
            </div>

            {/* BAR */}
            <div style={{ flex: 1 }}>
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: `${width}%`, opacity: 1 }}
                transition={{ type: "spring", stiffness: 80, damping: 18, delay: i * 0.1 }}
                style={{
                  height: 52,
                  background: colour,
                  borderRadius: 16,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  paddingRight: "1rem",
                  boxShadow: "0 12px 30px rgba(0,0,0,0.35)",
                }}
              >
                {/* PERCENTAGE */}
                <span
                  style={{
                    fontWeight: 700,
                    fontSize: "1.05rem",
                    color: "#14171C",
                  }}
                >
                  {g.value}%
                </span>
              </motion.div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
