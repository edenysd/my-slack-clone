import { useEffect } from "react";
import { Outlet } from "react-router";
import { useNavigate } from "react-router-dom";
import ChatLayout from "../layouts/ChatLayout";
import useUserStore from "../store/userStore";

const ChatPage = () => {
  const userStore = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userStore.currentUser.firstName) {
      navigate("/register");
    }
  });

  return (
    <ChatLayout>
      <Outlet />
    </ChatLayout>
  );
};

export default ChatPage;
