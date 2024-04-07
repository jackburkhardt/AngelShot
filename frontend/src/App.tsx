import "./App.css";
import React, { useState } from "react";
import { AudioRecorder } from "./components/AudioRecorder";
import { Onboarding } from "./components/Onboarding";
function App() {
  const [transcription, setTranscription] = useState("");

  return (
    <>
      <AudioRecorder
        transcription={transcription}
        setTranscription={setTranscription}
      />
      <Onboarding/>
    </>
  );
}

export default App;
