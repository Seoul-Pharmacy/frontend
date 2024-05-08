import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguaeDetector from "i18next-browser-languagedetector";

import TranslationEn from './translation.en.json';
import TranslationKo from './translation.ko.json';
import TranslationCn from './translation.cn.json';
import TranslationJp from './translation.jp.json';

const initialLanguage = localStorage.getItem('language') || "ko";

i18n
    .use(LanguaeDetector) // 사용자 언어 탐지
    .use(initReactI18next) // i18n 객체를 react-18next에 전달
    .init({
        lng: initialLanguage,
        debug: true,
        fallbackLng: "en",
        resources: {
            en: {
                translation: TranslationEn
            },
            ko: {
                translation: TranslationKo
            },
            cn: {
                translation: TranslationCn
            },
            jp: {
                translation: TranslationJp
            },
        },
    });

export default i18n;