import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TitleCard from "../../../../components/Cards/TitleCard";
import { CategoryDropDown } from "../../../../components/DropDowns/CategoryDropDown";
import { LangDropDown } from "../../../../components/DropDowns/LangDropDown";
import { postAdminNewAssistanceInternational } from "../../../../core/api/servises/users";
import { AuthContext } from "../../../../gard/context/AuthContext";
import { useQuery } from "react-query";
import { getAdminCategoryList } from "../../../../core/api/servises/categories";
// import TitleCard from "../../../components/Cards/TitleCard"
// import { showNotification } from '../../common/headerSlice'

import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";


function AdminPostNewInternationalAssistance() {

  const { userToken } = useContext(AuthContext);
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [category_id, setCategory_id] = useState("");
  const [lang, setLang] = useState("fa"); 
  const [isSubmited,setIsSubmited] = useState(false)

  const storeItem = async (e) => {
    e.preventDefault();
    setIsSubmited(true)
    const formData = new FormData();

    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("category_id", category_id);
    formData.append("lang", lang);


    const createResult = await postAdminNewAssistanceInternational(formData,userToken)
    .then(function (response) {
      // console.log("response result : ", response);
      if (response.status) {
        toast.success(`${response.status.message}`);
        setIsSubmited(false)
      }else {
        setIsSubmited(false)
      }
      // getDatas()
    })
    .catch(function (error) {
      // console.log("error", error.response.data.status);
      toast.error(`${error.response.data.status.message}`);
      setIsSubmited(false)
    });

    return createResult;
  };

  const { data } = useQuery(
    ["categories-post-international-assistance-dropdown",userToken],
    ()=>getAdminCategoryList(userToken)
  );

  return (
    <>
      <TitleCard title={t('regNewAssisOut')} topMargin="mt-2">
        <form method="post" onSubmit={storeItem} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 ">
          <input
            type="text"
            name="name"
            // value={score}
            onChange={(e) => setName(e.target.value)}
            placeholder="name"
            className="input  input-bordered w-full"
          />
          <input
            type="text"
            name="email"
            // value={description}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
            className="input  input-bordered w-full"
          />
          <input
            type="text"
            name="password"
            // value={score}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
            className="input  input-bordered w-full"
          />
          
          <CategoryDropDown  data={data} category_id={category_id} setCategory_id={setCategory_id} /> 
        
          <LangDropDown  lang={lang} setLang={setLang} />
         <div className="col-span-1 md:col-span-2 lg:col-span-2 ">
         <button type="submit" className="btn btn-primary flex justify-center items-center">
                          {
                            isSubmited?(
                              <span className="loading loading-dots loading-md"></span>
                            ):(
                              <>
                                {t('send')}
                              </>
                            )
                          }
                          </button>
          </div>
        </form>
      </TitleCard>
    </>
  );
}

export default AdminPostNewInternationalAssistance;
