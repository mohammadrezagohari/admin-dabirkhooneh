
import React, { useContext, useState } from 'react'
import { SlQuestion } from "react-icons/sl";
import { StatusDropDown } from '../../DropDowns/StatusDropDown'
import { CategoryDropDown } from '../../DropDowns/CategoryDropDown'
import { TypeDropDown } from '../../DropDowns/TypeDropDown'
import TitleCard from '../../Cards/TitleCard'
import { AuthContext } from '../../../gard/context/AuthContext'
import { useTranslation } from 'react-i18next'
import { getArtsSearch } from '../../../core/api/servises/users'

function SearchWork({data,datas,setDatas,apiFun}) {
    const { t } = useTranslation();
    const { userToken } = useContext(AuthContext);
    const levels = window.localStorage.getItem("level");
    // console.log(levels);
  const [title, setTitle] = useState("");
  const [tracking_code, setTracking_code] = useState("");
  const [category_id, setCategory_id] = useState("");
  const [status, setStatus] = useState("");
  const [type, setType] = useState("");
  
    const searchItem = async (e) => {
      e.preventDefault();
      const createResult = await apiFun({
        title: title,
        tracking_code: tracking_code,
        category_id: category_id,
        status: status,
        type:type

    }, userToken)
        .then(response => {
            // console.log(`response.json()`, response);
            //    let res= response.json()
            setDatas(response);

        })
        .catch(function (error) { });

    return createResult;
    };

    const changeValue = (newStatus) => {
      // This is where you might be calling changeValue incorrectly
      setStatus(newStatus);
  };

  return (
    <TitleCard
    title={t("search")}
    isIcon={true}
    symbol={<SlQuestion className=" text-lg text-white" />}
    topMargin="mt-2 mb-6"
  >
    <form onSubmit={searchItem} className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 pb-4 gap-3 items-end">
      <div className="">
        <h4 className="mb-2 text-sm">{t("workName")}</h4>
        <input
          type="text"
          name="title"
          // value={score}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={t("workName")}
          className="input  input-bordered w-full text-sm"
        />
      </div>

      <div className="">
        <h4 className="mb-2 text-sm">{t("trackingCode")}</h4>

        <input
          type="text"
          name="tracking_code"
          // value={score}
          onChange={(e) => setTracking_code(e.target.value)}
          placeholder={t("trackingCode")}
          className="input  input-bordered w-full text-sm"
        />
      </div>

      <div className="">
        <h4 className="mb-2 text-sm">{t("status")}</h4>

        <StatusDropDown stat={status} setStat={changeValue} />
      </div>

      {
       levels == 2 ?(<></>):(<>
       
      <div className="">
        <h4 className="mb-2 text-sm">{t("chooseCategory")}</h4>

        <CategoryDropDown
          data={data}
          category_id={category_id}
          setCategory_id={setCategory_id}
        />
      </div>
       </>)
      }

      <div className="">
            <h4 className="mb-2 text-sm">{t("chooseType")}</h4>

            <TypeDropDown type={type} setType={setType} />
          </div>

      <div className="">
        {/* <div className="mb-2"> ggrg</div> */}

        <button
          type="submit"
          className="btn bg-green-500 hover:bg-green-600 font-medium text-sm  text-white"
        >
          {t("search")}
        </button>
      </div>
    </form>
  </TitleCard>
  )
}

export default SearchWork