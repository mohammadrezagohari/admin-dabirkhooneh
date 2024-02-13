import React from 'react'
import { useTranslation } from 'react-i18next';


export const LangAssistDropDown = ({lang, setLang}) => {
  // const { isLoading, data } = useQuery("categories-dropdown",getAdminCategoryList );
  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }
  const { t } = useTranslation();
// console.log("lang",lang);
  return (
    <>
     <select className="select select-bordered w-full " value={lang} onChange={(e)=>setLang(e.target.value)}>
        {/* {
            data?.data?.data.map((cat,i)=>(
                <option key={i} >{cat.name}</option>
            ))
        } */}
            <option value="default" >  {t('chooseLang')} </option>
            <option value="en" >{t("en")}</option>
            <option value="ar">{t("ar")}</option>
          </select> 
    </>
  )
}
