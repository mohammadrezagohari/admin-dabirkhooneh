import { useState, useRef, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
// import OTPInput from '../OTP/otp';
import { useTranslation } from "react-i18next";
import {
  logByEmailAndOTP,
  logByPassAndEmail,
  logByMobileAndOTP,
  logByPassAndMobile,
  regByMobile,
  regByEmail,
} from "../../core/api/servises/register";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../gard/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import i18n from "i18next";
import { LangDropDown } from "../../components/DropDowns/LangDropDown";
import { LangContext } from "../../gard/context/LangContext";

// import {setUserToken} from '.'

function RegisterForm() {
  const navigate = useNavigate();

  const {
    userToken,
    setUserToken,
    setIsLoggedIn,
    userData,
    isLoggedIn,
    loginContext,
    UniqueKeyContext,
  } = useContext(AuthContext);

  const { changeLanguage } = useContext(LangContext);

  const [regFlag, setRegFlag] = useState(false);
  const [passFlag, setPassFlag] = useState(false);
  const { t } = useTranslation();

  const sendRef = useRef(null);
  const messageRef = useRef();
  const messageRef1 = useRef();

  useEffect(() => {}, [changeLanguage]);

  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (i18n.language === "fa") {
      if (mobile === "") {
        messageRef.current.value = "لطفا شماره همراه خود را وارد کنید    !";
      } else {
        const createResult = await regByMobile({ mobile })
          .then(function (response) {
            // console.log("data result", response);
            if (response.status) {
              UniqueKeyContext(response?.data?.unique_key);
              toast.success(t("codeSend"));
              setTimeout(() => {
                navigate("/verifyaccountotp");
              }, 3000);
            }
          })
          .catch(function (error) {
            toast.error(t("loginError2"));
          });
        return createResult;
      }
    } else {
      if (email === "") {
        messageRef1.current.value = "The email field is empty!";
      } else {
        const createResult = await regByEmail({ email })
          .then(function (response) {
            // console.log("data result", response);
            if (response.status) {
              UniqueKeyContext(response?.data?.unique_key);
              toast.success(t("codeSend"));
              setTimeout(() => {
                navigate("/verfiy");
              }, 2000);
            } else {
              toast.error(t("loginError2"));
            }
            // console.log(response);
          })
          .catch(function (error) {
            toast.error(t("loginError2"));
          });
        return createResult;
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  return (
    <div className="">
      <nav className="w-full flex justify-end lg:pb-2 md:pb-2 lg:p-10 md:p-10  p-2  bg-gray-800 md:bg-transparent lg:bg-transparent">
        {/* <LangDropDown  /> */}
      </nav>
      <div className="w-full h-screen flex justify-center items-center  ">
        <div className="flex flex-col justify-center items-center px-10 py-8 lg:-mt-9 md:-mt-9 w-full h-full lg:w-[24rem] lg:h-max md:w-[24rem] md:h-max bg-gray-800 rounded-md gap-5">
          {/* --------title of the form------------ */}
          <label className="w-full h-max font-semibold text-gray-400 text-center font-yekanReg text-2xl">
            {t("login")}
          </label>

          {/* -------------mobile or em ail inputs gonna render here------------- */}
          {i18n.language == "fa" ? (
            <>
              <label
                htmlFor=""
                className="w-full text-right text-slate-200 font-yekanReg text-md"
              >
                شماره همراه خود را وارد کنید
              </label>
              <input
                type="text"
                name="mobile"
                autoComplete="false"
                // ref={mobileRef}
                value={mobile}
                onKeyDown={handleKeyDown}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="09-- --- ----"
                className={` text-left font-yekanReg w-full h-8 bg-slate-200 border-none outline-none py-5 px-3 text-slate-900 rounded-md`}
              />
            </>
          ) : (
            <>
              <label
                htmlFor=""
                className="w-full  text-slate-200 font-yekanReg text-md"
              >
                {t("email")}{" "}
              </label>
              <input
                type="email"
                name="email"
                autoComplete="false"
                // ref={emailRef}
                onKeyDown={handleKeyDown}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("email")}
                className={` ${
                  i18n.language === "en" ? "text-left" : "text-right"
                } font-yekanReg  w-full h-8 bg-slate-200 border-none outline-none py-5 px-3 text-slate-900 rounded-md`}
              />
            </>
          )}

          {/* ----------------err message place----------------------- */}
          <input
            ref={messageRef1}
            type="text"
            disabled
            className={` ${
              i18n.language === "en" ? "text-left" : "text-right"
            } text-[.7em] text-orange-500 bg-transparent`}
          />

          {/* --------submit button-------------------------- */}
          <button
            type="submit"
            onClick={handleSubmit}
            ref={sendRef}
            className="w-full  flex items-center justify-center p-5 h-8 bg-primary hover:bg-blue-400 transition-all text-slate-200 rounded-md font-yekanReg"
          >
            {t("send")}
          </button>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
