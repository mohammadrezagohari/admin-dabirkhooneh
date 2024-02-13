import React from 'react'
import { useTranslation } from 'react-i18next';


export const TypeDropDown = ({type, setType}) => {
  // const { isLoading, data } = useQuery("categories-dropdown",getAdminCategoryList );
  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }
  const { t } = useTranslation();
// console.log("lang",stat);
  return (
    <>
     <select className="select select-bordered w-full " value={type} onChange={(e)=>setType(e.target.value)}>
        {/* {
            data?.data?.data.map((cat,i)=>(
                <option key={i} >{cat.name}</option>
            ))
        } */}
         <option value="default" selected >  {t('chooseType')} </option>
            <option value="2" >  {t('likeWork')} </option>
            <option value="1" >{t("normalWork")}</option>
      </select> 
    </>
  )
}
