import apiClient from "../apiClient";
import i18n from "i18next";
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
// const currentLanguage = window.localStorage.getItem("current_Language");

// let currentLanguage = i18n.language;
// const trans_header = {
//   "Accept-Language": currentLanguage,
//   "Content-Type": "application/json",
// };
// let currentLanguage = i18n.language;
export const transToCurrentLanguage = async (currentLanguage,unique_key) => {
  console.log("api currentLanguage------>", currentLanguage);
//   console.log("api unique_key------>", unique_key);
 
  const response = await apiClient.get(`comment/${unique_key}/translate`, {
    headers: {
        "Accept-Language": currentLanguage,
        "Content-Type": "application/json",
    },
  }); 
  // console.log("status", response);
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};
