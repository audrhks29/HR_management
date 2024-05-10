/** @jsxImportSource @emotion/react */

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Global } from "@emotion/react";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import reset from "emotion-reset";
import { ColorModeContext } from "./provider/ColorMode";

import Header from "./layout/Header";
import Home from "./pages/Home";
import Introduce from "./pages/Introduce";
import Download from "./pages/Download";
import "../src/index.css";

function App() {
  const [mode, setMode] = React.useState<"light" | "dark">("light");
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <Global styles={reset} />
        <CssBaseline />

        <BrowserRouter>
          <Header />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/introduce" element={<Introduce />} />
            <Route path="/download" element={<Download />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
