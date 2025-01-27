import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";
import { SearchViewProvider } from "./contexts/SearchViewContext";
import router from "./router/router";
import "./scss/index.scss";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CartProvider>
      <SearchViewProvider>
        <RouterProvider router={router} />
      </SearchViewProvider>
    </CartProvider>
  </StrictMode>,
);
