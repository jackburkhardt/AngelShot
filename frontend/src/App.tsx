import "./App.css";
import { useState, useEffect } from "react";
import { AudioRecorder } from "./components/AudioRecorder";
import { Onboarding } from "./components/Onboarding";
import { ModelHookChat } from "./components/ModelHook";
import { Call } from "./components/Call";

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
    <div style={{ height: "100%" }}>
      {/* {{
        "onboarding": <Onboarding setProcess={setProcess}/>,
        "call": <></>
      }[process]} */}
      <Call />
    </div>
  );
}

export default App;
