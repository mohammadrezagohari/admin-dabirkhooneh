import React, { useContext, useState } from "react";
import { LangDropDown } from "../../DropDowns/LangDropDown";
import { CategoryDropDown } from "../../DropDowns/CategoryDropDown";
import { StatusDropDown } from "../../DropDowns/StatusDropDown";
import TitleCard from "../../Cards/TitleCard";
import { useTranslation } from "react-i18next";
import { SlQuestion } from "react-icons/sl";
import { getassistanceSearch } from "../../../core/api/servises/users";
import { AuthContext } from "../../../gard/context/AuthContext";
import { useQuery } from "react-query";
import { getAdminCategoryList } from "../../../core/api/servises/categories";

function SearchUser({ data, datas, setDatas, apiFun }) {
  const { t } = useTranslation();
  const { userToken } = useContext(AuthContext);
  const levels = window.localStorage.getItem("level");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState();
  const [category_id, setCategory_id] = useState();
  const [lang, setLang] = useState("default");

  const searchItem = async (e) => {
    // console.log(`response.json()`);
    e.preventDefault();

    const createResult = await apiFun(
      {
        name: name,
        mobile: mobile,
        email: email,
        status: status,
        category_id: category_id,
        lang: lang,
      },
      userToken
    )
      .then((response) => {
        //console.log(`response.json()`, response);
        //    let res= response.json()
        setDatas(response);
      })
      .catch(function (error) {});

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
      <form
        onSubmit={searchItem}
        className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7 pb-4 gap-3 items-end"
      >
        <div className="">
          <h4 className="mb-2 text-sm">{t("name")} </h4>
          <input
            type="text"
            name="name"
            // value={score}
            onChange={(e) => setName(e.target.value)}
            placeholder={t("name")}
            className="input  input-bordered w-full text-sm "
          />
        </div>

        <div className="">
          <h4 className="mb-2 text-sm">{t("userPhone")}</h4>

          <input
            type="text"
            name="mobile"
            // value={score}
            onChange={(e) => setMobile(e.target.value)}
            placeholder={t("userPhone")}
            // maxLength={11}
            // minLength={11}
            className="input text-center input-bordered w-full text-sm "
          />
        </div>

        <div className="">
          <h4 className="mb-2 text-sm">{t("userEmail")}</h4>

          <input
            type="text"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t("userEmail")}
            className="input  input-bordered w-full text-sm "
          />
        </div>

        <div className="">
          <h4 className="mb-2 text-sm">{t("status")}</h4>
          <StatusDropDown stat={status} setStat={changeValue} />

          {/* <StatusDropDown stat={status} setstat={setStatus} /> */}
        </div>
        {levels == 2 ? (
          <></>
        ) : (
          <>
            <div className="">
              <h4 className="mb-2 text-sm">{t("chooseCategory")}</h4>
              {/* {!isLoading ? (
                        ) : (<div>loading</div>)} */}
              <CategoryDropDown
                data={data}
                category_id={category_id}
                setCategory_id={setCategory_id}
              />
            </div>
          </>
        )}

        <div className="">
          <h4 className="mb-2 text-sm">{t("chooseLang")}</h4>

          <LangDropDown lang={lang} setLang={setLang} />
        </div>

        <div className="">
          {/* <div className="mb-2"> ggrg</div> */}

          <button
            type="submit"
            className="btn bg-green-500 hover:bg-green-600 font-medium text-sm  text-white"
            //   onClick={serachHandler}
          >
            {t("search")}
          </button>
        </div>
      </form>
    </TitleCard>
  );
}

export default SearchUser;
