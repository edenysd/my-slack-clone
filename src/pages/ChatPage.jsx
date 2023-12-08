import { useEffect } from "react";
import { Outlet } from "react-router";
import { useNavigate } from "react-router-dom";
import ChatLayout from "../layouts/ChatLayout";
import useUserStore from "../store/userStore";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";

const localTheme = createTheme({
  palette: {
    mode: "light",
  },
});

const ChatPage = () => {
  const userStore = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userStore.currentUser) {
      navigate("/register");
    }
  });

  return (
    <ChatLayout>
      <ThemeProvider theme={localTheme}>
        {userStore.currentUser ? <Outlet /> : null}
      </ThemeProvider>
    </ChatLayout>
  );
};

export default ChatPage;
