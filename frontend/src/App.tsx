import "./App.css";
import { useState } from "react";
import { Onboarding } from "./components/Onboarding";
import { Call } from "./components/Call";
import { Button, Anchor } from "@mantine/core";

function App() {
  const [what, setWhat] = useState("");
  const [who, setWho] = useState("");
  const [gender, setGender] = useState("");
  const [process, setProcess] = useState("onboarding");
  // const lastChangeTime = useRef(Date.now());

  return (
    <main>
      <div style={{ height: "100%" }}>
        {
          {
            onboarding: (
              <Onboarding
                setProcess={setProcess}
                what={what}
                who={who}
                gender={gender}
                setWhat={setWhat}
                setWho={setWho}
                setGender={setGender}
              />
            ),
            call: <Call what={what} who={who} gender={gender} />,
          }[process]
        }
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
