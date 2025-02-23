import "../styles/globals.css";
import { useState, useEffect } from "react";
import i18n, { initializeLocale } from "../lib/i18n";

function MyApp({ Component, pageProps, initialLocale }) {
  const [locale, setLocale] = useState(initialLocale); // Track locale state for re-renders

  useEffect(() => {
    // Sync locale on client-side mount
    if (typeof window !== "undefined") {
      const savedLang = initializeLocale(); // Initialize from localStorage
      if (savedLang !== i18n.locale || savedLang !== locale) {
        i18n.locale = savedLang; // Ensure consistency
        setLocale(savedLang); // Force re-render if locale mismatches
      }
    }
  }, []);

  // Ensure translations are applied immediately based on state
  if (locale && typeof locale === "string") {
    i18n.locale = locale; // Sync i18n.locale with state before render
  } else {
    i18n.locale = "en"; // Fallback to English if locale is invalid
  }

  return <Component {...pageProps} />;
}

MyApp.getInitialProps = async ({ ctx }) => {
  // Run on both server and client before rendering
  const isClient = typeof window !== "undefined";
  let savedLang = "en"; // Default to English

  if (isClient) {
    savedLang = initializeLocale(); // Get from localStorage on client
  } else {
    // On server, default to 'en' or simulate fetching from a cookie/storage if needed
    savedLang = "en"; // Could be enhanced with cookies or headers if needed
  }

  if (!savedLang || typeof savedLang !== "string") {
    console.warn('Invalid initial locale; defaulting to "en"');
    savedLang = "en";
  }

  i18n.locale = savedLang; // Set locale globally before render

  return {
    pageProps: {
      initialLocale: savedLang, // Pass initial locale to components
    },
  };
};

export default MyApp;
