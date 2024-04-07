// import React from "react";
import ReactDOM from "react-dom/client";
// import { BrowserRouter as Router } from 'react-router-dom';
import App from "./App.tsx";
import "./index.css";
import { createTheme, MantineProvider } from "@mantine/core";
import '@mantine/core/styles.css';

const theme = createTheme({
  autoContrast: true,
  luminanceThreshold: 0.31,
  colors: {
    myColor: [
      '#deffff',
      '#cafeff',
      '#99fbff',
      '#64f8ff',
      '#3df6fe',
      '#26f5fe',
      '#05F4F5',
      '#00d9e4',
      '#00c2ca',
      '#00a8b0'
    ]
  },
  primaryColor: 'myColor',
  primaryShade: 7,
});


ReactDOM.createRoot(document.getElementById("root")!).render(
  //<React.StrictMode>
    <MantineProvider theme={theme}>
      <App />
    </MantineProvider>
  //</React.StrictMode>
);