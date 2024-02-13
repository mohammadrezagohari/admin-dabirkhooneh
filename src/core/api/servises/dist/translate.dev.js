"use strict";

var _apiClient = _interopRequireDefault(require("../apiClient"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// const fa_header={
//     "Accept-Language": "fa",
//     "Content-Type": "application/json"
//   }
//   const en_header={
//     "Accept-Language": "en",
//     "Content-Type": "application/json"
//   }
//   const ar_header={
//     "Accept-Language": "ar",
//     "Content-Type": "application/json"
//   }
//   export const transToFa = async (unique_key) => {
//     const response = await apiClient.get(`comment/${unique_key}/translate`,
//       {
//         headers: fa_header,
//       }
//     );
//     // console.log("status", response);
//     if (response.status !== 200) {
//       return null;
//     }
//     return response?.data;
//   };
//   export const transToEn = async (unique_key) => {
//     const response = await apiClient.get(`comment/${unique_key}/translate`,
//       {
//         headers: en_header,
//       }
//     );
//     // console.log("status", response);
//     if (response.status !== 200) {
//       return null;
//     }
//     return response?.data;
//   };
//   export const transToAr = async (unique_key) => {
//     const response = await apiClient.get(`comment/${unique_key}/translate`,
//       {
//         headers: ar_header,
//       }
//     );
//     // console.log("status", response);
//     if (response.status !== 200) {
//       return null;
//     }
//     return response?.data;
//   };
var currentLanguage = window.localStorage.getItem("current_Language");
var trans_header = {
  "Accept-Language": currentLanguage,
  "Content-Type": "application/json"
}; //   export const transToAr = async (unique_key) => {
//     const response = await apiClient.get(`comment/${unique_key}/translate`,
//       {
//         headers: ar_header,
//       }
//     );
//     // console.log("status", response);
//     if (response.status !== 200) {
//       return null;
//     }
//     return response?.data;
//   };