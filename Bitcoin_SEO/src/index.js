import React from "react";
import { hydrateRoot, createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const rootElement = document.getElementById("root");

// 🔑 Shared helmet context
const helmetContext = {};

const app = (
  <React.StrictMode>
    <HelmetProvider context={helmetContext}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);

// ✅ Check if we have SSR content
const hasSSRContent =
  rootElement.hasChildNodes() && rootElement.children.length > 0;

console.log("SSR Content detected:", hasSSRContent);
console.log("Initial Data:", window.__INITIAL_DATA__);

if (hasSSRContent) {
  console.log("🔄 Hydrating SSR content");
  hydrateRoot(rootElement, app);
} else {
  console.log("🎨 Rendering client-side only");
  const root = createRoot(rootElement);
  root.render(app);
}

reportWebVitals();
