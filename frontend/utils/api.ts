import { WrappedResponse, Stats } from "../types/wrapped";
import { buildNarratives } from "./narrativeSelect";

export async function uploadZip(file: File): Promise<WrappedResponse> {
  const form = new FormData();
  form.append("file", file);

  const res = await fetch("http://127.0.0.1:8000/upload", {
    method: "POST",
    body: form,
  });

  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`Upload failed: ${detail || res.statusText}`);
  }

  const stats = (await res.json()) as Stats;
  return {
    stats,
    narratives: buildNarratives(stats),
  };
}
