// import { useEffect, useMemo, useState } from "react";
// import type { ReactElement } from "react";
// import { AnimatePresence } from "framer-motion";

// import Slide from "./Slide";
// import SlideNav from "./SlideNav";

// import OpeningSlide from "../slides/OpeningSlide";
// import GenreSlide from "../slides/GenreSlide";
// import TimeSlide from "../slides/TimeSlide";
// import RatingSlide from "../slides/RatingSlide";
// import RewatchSlide from "../slides/RewatchSlide";
// import PeakNightSlide from "../slides/PeakNightSlide";
// import LoadingSlide from "../slides/LoadingSlide";

// import { uploadZip } from "../../utils/api";

// import type { Narrative, Stats, WrappedResponse } from "../../types/wrapped";
// import type { RewatchResult } from "../../utils/rewatches";


// /* ---------------------------
//    PROPS
// ---------------------------- */

// type Props = {
//   file: File | null;
//   demo: boolean;
// };

// /* ---------------------------
//    COMPONENT
// ---------------------------- */

// export default function WrappedPlayer({ file, demo }: Props) {
//   const [data, setData] = useState<WrappedResponse | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [index, setIndex] = useState(0);

//   /* ---------------------------
//      MOCK DATA (DEMO MODE)
//      Safe to delete later
//   ---------------------------- */

//   const mockStats: Stats = {
//     genre_identity: {
//       top_genre: "Drama",
//       top_genres: {
//         Drama: 42,
//         Thriller: 18,
//         Romance: 14,
//         Crime: 11,
//         Indie: 9,
//       },
//       top_genre_percentage: 42,
//     },
//     runtime: {
//       total_minutes: 18720,
//       total_hours: 312,
//       average_runtime: 98,
//     },
//     rating_personality: {
//       average_rating: 3.9,
//       high_rating_percentage: 52,
//       persona: "Generous rater",
//       distribution: {},
//     },
//   } as any;

//   const mockRewatchData: RewatchResult = {
//     category: "comfort",
//     headline: "Did you go back for seconds?",
//     title: "Comfort Watcher",
//     subline: "Some films felt like home.",
//     films: [
//       { title: "Before Sunrise", count: 3 },
//       { title: "Whiplash", count: 2 },
//       { title: "La La Land", count: 2 },
//     ],
//   };

//   const mockPeakNight = {
//     date: "Saturday, Nov 16",
//     count: 3,
//   };

//   /* ---------------------------
//      LOAD DATA
//   ---------------------------- */

//   useEffect(() => {
//     setIndex(0);
//     setError(null);

//     if (demo) {
//       setData({
//         stats: mockStats,
//         narratives: [],
//       });
//       return;
//     }

//     if (!file) return;

//     setLoading(true);

//     uploadZip(file)
//       .then((res) => setData(res))
//       .catch((err) => setError(err.message))
//       .finally(() => setLoading(false));
//   }, [file, demo]);

//   /* ---------------------------
//      BUILD SLIDES
//   ---------------------------- */

//   const slides: Array<() => ReactElement> = useMemo(() => {
//     if (!data) return [];

//     const stats = data.stats;

//     const narratives: Narrative[] = [
//       { type: "opening", text: "This was your year on Letterboxd." },
//       { type: "genre", text: "What kind of movie person were you this year?" },
//       { type: "time", text: "Time well spent" },
//       { type: "rewatch", text: "" },
//       { type: "ratings", text: "How tough were you on your ratings?" },
//       { type: "peak-night", text: "" },
//       { type: "closing", text: "That’s a wrap." },
//     ];

//     return narratives.map((n) => {
//       if (n.type === "opening") {
//         return () => <OpeningSlide text={n.text} />;
//       }

//       // REAL GENRE SLIDE
//       if (n.type === "genre" && stats.genre_identity?.top_genre) {
//         const g = stats.genre_identity;

//         return () => (
//           <GenreSlide
//             headline="What kind of movie person were you this year?"
//             topGenre={g.top_genre}
//             percentage={g.top_genre_percentage ?? 0}
//             genres={
//               g.top_genres
//                 ? Object.entries(g.top_genres).map(([label, value]) => ({
//                     label,
//                     value,
//                   }))
//                 : []
//             }
//           />
//         );
//       }


//       if (n.type === "time" && stats.runtime) {
//         return () => <TimeSlide stats={stats.runtime} />;
//       }

//       if (n.type === "rewatch") {
//         return () => <RewatchSlide data={mockRewatchData} />;
//       }

//       if (n.type === "ratings" && stats.rating_personality) {
//         return () => (
//           <RatingSlide
//             buckets={{
//               high: stats.rating_personality.high_rating_percentage ?? 0,
//               mid: 100 - (stats.rating_personality.high_rating_percentage ?? 0),
//               low: 0,
//             }}
//           />
//         );
//       }

//       if (n.type === "peak-night") {
//         return () => <PeakNightSlide data={mockPeakNight} />;
//       }

//       return () => (
//         <h1 style={{ fontSize: "3rem", textAlign: "center" }}>
//           {n.text}
//         </h1>
//       );
//     });
//   }, [data]);

//   /* ---------------------------
//      KEYBOARD NAV
//   ---------------------------- */

//   useEffect(() => {
//     const onKey = (e: KeyboardEvent) => {
//       if (e.key === "ArrowRight" || e.key === " ") {
//         setIndex((i) => Math.min(i + 1, slides.length - 1));
//       }
//       if (e.key === "ArrowLeft") {
//         setIndex((i) => Math.max(i - 1, 0));
//       }
//     };

//     window.addEventListener("keydown", onKey);
//     return () => window.removeEventListener("keydown", onKey);
//   }, [slides.length]);

//   /* ---------------------------
//      RENDER
//   ---------------------------- */

//   const CurrentSlide = slides[index];

//   return (
//     <div
//       style={{
//         width: "100vw",
//         height: "100vh",
//         background: "#111",
//         color: "white",
//         overflow: "hidden",
//       }}
//     >
//       <AnimatePresence mode="wait">
//         <Slide key={index}>
//           {loading && <LoadingSlide />}
//           {error && <div style={{ color: "#ff7b9c" }}>{error}</div>}
//           {!loading && data && CurrentSlide && <CurrentSlide />}
//         </Slide>
//       </AnimatePresence>

//       {slides.length > 1 && (
//         <SlideNav
//           current={index}
//           total={slides.length}
//           onNext={() => setIndex((i) => Math.min(i + 1, slides.length - 1))}
//           onPrev={() => setIndex((i) => Math.max(i - 1, 0))}
//         />
//       )}
//     </div>
//   );
// }

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
