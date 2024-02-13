import { useEffect, useContext, useRef } from "react";
import { useDispatch } from "react-redux";
// import { setPageTitle } from '../../features/common/headerSlice'
// import Transactions from '../../features/transactions'
// import ArtList from '../../features/general/art-list'
import { setPageTitle } from "../../../features/common/headerSlice";
import { useState } from "react";
// import CategoryList from '../../features/general/general-gategory-list'
import i18n from "../../../i18n";
import { useTranslation } from "react-i18next";
import { AuthContext } from "../../../gard/context/AuthContext";
import { logOutUser, updateProfile } from "../../../core/api/servises/register";
import { toast } from "react-hot-toast";

function Profile() {

  const {userToken,userData, nameContext,setNameContext,emailContext,mobileContext,lang,level,statusContext,logout} = useContext(AuthContext);
  const passAlert = useRef();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [mobile, setMobile] = useState();
  const [password, setPassword] = useState();
  // const [status,setStatus]= useState();

  const defaultName = window.localStorage.getItem("name");
  const defaultEamil = window.localStorage.getItem("email");
  const defaultMobile = window.localStorage.getItem("mobile");
  const defaultStatus = window.localStorage.getItem("status");
  const defaultLevel = window.localStorage.getItem("level");
// console.log("unique_key --------------------",unique_key);
  let levelLabel = "";
  switch (defaultLevel) {
    case "5":
      levelLabel = t("secretary");
      break;
    case "2":
      levelLabel = t("assistant");
      break;
    case "3":
      levelLabel = t("juror");
      break;
    case "1":
      levelLabel = t("participant");
      break;
    default:
      levelLabel = t("people");
      break;
  }

  const loggedOut = async () => {
    const ourToken = `Bearer ${userToken}`;
    const createResult = await logOutUser(ourToken)
      .then(function (response) {
        if (response.status) {
          // logout();
          // navigate("/login");
        //   console.log(response?.status);
        } else {
          if (response?.success == false) {
            // console.log(response);
          }
        }
      })
      .catch(function (error) {
        console.log("error :", error);
      });
    return createResult;
  };

    const [isSubmited,setIsSubmited] = useState(false) ;

    function logoutUser(){
      localStorage.clear();
      loggedOut();
      window.location.href = '/'
      
  }

  useEffect(() => {
    dispatch(setPageTitle({ title: t("profile") }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const createResult = await updateProfile(
      {
        name,
        password,
      },
      userToken
    )
      .then(function (response) {
        // console.log("data result", response);
        if (response.status) {
          toast.success(t("updateInfoMsg"));
        //   console.log("token validity", response.data.token_validity);
          let token_validity = response.data.token_validity;
          if (token_validity === 0) {
            setTimeout(() => {
              toast.success(t("autoLogout"));
              setTimeout(() => {
                logoutUser();
              }, 3000);
            }, 3000);
          }
        } else {
          if (response?.success == false) {
            // console.log("res", response);
            toast.error(t("tryAgainError"));
          }
        }
        // console.log(response);
      })
      .catch(function (error) {
        toast.error(t("tryAgainError"));
        console.log("error :", error);
      });
    return createResult;
  };

  return ( 
    <>
      <form className="grid w-full gap-5" onSubmit={handleSubmit}>
        <div className="w-full justify-center md:justify-start lg:justify-start ">
          <input
            type="text"
            name="name"
            value={name}
            defaultValue={defaultName}
            onChange={(e) => setName(e.target.value)}
            placeholder={t("name")}
            minLength={3}
            className="input  input-bordered w-full md:w-1/3 lg:w-1/3 "
          />
        </div>
        <div className=" flex flex-col  justify-center md:justify-start lg:justify-start gap-3">
          <input
            type="text"
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              passAlert.current.textContent = t("updatePassAlert");
            }}
            placeholder={t("password")}
            minLength={6}
            className="input  input-bordered w-full md:w-1/3 lg:w-1/3"
          />
          <label
            ref={passAlert}
            className="text-[.7em] text-orange-500"
          ></label>
        </div>
        {i18n.language === "fa" ? (
          <div className=" flex  cols-span-2 md:cols-span-1 lg:cols-span-1 justify-center md:justify-start lg:justify-start  gap-x-5">
            <span>{t("mobile")}:</span>
            <span className={"text-xl"}>{defaultMobile}</span>
          </div>
        ) : (
          <div className=" flex  w-full md:w-1/3 lg:w-1/3 justify-center md:justify-start lg:justify-start gap-x-5">
            <span className={"text-xl"}>{defaultEamil}</span>
          </div>
        )}
        {/* <div className=" flex flex-col w-full md:w-1/3 lg:w-1/3 justify-center md:justify-start lg:justify-start ">
        <input
              type="text"
              name="level"
              // value={status}
              defaultValue={levelLabel}
              // onChange={(e) => setStatus(e.target.value)}
              // placeholder={t('userStatus')}
              disabled={true}
              className="input  input-bordered w-full md:w-2/3 lg:w-2/3"
            />
        </div> */}
        <div className="  flex w-full items-center gap-5 md:w-1/3 lg:w-1/3 justify-center md:justify-start lg:justify-start ">
          {/* <label className="text-xl">{t('level')}</label> */}
          <span className="min-w-[8rem] flex justify-center items-center p-2 input input-bordered w-max border-none outline-none  cursor-default   ">
            {levelLabel}
          </span>
        </div>
        <div className=" flex flex-col w-full md:w-1/3 lg:w-1/3 justify-center md:justify-start lg:justify-start ">
          <button className="hover:bg-primary input min-w-[14rem] text-white  input-bordered w-full bg-blue-500 transition-all">
          {isSubmited ? ( 
            <span className="loading loading-dots loading-md"></span> 
             ) : ( 
            <> {t('update')}</> 
           )} 
           </button>
        </div>
      </form>
    </>
  );
}

export default Profile;
