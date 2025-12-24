import { useState } from "react";
import WrappedPlayer from "../components/wrapped/WrappedPlayer";
import Dropzone from "../components/upload/Dropzone";

export default function WrappedPage() {
  const [file, setFile] = useState<File | null>(null);

  return (
    <div style={{ minHeight: "100vh", background: "#0b0b0f" }}>
      {!file && <Dropzone onUpload={setFile} />}
      {file && <WrappedPlayer file={file} />}
    </div>
  );
}
