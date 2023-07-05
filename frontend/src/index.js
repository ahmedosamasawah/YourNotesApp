import "./index.css";
import "normalize.css";
// import "i18next";
import App from "./App";
import React from "react";
import ReactDOM from "react-dom/client";
import { AppProvider } from "./context/appContext";
import i18next from "i18next";
import translationEN from "./locale/en.json";
import translationAR from "./locale/ar.json";
import { I18nextProvider } from "react-i18next";

i18next.init({
  interpolation: { escapeValue: false },
  lng: "en",
  resources: {
    en: {
      global: translationEN,
    },
    ar: {
      global: translationAR,
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AppProvider>
      <I18nextProvider i18n={i18next}>
        <App />
      </I18nextProvider>
    </AppProvider>
  </React.StrictMode>
);
