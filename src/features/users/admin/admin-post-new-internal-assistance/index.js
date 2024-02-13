import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TitleCard from "../../../../components/Cards/TitleCard";
import { postAdminNewAssistanceIR } from "../../../../core/api/servises/users";
import { CategoryDropDown } from "../../../../components/DropDowns/CategoryDropDown";
import { LangDropDown } from "../../../../components/DropDowns/LangDropDown";
import { AuthContext } from "../../../../gard/context/AuthContext";
import { useQuery } from "react-query";
import { getAdminCategoryList } from "../../../../core/api/servises/categories";
// import TitleCard from "../../../components/Cards/TitleCard"
// import { showNotification } from '../../common/headerSlice'
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";



function AdminPostNewInternalAssistance() {
  const { userToken } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [category_id, setCategory_id] = useState("");
  const [lang, setLang] = useState("fa");
  const { t } = useTranslation();
  const [isSubmited,setIsSubmited] = useState(false)
  // console.log("typeof description",typeof description);
  // console.log("typeof score",typeof score);
  // let score = parseInt(score);

  
  const storeItem = async (e) => {
    e.preventDefault();
    setIsSubmited(true)
    const formData = new FormData();

    formData.append("name", name);
    formData.append("mobile", mobile);
    formData.append("password", password);
    formData.append("category_id", category_id);
    formData.append("lang", lang);


    const createResult = await postAdminNewAssistanceIR(formData,userToken)
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

  const {  data } = useQuery(
    ["categories-ir-dropdown",userToken],
    ()=>getAdminCategoryList(userToken)
  );
  return (
    <>
      <TitleCard title={t('regNewAssisIn')} topMargin="mt-2" >
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
            name="mobile"
            // value={score}
            onChange={(e) => setMobile(e.target.value)}
            placeholder="09-- --- ----"
            maxLength={11}
            minLength={11}
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
          
          <CategoryDropDown data={data} category_id={category_id} setCategory_id={setCategory_id} /> 
        
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

export default AdminPostNewInternalAssistance;
