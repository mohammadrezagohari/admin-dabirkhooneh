
import React, { createContext, useEffect, useState } from 'react'
import i18n from '../../i18n';  
export const LangContext = createContext(localStorage.getItem('changeLanguage') ? localStorage.getItem('changeLanguage') : "fa");
// export const PublicLangContext = createContext(localStorage.getItem('changePublicLanguage') ? localStorage.getItem('changePublicLanguage') : "fa");

export const LangProvider = ({ children }) => {
    // const [language, setLanguage] = useState();
    // const [userToken, setUserToken] = useLocalStorage("_token", null);
    // JSON.parse( localStorage.getItem( 'changeLanguage' ) )
    let currentLang=i18n.language
    const changeLanguage = (event) => {
        currentLang=event.target.value
        i18n.changeLanguage(event.target.value)
        const langContext = event.target.value
        localStorage.setItem("current_Language", langContext)
        // console.log("i18n ::::", i18n.language);
    }

    // const changePublicLanguage = (event) => {
    //     currentLang=event.target.value
    //     i18n.changeLanguage(event.target.value)
    //     const langContext = event.target.value
    //     localStorage.setItem("public_current_Language", langContext)
    //     // console.log("i18n ::::", i18n.language);
    // }

    const getLanguage=()=>currentLang

    return (
        <LangContext.Provider
            value={{
                // changePublicLanguage,
                changeLanguage,
                getLanguage
            }}
        >{children}</LangContext.Provider>
    )
}
