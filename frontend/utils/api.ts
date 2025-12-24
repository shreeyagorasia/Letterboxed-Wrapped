export async function uploadZip(file: File) {
  const form = new FormData();
  form.append("file", file);

  const res = await fetch("http://127.0.0.1:8000/upload", {
    method: "POST",
    body: form,
  });

  if (!res.ok) throw new Error("Upload failed");
  return res.json();
}
