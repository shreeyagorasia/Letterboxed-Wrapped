import { useState } from "react";
import Dropzone from "../components/upload/Dropzone";
import WrappedPlayer from "../components/player/WrappedPlayer";

export default function HomePage() {
  const [file, setFile] = useState<File | null>(null);
  const [demo, setDemo] = useState(false);

  if (file || demo) {
    return <WrappedPlayer file={file} demo={demo} />;
  }

  return (
    <Dropzone
      onUpload={setFile}
      onUseDemo={() => setDemo(true)}
    />
  );
}