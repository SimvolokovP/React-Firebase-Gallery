import { useState } from "react";
import ProgressBar from "./ProgressBar";
import useStorage from "../hooks/useStorage";

export default function UploadForm() {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  const { url, progress, startUpload, isUploading } = useStorage();

  const types = ["image/jpeg", "image/png"];

  function handleChange(e) {
    const selected = e.target.files[0];

    if (selected && types.includes(selected.type)) {
      setFile(selected);
      setError("");
      startUpload(selected);
    } else {
      setFile(null);
      setError("Error! Select file jpg/png!");
    }
  }

  return (
    <form>
      <label>
        <input disabled={ isUploading } type="file" onChange={(e) => handleChange(e)} />
        <span>+</span>
      </label>
      <div className="output">
        {error && <div className="error">{error}</div>}
        {file && <div>{file.name}</div>}
        {file && <ProgressBar progress={progress} />}
        {progress === 100 && <div>file is upload!</div>}
      </div>
    </form>
  );
}
