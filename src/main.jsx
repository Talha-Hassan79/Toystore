import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Toaster } from "react-hot-toast";
import { CartProvider } from "./context/CartContext";
import { SearchProvider } from "./context/SearchContext";
import { AuthProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
        <SearchProvider>
          <App />
          <Toaster position="top-right" />
        </SearchProvider>
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>
);