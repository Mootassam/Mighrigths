/**
 * Basic Setting Variables Define
 */
export const BaseSetting = {
  name: "MigRights",
  displayName: "MigRights",
  appVersion: "1.1.1",
  defaultLanguage: "fr",
  // local
  // apiUrl: 'http://172.16.224.150:8080',
  // tenantId: '6098f23d4610762ca46ea688',

  // preProd
  apiUrl: "http://172.16.224.150:8080",
  tenantId: "60c23344ec1ee231dd3178c0",
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
