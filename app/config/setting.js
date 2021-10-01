/**
 * Basic Setting Variables Define
 */
export const BaseSetting = {
  name: "MigRights",
  displayName: "MigRights",
  appVersion: "1.1.1",
  defaultLanguage: "fr",
  // local
  // apiUrl: 'http://172.16.224.165:8080',
  // tenantId: '612f400a2d3124248006e6e6',

  // preProd
  apiUrl: "http://85.159.212.11:3000",
  tenantId: "6156d6cac0c87c001e3f0a0b",
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
