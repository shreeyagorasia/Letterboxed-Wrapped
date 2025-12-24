import { useState } from "react";
import Dropzone from "../components/upload/Dropzone";
import WrappedPlayer from "../components/wrapped/WrappedPlayer";
import { uploadZip } from "../utils/api";
import type { Stats } from "../types/wrapped";

export default function HomePage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = async (file: File) => {
    try {
      const stats = await uploadZip(file);
      console.log("STATS FROM BACKEND:", stats);
      setStats(stats);
    } catch (err: any) {
      setError(err.message || "Load failed");
    }
  };

  if (stats) {
    return <WrappedPlayer stats={stats} />;
  }

  return (
    <>
      <Dropzone onUpload={handleUpload} />
      {error && (
        <p style={{ color: "hotpink", textAlign: "center" }}>
          {error}
        </p>
      )}
    </>
  );
}
