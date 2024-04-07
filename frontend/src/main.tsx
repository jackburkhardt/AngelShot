// import React from "react";
import ReactDOM from "react-dom/client";
// import { BrowserRouter as Router } from 'react-router-dom';
import App from "./App.tsx";
import "./index.css";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  //<React.StrictMode>
  <MantineProvider theme={{ primaryColor: "cyan", primaryShade: 3 }}>
    <App />
  </MantineProvider>
  //</React.StrictMode>
);
