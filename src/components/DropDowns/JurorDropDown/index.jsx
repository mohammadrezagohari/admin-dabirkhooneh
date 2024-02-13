import React, { useContext, useState } from 'react'
import { useQuery } from 'react-query';
import { getAdminCategoryList } from '../../../core/api/servises/categories';
import { AuthContext } from '../../../gard/context/AuthContext';
import { useTranslation } from 'react-i18next';

export const JurorDropDown = ({juror_id, setJuror_id,data}) => {
  const { t } = useTranslation();

  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };
 
  const handleChange = () => {
    
  };
  return (
    <>
    <div className="">

     <select className={`select select-bordered w-full  ${isFocused ? 'overflow-y-scroll' : ''}`} value={juror_id} 
     onFocus={handleFocus}
     onBlur={handleBlur}
    //  onChange={handleChange}
     
     onChange={(e)=>{
      setJuror_id(e.target.value)
      setIsFocused(false);
      }}>
         <option value="0" selected >{t('chooseJuror')}</option>
        {
            data?.data?.data?.map((cat,i)=>(
              <>
              {/* {console.log("cat.unique_key",cat.name,"::::",cat.unique_key)} */}
                <option key={i} value={cat?.unique_key} className='w-full text-sm flex items-center justify-between' >
                  <span>{cat?.name}</span>
                  {/* <span className='px-4' ></span> */}
                  {/* <span>{cat?.mobile?cat?.mobile:cat?.email}</span> */}
                </option>
              </>
            ))
        }
            {/* <option disabled selected>Who shot first?</option>
            <option>Han Solo</option>
            <option>Greedo</option> */}
          </select>
    </div>
    </>
  )
}
