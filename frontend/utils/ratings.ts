type RatingBuckets = {
  high: number;   // %
  mid: number;    // %
  low: number;    // %
};

export function bucketRatings(ratings: number[]): RatingBuckets {
  const total = ratings.length;
  if (total === 0) return { high: 0, mid: 0, low: 0 };

  let high = 0;
  let mid = 0;
  let low = 0;

  ratings.forEach((r) => {
    if (r >= 4.5) high++;
    else if (r <= 2) low++;
    else mid++;
  });

  return {
    high: Math.round((high / total) * 100),
    mid: Math.round((mid / total) * 100),
    low: Math.round((low / total) * 100),
  };
}