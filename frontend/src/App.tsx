import "./App.css";
import React, { useState } from "react";
import { AudioRecorder } from "./components/AudioRecorder";
import { Onboarding } from "./components/Onboarding";

function App() {
  const [transcription, setTranscription] = useState("");

  return (
    <div>
      <AudioRecorder
        transcription={transcription}
        setTranscription={setTranscription}
      />
      <Onboarding />
    </div>
  );
}

export default App;
