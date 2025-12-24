import { useState, DragEvent } from "react";
import UploadCard from "./UploadCard";

type Props = {
  onUpload: (file: File) => void;
  onUseDemo?: () => void;
};

export default function Dropzone({ onUpload, onUseDemo }: Props) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFiles = (files: FileList | File[] | null) => {
    if (!files || (files as FileList | File[]).length === 0) return;
    const first = Array.from(files as FileList | File[])[0];

    if (!first.name.toLowerCase().endsWith(".zip")) {
      setError("Please upload the Letterboxd .zip export file.");
      return;
    }

    setError(null);
    onUpload(first);
  };

  const onDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => setIsDragging(false);

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  return (
    <div
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
      }}
    >
      <UploadCard
        isDragging={isDragging}
        error={error}
        onFileSelected={(file) => handleFiles(file ? [file] : null)}
        onUseDemo={onUseDemo}
      />
    </div>
  );
}
