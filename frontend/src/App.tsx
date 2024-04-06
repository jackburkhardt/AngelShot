import "./App.css";
import React, { useState } from "react";
import { AudioRecorder } from "./components/AudioRecorder";
function App() {
  const [transcription, setTranscription] = useState("");

  return (
    <>
      <AudioRecorder
        transcription={transcription}
        setTranscription={setTranscription}
      />
    </>
  );
}

export default App;
