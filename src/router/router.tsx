import { createBrowserRouter } from "react-router-dom";
import MainPage from "./routes/MainPage";
import ErrorPage from "./routes/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
    errorElement: <ErrorPage />,
  },
]);

export default router;
