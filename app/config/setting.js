/**
 * Basic Setting Variables Define
 */
export const BaseSetting = {
  name: "MigRights",
  displayName: "MigRights",
  appVersion: "1.1.1",
  defaultLanguage: "fr",
  // local
<<<<<<< HEAD
  // apiUrl: 'http://172.16.224.165:8080',
  // tenantId: '612f400a2d3124248006e6e6',

  // preProd
  apiUrl: "http://85.159.212.11:3000",
  tenantId: "6156d6cac0c87c001e3f0a0b",
=======
  // apiUrl: 'http://172.16.224.150:8080',
  // tenantId: '6098f23d4610762ca46ea688',

  // preProd
  apiUrl: "http://172.16.224.150:8080",
  tenantId: "60c23344ec1ee231dd3178c0",
>>>>>>> e83d3c477adf1550fbd417d798a15ba60f66c03b
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
