import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";

// Translation files
import enCommon from "./locales/en/common.json";
import enMenu from "./locales/en/menu.json";
import viCommon from "./locales/vi/common.json";
import viMenu from "./locales/vi/menu.json";
const resources = {
  en: {
    common: enCommon,
    menu: enMenu,
  },
  vi: {
    common: viCommon,
    menu: viMenu,
  },
};

i18n
  // Load translation using http backend
  .use(Backend)
  // Detect user language
  .use(LanguageDetector)
  // Pass the i18n instance to react-i18next
  .use(initReactI18next)
  // Initialize i18next
  .init({
    resources,
    fallbackLng: "en",
    // debug: process.env.NODE_ENV === 'development',

    // Common namespace used if not specified
    defaultNS: "common",
    ns: ["common", "menu"],

    interpolation: {
      escapeValue: false, // React already does escaping
    },

    // Language detector options
    detection: {
      order: ["localStorage", "navigator", "htmlTag"],
      caches: ["localStorage"],
    },

    // Backend options (if loading from server)
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
    },
  });

export default i18n;
