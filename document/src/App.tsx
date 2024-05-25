/** @jsxImportSource @emotion/react */

import React, { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

import { ColorModeContext } from "./provider/ColorMode";

import Header from "./layout/Header";

const Home = lazy(() => import("./pages/Home"));
const Introduce = lazy(() => import("./pages/Introduce"));
const Download = lazy(() => import("./pages/Download"));

import NotFound from "./NotFound";
import { HelmetProvider } from "react-helmet-async";

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
          element: (
            <Suspense fallback={<p>로딩중</p>}>
              <Home />
            </Suspense>
          ),
        },
        {
          path: "introduce",
          children: [
            {
              index: true,
              element: (
                <Suspense fallback={<p>로딩중</p>}>
                  <Introduce />
                </Suspense>
              ),
            },
          ],
        },
        {
          path: "download",
          children: [
            {
              index: true,
              element: (
                <Suspense fallback={<p>로딩중</p>}>
                  <Download />
                </Suspense>
              ),
            },
          ],
        },
      ],
    },
  ]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <HelmetProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <RouterProvider router={router} />
        </ThemeProvider>
      </HelmetProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
