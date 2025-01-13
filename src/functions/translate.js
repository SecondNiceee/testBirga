
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from "../translation/enTranslation.json"
import ruTranslation from "../translation/ruTranslation.json"
import en from '../constants/language';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslation },
      ru : {translation : ruTranslation}
    },
    lng:  en ? 'en' : "ru", // set default language
    fallbackLng: 'en', // set fallback language
    interpolation: { escapeValue: false },
  });

const translation = (text) => {
    return i18n.t(String(text))
}
export default translation