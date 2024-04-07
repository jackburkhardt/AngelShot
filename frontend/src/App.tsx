import "./App.css";
import { useState, useEffect } from "react";
import { AudioRecorder } from "./components/AudioRecorder";
import { Onboarding } from "./components/Onboarding";
import { ModelHookChat } from "./components/ModelHook";
import { Button, Anchor } from "@mantine/core";

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
    <main>
      <Onboarding />
      <footer>
        <Button color="red">
          <Anchor href="tel:911" underline="never" c="white">
            Call 911
          </Anchor>
        </Button>
      </footer>
    </main>
  );
}

export default App;
