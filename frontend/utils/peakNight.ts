type DayCount = {
  date: string;
  count: number;
};

export function pickPeakNight(days: DayCount[]) {
  if (!days || days.length === 0) return null;

  const max = Math.max(...days.map(d => d.count));

  if (max < 3) return null; // gate condition

  const peakDays = days.filter(d => d.count === max);
  return peakDays[Math.floor(Math.random() * peakDays.length)];
}