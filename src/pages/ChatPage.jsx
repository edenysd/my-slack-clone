import { Outlet } from "react-router";
import ChatLayout from "../layouts/ChatLayout";

const ChatPage = () => {
  return (
    <ChatLayout>
      <Outlet />
    </ChatLayout>
  );
};

export default ChatPage;
