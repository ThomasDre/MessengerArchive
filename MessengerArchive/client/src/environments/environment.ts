// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,  
  debug: false,
  server: "http://localhost:8081",
  //server: '${location.protocol}//${location.hostname}:8081',
  picFolder: "../../../assets/img/icons/",
  chatFolder: "../../../assets/data/chats/", // unverified
  contactFolder: "../../../assets/data/", // unverified
  contactsFileProd: "contacts.json", // unverified
  contactsFileDebug: "_debug_contacts.json"
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
