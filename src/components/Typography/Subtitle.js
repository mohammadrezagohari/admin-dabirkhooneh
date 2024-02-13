import { useTranslation } from 'react-i18next'
import i18n from 'i18next';
 


 function Subtitle({styleClass, children}){
    return(
        <div className={`w-full text-center text-2xl font-semibold ${styleClass} flex justify-start`}>{children}</div>
    )
}

export default Subtitle