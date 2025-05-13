"use client";
import React, { useEffect, useState } from "react";
import { parseCookies, setCookie } from "nookies";

// The following cookie name is important because it's Google-predefined for the translation engine purpose
const COOKIE_NAME = "googtrans";

// We should know a predefined nickname of a language and provide its title (the name for displaying)
interface LanguageDescriptor {
  name: string;
  title: string;
}

// Types for JS-based declarations in public/assets/scripts/lang-config.js
declare global {
  namespace globalThis {
    var __GOOGLE_TRANSLATION_CONFIG__: {
      languages: LanguageDescriptor[];
      defaultLanguage: string;
    };
  }
}

const LanguageSwitcher = () => {
  const [currentLanguage, setCurrentLanguage] = useState<string>();
  const [languageConfig, setLanguageConfig] = useState<any>();

  // Initialize translation engine
  useEffect(() => {
    // 1. Read the cookie
    const cookies = parseCookies();
    const existingLanguageCookieValue = cookies[COOKIE_NAME];

    let languageValue;
    if (existingLanguageCookieValue) {
      // 2. If the cookie is defined, extract a language nickname from there.
      const sp = existingLanguageCookieValue.split("/");
      if (sp.length > 2) {
        languageValue = sp[2];
      }
    }
    // 3. If __GOOGLE_TRANSLATION_CONFIG__ is defined and we still not decided about languageValue - use default one
    if (global.__GOOGLE_TRANSLATION_CONFIG__ && !languageValue) {
      languageValue = global.__GOOGLE_TRANSLATION_CONFIG__.defaultLanguage;
    }
    if (languageValue) {
      // 4. Set the current language if we have a related decision.
      setCurrentLanguage(languageValue);
    }
    // 5. Set the language config.
    if (global.__GOOGLE_TRANSLATION_CONFIG__) {
      setLanguageConfig(global.__GOOGLE_TRANSLATION_CONFIG__);
    }
  }, []);

  // Don't display anything if current language information is unavailable.
  if (!currentLanguage || !languageConfig) {
    return null;
  }

  // The following function switches the current language
  const switchLanguage = (lang: string) => () => {
    // We just need to set the related cookie and reload the page
    // "/auto/" prefix is Google's definition as far as a cookie name
    setCookie(null, COOKIE_NAME, "/auto/" + lang);
    window.location.reload();
  };

  return (
    <div className="text-center notranslate flex flex-wrap justify-center items-center gap-2 py-2">
      {languageConfig.languages.map((ld: LanguageDescriptor, i: number) => {
        const isActive =
          currentLanguage === ld.name ||
          (currentLanguage === "auto" &&
            languageConfig.defaultLanguage === ld.name);

        return (
          <React.Fragment key={`l_s_${ld.name}`}>
            {isActive ? (
              <span className="px-4 py-2 rounded-full bg-white text-blue-600 font-medium shadow-sm border border-blue-100">
                {ld.title}
              </span>
            ) : (
              <a
                onClick={switchLanguage(ld.name)}
                className="px-4 py-2 rounded-full text-sm font-medium text-gray-700 hover:text-white hover:bg-blue-600 transition shadow-sm border border-gray-300 hover:border-blue-600 bg-white"
              >
                {ld.title}
              </a>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export { LanguageSwitcher, COOKIE_NAME };
