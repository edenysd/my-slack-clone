import { Navigate, createBrowserRouter } from "react-router-dom";
import ChatPage from "../pages/ChatPage";
import RegisterPage from "../pages/RegisterPage";
import Page404 from "../pages/Page404";

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
        path: "channel/:id",
        // TODO: create element
        element: null,
      },
      {
        path: "user/:id",
        // TODO: create element
        element: null,
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
