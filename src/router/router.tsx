import { createBrowserRouter } from "react-router-dom";
import MainPage from "./routes/MainPage";
import ErrorPage from "./routes/ErrorPage";
import HomePage from "./routes/HomePage";
import CartPage from "./routes/CartPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
    ],
  },
]);

export default router;
