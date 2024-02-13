import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { LangContext } from '../../../gard/context/LangContext';
import i18n from '../../../i18n';
import { PublicLangContext } from '../../../gard/context/PublicLangContext';
function PublicDropDown() {
    const { changePublicLanguage } =useContext(PublicLangContext);
    const {t}=useTranslation()
    // const changeLanguage = (event) => {
    //     // i18n.changeLanguage(event.target.value)
    //     // console.log("i18n ::::", i18n.language);
    //     localStorage.setItem("changeLanguage", i18n.changeLanguage(event.target.value))
    //     console.log("i18n ::::", i18n.changeLanguage(event.target.value));
    // }
  return (
    <select onChange={changePublicLanguage} className="select select-sm mr-4 bg-transparent border-2 border-gray-200" >
        <option value="" >{t('selectLanguage')}</option>
        <option value="en">English </option>
        <option value="fa">فارسی</option>
        <option value="ar">العربیه</option>
    </select>
  )
}

export default PublicDropDown