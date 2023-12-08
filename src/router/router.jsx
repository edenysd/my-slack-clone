import { Navigate, createBrowserRouter } from "react-router-dom";
import ChatPage from "../pages/ChatPage";
import RegisterPage from "../pages/RegisterPage";
import Page404 from "../pages/Page404";
import HelloSection from "../sections/HelloSection/HelloSection";
import UserChatSection from "../sections/UserChatSection/UserChatSection";
import ChannelChatSection from "../sections/ChannelChatSection/ChannelChatSection";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/register" replace={true} />,
  },
  {
    path: "/app",
    element: <ChatPage />,
    children: [
      {
        path: "channel/:channelId",
        element: <ChannelChatSection />,
      },
      {
        path: "private/:userId",
        element: <UserChatSection />,
      },
      {
        path: "",
        element: <HelloSection />,
      },
    ],
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "*",
    element: <Page404 />,
  },
]);

export default router;
