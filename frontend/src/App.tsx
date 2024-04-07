import "./App.css";
import { useState, useEffect } from "react";
import { AudioRecorder } from "./components/AudioRecorder";
import { Onboarding } from "./components/Onboarding";
import { ModelHookChat } from "./components/ModelHook";
import { Call } from "./components/Call";
import { Button, Anchor } from "@mantine/core";

function App() {
  const [fullRecording, setFullRecording] = useState("");
  const [transcriptionToSend, setTranscriptionToSend] = useState("");
  const [process, setProcess] = useState("onboarding");
  // const lastChangeTime = useRef(Date.now());

  useEffect(() => {
    // API call to openAI
    console.log("transcriptionToSend", transcriptionToSend);
    setTranscriptionToSend("");
  }, [fullRecording]);

  return (
    <main>
      <div style={{ height: "100%" }}>
        {
          {
            onboarding: <Onboarding setProcess={setProcess} />,
            call: <Call />,
          }[process]
        }
        {/* <Call /> */}
      </div>
      <footer>
        <Anchor href="tel:911" underline="never" c="white">
          <Button color="red">SOS</Button>
        </Anchor>
      </footer>
    </main>
  );
}

export default App;
