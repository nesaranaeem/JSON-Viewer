import { I18n } from "i18n-js";
import en from "../locales/en.json";
import de from "../locales/de.json";
import bn from "../locales/bn.json";

// Create a single I18n instance
const i18n = new I18n({
  en,
  de,
  bn,
});

// Configure the instance
i18n.fallbacks = true;
i18n.defaultLocale = "en";

export const setLocale = (locale) => {
  if (!locale || typeof locale !== "string") {
    console.warn('Invalid locale provided to setLocale; using default "en"');
    locale = "en";
  }
  i18n.locale = locale;
  if (typeof window !== "undefined") {
    localStorage.setItem("language", locale);
  }
};

export const getLocale = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("language") || "en";
  }
  return "en"; // Default during SSR, ensuring a string is always returned
};

// Initialize locale from storage or default, ensuring a string is returned
export const initializeLocale = () => {
  const savedLang = getLocale();
  if (!savedLang || typeof savedLang !== "string") {
    console.warn('Invalid saved locale; defaulting to "en"');
    i18n.locale = "en";
    return "en";
  }
  i18n.locale = savedLang;
  return savedLang;
};

export default i18n;
