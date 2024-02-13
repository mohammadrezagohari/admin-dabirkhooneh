
import React, { createContext, useEffect, useState } from 'react'
import i18n from '../../i18n'; 
// export const PublicLangContext = createContext(localStorage.getItem('changeLanguage') ? localStorage.getItem('changeLanguage') : "fa");
export const PublicLangContext = createContext(localStorage.getItem('changePublicLanguage') ? localStorage.getItem('changePublicLanguage') : "fa");
 
export const PublicLangProvider = ({ children }) => {
    // const [language, setLanguage] = useState(); 
    // const [userToken, setUserToken] = useLocalStorage("_token", null);
    // JSON.parse( localStorage.getItem( 'changeLanguage' ) )
    let currentPublicLang=i18n.language
    console.log('lang provide',currentPublicLang);

    const changePublicLanguage = (event) => {
        currentPublicLang=event.target.value
      console.log('lang provide event',event.target.value);

        i18n.changeLanguage(event.target.value)
        const publicLangContext = event.target.value
        localStorage.setItem("public_current_Language", publicLangContext)
        // console.log("i18n ::::", i18n.language);
    }

    const getLanguage=()=>currentPublicLang

    return (
        <PublicLangContext.Provider
            value={{
                changePublicLanguage,
                getLanguage,
                currentPublicLang
            }}
        >{children}</PublicLangContext.Provider>
    )
}
