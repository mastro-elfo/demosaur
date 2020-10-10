import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
// don't want to use this?
// have a look at the Quick start guide
// for passing in lng and translations on init

// Use languagedetector and initReactI18next here because they (initReactI18next) must be used before anything else
i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next);

/**
 * Initialize i18n.
 *
 * ```js
 * import init from "mastro-elfo-mui/utils/i18n"
 * init(true, {
 *  backend: {
 *    loadPath: `${window.location.pathname}locales/{{lng}}/{{ns}}.json`
 *  }
 * })
 * ```
 *
 * ```js
 * import init from "mastro-elfo-mui/utils/i18n"
 * init(false, {
 *  resources: {
 *    en: {
 *      translation: {
 *        key: "value"
 *      }
 *    }
 *  }
 * })
 * ```
 *
 * @param  {Boolean} [backend=false] If `true` then `use(Backend)`
 * @param  {[type]}  options         options passed to `init` method: https://www.i18next.com/overview/configuration-options
 * @return {[type]}                  `i18n`
 */

export default (backend = false, options) => {
  if (backend) {
    i18n
      // load translation using http -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
      // learn more: https://github.com/i18next/i18next-http-backend
      .use(Backend);
  }

  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  return i18n.init({
    fallbackLng: "en",
    joinArrays: "\n",
    debug: false,
    interpolation: {
      escapeValue: false // not needed for react as it escapes by default
    },
    ...options
  });
};
