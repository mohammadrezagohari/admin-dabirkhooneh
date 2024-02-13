/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js"
  ],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    // extend: {
    // },
    fontFamily:{
      'dana':'dana',
      'danaBlack':'danaBlack',
      'danaBlackitalic':'danaBlackitalic',
      'danaBold':'danaBold',
      'danaBolditalic':'danaBolditalic',
      'danaDemibold':'danaDemibold',
      'danaDemibolditalic':'danaDemibolditalic',
      'danaExtrabold':'danaExtrabold',
      'danaExtrabolditalic':'danaExtrabolditalic',
      'danaExtralight':'danaExtralight',
      'danaExtralightitalic':'danaExtralightitalic',
      'danaLight':'danaLight',
      'danaMedium':'danaMedium',
      'danaMediumitalic':'danaMediumitalic',
      'danaRegular':'danaRegular',
      'danaThin':'danaThin',
      'yekanReg':'yekanRegEn',
 
    }
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    themes: ["light", "dark"],
  },

}
