"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _i18next = _interopRequireDefault(require("i18next"));

var _reactI18next = require("react-i18next");

var _en = _interopRequireDefault(require("./en"));

var _fa = _interopRequireDefault(require("./fa"));

var _ar = _interopRequireDefault(require("./ar"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
var resources = {
  en: {
    translation: _en["default"]
  },
  fa: {
    translation: _fa["default"]
  },
  ar: {
    translation: _ar["default"]
  }
};
var currentLanguage = localStorage.getItem("current_Language");
var publicCurrentLanguage = localStorage.getItem("public_current_Language"); // i18n.changeLanguage("en");

_i18next["default"].use(_reactI18next.initReactI18next) // passes i18n down to react-i18next
.init({
  resources: resources,
  lng: currentLanguage || publicCurrentLanguage ? currentLanguage && publicCurrentLanguage : "fa",
  // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
  // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
  // if you're using a language detector, do not define the lng option
  interpolation: {
    escapeValue: false // react already safes from xss

  }
});

var _default = _i18next["default"];
exports["default"] = _default;