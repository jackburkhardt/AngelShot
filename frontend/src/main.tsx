import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from 'react-router-dom';
import App from "./App.tsx";
import "./index.css";
import { MantineProvider } from "@mantine/core";
import '@mantine/core/styles.css';


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <MantineProvider theme={{ primaryColor: "green" }}>
        <App />
      </MantineProvider>
    </Router>
  </React.StrictMode>
);
