type Props = {
  stats: {
    items_in_watchlist: number;
  };
};

function getWatchlistJoke(count: number): string {
  if (count === 0) return "You’ve actually finished your watchlist. Respect.";
  if (count < 10) return "Almost there. A strong finish is in sight.";
  if (count < 50) return "A healthy amount of ambition.";
  return "This is a lifestyle choice now.";
}

export default function WatchlistSlide({ stats }: Props) {
  const count = stats.items_in_watchlist;
  const joke = getWatchlistJoke(count);

  return (
    <div
      style={{
        textAlign: "center",
        maxWidth: 760,
        position: "relative",
      }}
    >
      {/* Green streaks background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          zIndex: 0,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "18%",
            left: "-30%",
            width: "160%",
            height: 140,
            background: "linear-gradient(90deg, transparent, #00B021, transparent)",
            opacity: 0.25,
            transform: "rotate(-6deg)",
            animation: "slide 6s linear infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "58%",
            left: "-40%",
            width: "180%",
            height: 100,
            background: "linear-gradient(90deg, transparent, #00B021, transparent)",
            opacity: 0.18,
            transform: "rotate(4deg)",
            animation: "slide 8s linear infinite reverse",
          }}
        />
      </div>

      {/* Card */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          background: "white",
          borderRadius: 32,
          padding: "4rem 3.5rem",
          boxShadow: "0 40px 80px rgba(0,0,0,0.25)",
        }}
      >
        {/* Headline */}
        <h2
          style={{
            opacity: 0.7,
            marginBottom: "2.5rem",
            color: "#111",
            fontSize: "1.9rem",
          }}
        >
          Still on your watchlist
        </h2>

        {/* Big number */}
        <div
          style={{
            fontSize: "6rem",
            fontWeight: 900,
            color: "#F27405", // Letterboxd orange
            lineHeight: 1,
            marginBottom: "0.8rem",
          }}
        >
          {count}
        </div>

        <p
          style={{
            fontSize: "1.6rem",
            fontWeight: 500,
            color: "#111",
            marginBottom: "3rem",
          }}
        >
          movies waiting to be watched
        </p>

        {/* Joke */}
        <p
          style={{
            fontSize: "1.5rem",
            fontWeight: 700,
            color: "#00B021", // Letterboxd green
            letterSpacing: "0.02em",
          }}
        >
          {joke}
        </p>
      </div>

      {/* Keyframes */}
      <style>
        {`
          @keyframes slide {
            0% { transform: translateX(0) rotate(-6deg); }
            100% { transform: translateX(40%) rotate(-6deg); }
          }
        `}
      </style>
    </div>
  );
}
