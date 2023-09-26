import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
// import {findBestAvailableLanguage} from 'react-native-localize';

// Importa los archivos de traducciones
import enTranslation from '../src/assets/translations/en/translations.json'; // Archivo de traducción en inglés
import esTranslation from '../src/assets/translations/es/translations.json'; // Archivo de traducción en español

// Configuración de i18next
export const setI18nConfig = () => {
  const fallbackLanguage = {languageTag: 'en', isRTL: false}; // Idioma por defecto

  const {languageTag} = {languageTag: 'es'} || fallbackLanguage;

  i18n.use(initReactI18next).init({
    resources,
    lng: languageTag,
    fallbackLng: fallbackLanguage.languageTag,
    interpolation: {
      escapeValue: false,
    },
  });

  return i18n;
};

// Definición de los recursos de traducción
const resources = {
  en: {
    translation: enTranslation,
  },
  es: {
    translation: esTranslation,
  },
};

export default i18n;
