import { RouterProvider } from "react-router";
import router from "./router/router";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "#956ee1",
      dark: "#541554",
      contrastText: "#fff",
    },
    mode: "dark",
  },
});

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
