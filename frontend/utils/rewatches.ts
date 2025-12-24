// utils/rewatches.ts

export type RewatchFilm = {
  title: string;
  count: number;
};

export type RewatchResult = {
  category: "explorer" | "selective" | "comfort";
  headline: string;
  title: string;
  subline: string;
  films: RewatchFilm[];
};

const VARIANTS = {
  explorer: [
    {
      title: "Explorer",
      subline: "Every watch was a new one.",
    },
    {
      title: "Always chasing something new",
      subline: "No rewatches this year.",
    },
    {
      title: "No looking back",
      subline: "You never hit replay.",
    },
  ],

  selective: [
    {
      title: "Selective Rewatcher",
      subline: "Only a few films earned a second viewing.",
    },
    {
      title: "Hard to rewatch",
      subline: "Most films were one-and-done.",
    },
  ],

  comfort: [
    {
      title: "Comfort Watcher",
      subline: "Some films felt like home.",
    },
    {
      title: "Back again",
      subline: "You returned to the films you loved.",
    },
    {
      title: "Repeat-worthy",
      subline: "A few favourites pulled you back in.",
    },
  ],
};

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function buildRewatchNarrative(
  watchCounts: Record<string, number>
): RewatchResult {
  const rewatched = Object.entries(watchCounts)
    .filter(([, count]) => count > 1)
    .map(([title, count]) => ({ title, count }))
    .sort((a, b) => b.count - a.count);

  if (rewatched.length === 0) {
    const v = pickRandom(VARIANTS.explorer);
    return {
      category: "explorer",
      headline: "Did you go back for seconds?",
      ...v,
      films: [],
    };
  }

  const category =
    rewatched.length >= 3 || rewatched[0].count >= 3
      ? "comfort"
      : "selective";

  const v = pickRandom(VARIANTS[category]);

  return {
    category,
    headline: "Did you go back for seconds?",
    ...v,
    films: rewatched.slice(0, 3),
  };
}
