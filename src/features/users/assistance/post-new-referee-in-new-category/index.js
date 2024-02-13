import { useContext, useEffect, useState } from "react";
import TitleCard from "../../../../components/Cards/TitleCard";
import { Link, useParams, useSearchParams } from "react-router-dom";
import {
  getAssistanceCategoryList,
  getAssistanceJurorSearch,
  getAssistanceMyJurorList,
  postAssistanceAddJurorNewCategory,
} from "../../../../core/api/servises/users";
import { useQuery } from "react-query";
import { CategoryDropDown } from "../../../../components/DropDowns/CategoryDropDown";
import { AuthContext } from "../../../../gard/context/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

function PostNewRefereeInNewCategory() {
  const { t } = useTranslation();

  const [query, setquery] = useState("");
  const [jurors, setJurors] = useState([]);
  const [isSubmited,setIsSubmited] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams();
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState(null);


  const { userToken } = useContext(AuthContext);

  const [unique_key, setUnique_key] = useState("");

  const storeItem = async (e) => {
    e.preventDefault();
    setIsSubmited(true)
    const formData = new FormData();
    formData.append("unique_key", unique_key);
    // formData.append("category_id", category_id);

    const createResult = await postAssistanceAddJurorNewCategory(
      formData,
      userToken
    )
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
    ["categories-post-new-referee-in-new-category-dropdown", userToken],
    () => getAssistanceCategoryList(userToken)
  );

  const getDatas = async () => {
    const result = await getAssistanceMyJurorList(userToken)
      .then(function (response) {
        // console.log("response", response.data?.data);
        setJurors(response?.data?.data);
      })
      .catch(function (err) {
        // console.log("error", err);
      });
    return result;
  };

  useEffect(() => {
    getDatas();
  }, []);

  const serachHandler = async (query) => {

    if (mobile) {

      setSearchParams({ mobile });
      await getAssistanceJurorSearch({ userToken: userToken, mobile: mobile })
        .then((data) => {
          const a = data?.data?.data
            .filter((po) => po.mobile.includes(query))
            .slice(0, 5);
          setJurors(a);
        })
        .catch((err) =>{

          // console.log("err ------>",err)
        }
         
         );
      // setJurors(mobileData?.data?.data)
      // console.log("mobileData ::",mobileData?.data?.data);
    } else if (email) {
      setSearchParams({ email });
      const emailData = await getAssistanceJurorSearch({
        userToken: userToken,
        email: email,
      });
      setJurors(emailData?.data?.data);
    } else {
      setSearchParams({});
    }
    // console.log("mobileData ::", query);
  };



  return (
    <>
      <TitleCard title="Billing History" topMargin="mt-2">
        <form
          method="post"
          onSubmit={storeItem}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 "
        >
        
          <div className="">
            <input
              onChange={(e) => {
                serachHandler(e.target.value);
                setquery(e.target.value);
                setMobile(e.target.value);
                setEmail(e.target.value);
                setJurors("");
              }}
              value={query}
              placeholder="لطفا جستجو کنید..."
              type="text"
              className="input  input-bordered w-full pl-12 rounded-lg p-4  transition-all duration-300 "
            />
            <div className=" shadow-lg shadow-gray-300 bg-white rounded-br-lg rounded-bl-lg ">
              <ul className=" flex flex-col gap-2">
                {query === "" ? (
                  <li></li>
                ) : jurors === -1 ? (
                  <li className=" m-4">لطفا صبر کنید ...</li>
                ) : jurors.length === 0 ? (
                  <li className=" m-4">نتیجه‌ای یافت نشد.</li>
                ) : (
                  jurors.map((po, i) => (
                    <li
                      key={i}
                      onClick={()=>{
                        setquery(po.name)
                        setUnique_key(po.unique_key)
                        setJurors(-1)
                        // console.log("unique_key::",unique_key);
                      }}
                      className=" px-2 py-3 rounded-md duration-200 transition-all hover:bg-zinc-200 m-2 w-[95%] "
                    >
                      {po.name}
                    </li>
                  ))
                )}
              </ul>
            </div>
          </div>

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

export default PostNewRefereeInNewCategory;
