/**
 * Basic Setting Variables Define
 */
export const BaseSetting = {
  name: "MigRights",
  displayName: "MigRights",
  appVersion: "1.1.1",
  defaultLanguage: "fr",
  // local
  // apiUrl: 'http://172.16.224.156:8080',
  // tenantId: '6098f23d4610762ca46ea688',

  // preProd
  apiUrl: "http://85.159.212.11:3000",
  tenantId: "60cb644c838c09001e1b60ed",
  languageSupport: ["en", "ar", "fr"],
  resourcesLanguage: {
    en: {
      translation: require("../lang/en.json"),
    },
    ar: {
      translation: require("../lang/ar.json"),
    },

    fr: {
      translation: require("../lang/fr.json"),
    },
  },
};
