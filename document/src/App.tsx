/** @jsxImportSource @emotion/react */

import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

import { ColorModeContext } from "./provider/ColorMode";

import Header from "./layout/Header";

import Home from "./pages/Home";
import Introduce from "./pages/Introduce";
import Download from "./pages/Download";
import NotFound from "./NotFound";

function App() {
  const [mode, setMode] = React.useState<"light" | "dark">("light");

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode(prevMode => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    [],
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Header />,
      errorElement: <NotFound />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "introduce",
          children: [{ index: true, element: <Introduce /> }],
        },
        {
          path: "download",
          children: [{ index: true, element: <Download /> }],
        },
      ],
    },
  ]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />;
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
