export function formatNumber(n?: number | null) {
  if (n === undefined || n === null || Number.isNaN(n)) return "—";
  return n.toLocaleString();
}

export function formatPercentage(n?: number | null) {
  if (n === undefined || n === null || Number.isNaN(n)) return "—";
  return `${n}%`;
}
