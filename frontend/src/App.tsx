import "./App.css";
import { useState, useEffect, useRef } from "react";
import { AudioRecorder } from "./components/AudioRecorder";
function App() {
  const [fullRecording, setFullRecording] = useState("");
  const [transcriptionToSend, setTranscriptionToSend] = useState("");
  // const lastChangeTime = useRef(Date.now());

  useEffect(() => {
    // API call to openAI
    console.log("transcriptionToSend", transcriptionToSend);
    setTranscriptionToSend("");
  }, [fullRecording]);

  return (
    <>
      <AudioRecorder
        setFullRecording={setFullRecording}
        transcriptionToSend={transcriptionToSend}
        setTranscriptionToSend={setTranscriptionToSend}
      />
    </>
  );
}

export default App;
