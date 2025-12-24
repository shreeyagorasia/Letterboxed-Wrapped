import { Stats } from "../types/wrapped";

export async function uploadZip(file: File): Promise<Stats> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("http://127.0.0.1:8000/upload", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const detail = await res.text();
    throw new Error(detail || "Upload failed");
  }

  return res.json();
}
