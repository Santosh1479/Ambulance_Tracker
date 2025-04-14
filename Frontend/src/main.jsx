import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { DriverProvider } from "./context/DriverContext.jsx";

createRoot(document.getElementById("root")).render(
  <DriverProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </DriverProvider>
);
