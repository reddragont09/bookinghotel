import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en/translation.json";
import vi from "./locales/vi/translation.json";
import zh from "./locales/zh/translation.json";
import ko from "./locales/ko/translation.json";

const language = localStorage.getItem("language") || "en";
i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                translation: en,
            },
            vi: {
                translation: vi,
            },
            zh: {
                translation: zh,
            },
            ko: {
                translation: ko,
            },
        },

        lng: language,
        fallbackLng: "en",

        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;