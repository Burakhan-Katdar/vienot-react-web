import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from './languages/en'
import tr from './languages/tr'

export let currentBrowserLanguage = navigator.language.split('-')[0]
export let currentSelectedLanguage = localStorage.getItem('SelectedLanguage')

i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources: {
            en,
            tr
        },
        lng: currentSelectedLanguage ? currentSelectedLanguage : currentBrowserLanguage, // if you're using a language detector, do not define the lng option
        fallbackLng: "en", // fallbackLng is the default language for not being able to detect the current lang

        interpolation: {
            escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
        }
    });