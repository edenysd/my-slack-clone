import { RouterProvider } from "react-router";
import router from "./router/router";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";

const defaultTheme = createTheme();

function App() {
  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  );
}

export default App;
