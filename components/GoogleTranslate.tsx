"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    google?: {
      translate?: {
        TranslateElement?: (
          options: { pageLanguage: string },
          elementId: string
        ) => void;
      };
    };
  }
}

export default function GoogleTranslate() {
  useEffect(() => {
    // This ensures translation gets initialized if scripts are already loaded
    if (
      typeof window !== "undefined" &&
      typeof window.google !== "undefined" &&
      typeof window.google.translate !== "undefined"
    ) {
      window.google.translate.TranslateElement?.(
        { pageLanguage: "np" },
        "google_translate_element"
      );
    }
  }, []);

  return (
    <div id="google_translate_element" className="absolute right-5 top-5" />
  );
}
