import { useState } from "react";
import WrappedPlayer from "../components/wrapped/WrappedPlayer";
import Dropzone from "../components/upload/Dropzone";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [useDemo, setUseDemo] = useState(false);

  return (
    <div style={{ background: "#0b0b0f", minHeight: "100vh" }}>
      {!file && !useDemo && (
        <Dropzone
          onUpload={setFile}
          onUseDemo={() => {
            setUseDemo(true);
            setFile(null);
          }}
        />
      )}

      {(file || useDemo) && <WrappedPlayer file={file} demo={useDemo} />}
    </div>
  );
}
