import { createBrowserRouter } from "react-router-dom";
import MainPage from "./routes/MainPage";
import ErrorPage from "./routes/ErrorPage";
import HomePage from "./routes/HomePage";
import CartPage from "./routes/CartPage";
import SearchPage from "./routes/SearchPage";
import MoviePage from "./routes/MoviePage";

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
      {
        path: "/search/:query/:page",
        element: <SearchPage type="search" />,
      },
      {
        path: "/genre/:query/:page",
        element: <SearchPage type="genre" />,
      },
      {
        path: "/movie/:id",
        element: <MoviePage />,
      },
    ],
  },
]);

export default router;
