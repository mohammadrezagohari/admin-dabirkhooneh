import React, { useContext, useEffect, useState } from "react";
import { t } from "i18next";
import { useTranslation } from "react-i18next";
import {
  transToFa,
  transToEn,
  transToAr,
  transToCurrentLanguage,
} from "./../../../core/api/servises/translate";
import i18n from "../../../i18n";
import { LangContext } from "../../../gard/context/LangContext";
import { PublicLangContext } from "../../../gard/context/PublicLangContext";

function CommentBox({
  score,
  name,
  updated_at,
  translate,
  description,
  unique_key,
  lang,
}) {  
  // const { unique_key } = useParams();
  const { t } = useTranslation();
  const [isChange, setIsChange] = useState(true);
  const [isTranslation, setIsTranslation] = useState(false);
  const [isSkeleton, setIsSkeleton] = useState(true);
  const [isDefault, setIsDefault] = useState("");
  const [translation, setTranslation] = useState(isDefault);
  const { currentPublicLang} = useContext(PublicLangContext);
  const current = window.localStorage.getItem("public_current_Language") ?? currentPublicLang;
  console.log('current',current);
  //   const translateToFa = async (unique_key) => {
  //     const showResult = await transToFa(unique_key)
  //       .then(function (response) {
  //         setTranslation(response);
  //         // setJurorComments(response);
  //         // setIsLoading(false);
  //       })
  //       .catch(function (err) {
  //         //console.log("error", err);
  //       });
  //     return showResult;
  //   };
  //   const translateToAr = async (unique_key) => {
  //     console.log("unique_key--", unique_key);

  //     const showResult = await transToAr(unique_key)
  //       .then(function (response) {
  //         setTranslation(response);
  //         // setJurorComments(response);
  //         // setIsLoading(false);
  //         console.log("translation-=-=-", translation);
  //       })
  //       .catch(function (err) {
  //         //console.log("error", err);
  //       });
  //     return showResult;
  //   };
  //   const translateToEn = async (unique_key) => {
  //     const showResult = await transToEn(unique_key)
  //       .then(function (response) {
  //         // setJurorComments(response);
  //         // setIsLoading(false);
  //       })
  //       .catch(function (err) {
  //         //console.log("error", err);
  //       });
  //     return showResult;
  //   };

  //   useEffect(() => {
  //     translateToFa(unique_key);
  //     translateToAr(unique_key);
  //     translateToEn(unique_key);
  //   }, []);
  
  
  
  let currentLanguage = i18n.language;
  const translateToCurrentLanguage = async () => {
    // let getLang=getLanguage()
    // console.log("unique_key", unique_key);
    setIsChange(false);

    const showResult = await transToCurrentLanguage(current, unique_key)
      .then(function (response) {
        setIsTranslation(true);
        setIsDefault(response?.data?.original);
        setTranslation(response?.data?.translate);
        // console.log("translation --> translate", translation);
        // setTranslation(response?.data?.original);
        // if (lang==current && false) {
        //     // setIsTranslation(false)
        //     setTranslation(response?.data?.original);
        // } else {
        //     // setIsTranslation(true)
        //     setTranslation(response?.data?.translate);
        // }

        // console.log('current',current)
        // console.log('currentLanguage',currentLanguage)
        // console.log(" translation-=-=-", translation);
        // console.log("response -=-=-", response);
        // setJurorComments(response);
        // setIsLoading(false);
      })
      .catch(function (err) {
        //console.log("error", err);
      });
    return showResult;
  };

  const translateToCurrentLanguageT = async () => {
    // let getLang=getLanguage()
    // console.log("unique_key", unique_key);
    setIsChange(false);

    const showResult = await transToCurrentLanguage(current, unique_key)
      .then(function (response) {
        setIsTranslation(false);
        setTranslation(response?.data?.original);
        // console.log("translation --> original", translation);

        // setTranslation(response?.data?.translate);
      })
      .catch(function (err) {
        //console.log("error", err);
      });
    return showResult;
  };
  // translateToCurrentLanguage(current, unique_key);
  // translateToCurrentLanguageT(current, unique_key);
  useEffect(() => {
    // translateToCurrentLanguage(current, unique_key);
    // translateToCurrentLanguageT(current, unique_key);
    setTimeout(() => {
      setIsSkeleton(false);
    }, 3000);
  }, []);
  //   const currentLanguage = window.localStorage.getItem("current_Language");
  function formatDate(stringDate) {
    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    return new Date(stringDate).toLocaleDateString("fa-IR", options);
  }
  return (
    <div className="bg-white flex flex-col gap-2 lg:gap-[1vw] py-3 px-3 lg:py-[2.0182291666666665vw] lg:px-[1.5462239583333333vw] rounded-xl shadow-[0px_0px_40px_0px_#4D486729]">
      <div className="flex items-start justify-start flex-col lg:flex-row lg:items-center lg:justify-between ">
        {isSkeleton ? (
          <>
            <div className="flex gap-3 items-center">
              <div className="skeleton w-5 h-5 lg:w-[2.1484375vw] lg:h-[2.1484375vw] rounded-full shrink-0"></div>
              <div className="flex flex-col gap-3">
                <div className="skeleton h-4 w-40"></div>
                <div className="skeleton h-4 w-48"></div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center gap-2 lg:gap-[0.390625vw]">
            <div className="w-6 h-6 lg:w-[2.1484375vw] lg:h-[2.1484375vw] border  rounded-full ">
              <img
                className="w-full h-full object-cover"
                src="/icons/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.webp"
                alt="DashWind Logo"
              />
            </div>
            <div className="">
              <h4 className="text-sm lg:text-[0.87890625vw] font-danaBlack">
                {name}
              </h4>
              <div className="flex items-center gap-1">
                <span className="rtl font-danaMedium text-[#2E274480] text-xs leading-5 lg:text-[0.78125vw] lg:leading-[1.3033854166666667vw]">
                  {formatDate(updated_at)}
                </span>
                {currentLanguage == lang ? (
                  <></>
                ) : (
                  <span className="text-[#2E274480]">-</span>
                )}

                {/* disabled={currentLanguage} */}
                {/* isTranslation
                      ? translateToCurrentLanguageT
                      : translateToCurrentLanguage */}
                <button
                  disabled={currentLanguage == lang ? true : false}
                  onClick={() => {
                    if (isTranslation) {
                      translateToCurrentLanguageT();
                    } else {
                      translateToCurrentLanguage();
                    }
                    // setIsChange(false);
                  }}
                  type="button"
                  className={`flex items-center gap-1 font-danaMedium  ${
                    currentLanguage == lang ? "opacity-0" : "opacity-100"
                  } text-[#2E8BE1] text-xs leading-5 lg:text-[0.78125vw] lg:leading-[1.3033854166666667vw]`}
                >
                  <span>
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 13 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_12_1552)">
                        <path
                          d="M3.3675 3.7265C2.73002 4.38814 2.33975 5.24908 2.26229 6.16458C2.18482 7.08009 2.42489 7.99436 2.94213 8.75371C3.45937 9.51306 4.22226 10.0712 5.10256 10.3343C5.98285 10.5974 6.9269 10.5495 7.776 10.1985C7.8335 9.8235 7.7075 9.4635 7.656 9.3375C7.541 9.0575 7.162 8.579 6.5295 7.9155C6.3605 7.738 6.3715 7.6015 6.432 7.197L6.4385 7.1515C6.4795 6.8745 6.5485 6.7105 7.481 6.5625C7.955 6.4875 8.0795 6.6765 8.252 6.939L8.31 7.025C8.474 7.265 8.5955 7.32 8.779 7.403C8.8615 7.4405 8.964 7.488 9.1015 7.5655C9.4275 7.752 9.4275 7.9625 9.4275 8.4235V8.476C9.4275 8.6715 9.4085 8.8435 9.3785 8.993C9.76218 8.51146 10.0295 7.94787 10.1598 7.3461C10.29 6.74432 10.2796 6.12061 10.1294 5.52352C9.97918 4.92642 9.69317 4.37205 9.29365 3.90357C8.89413 3.43509 8.39188 3.06513 7.826 2.8225C7.5495 3.009 7.17 3.2735 7.0375 3.455C6.97 3.5475 6.874 4.021 6.5625 4.06C6.4815 4.07 6.372 4.063 6.256 4.0555C5.945 4.0355 5.52 4.008 5.384 4.3775C5.2975 4.6115 5.2825 5.2475 5.562 5.5775C5.607 5.63 5.6155 5.7275 5.585 5.837C5.545 5.9805 5.4645 6.068 5.439 6.086C5.391 6.058 5.295 5.9465 5.2295 5.871C5.073 5.6885 4.877 5.461 4.624 5.391C4.532 5.3655 4.431 5.3445 4.3325 5.3235C4.058 5.266 3.7475 5.2005 3.675 5.0465C3.622 4.9335 3.6225 4.778 3.6225 4.614C3.6225 4.4055 3.6225 4.17 3.5205 3.9415C3.48504 3.85995 3.43293 3.78672 3.3675 3.7265ZM6.25 11.5C3.4885 11.5 1.25 9.2615 1.25 6.5C1.25 3.7385 3.4885 1.5 6.25 1.5C9.0115 1.5 11.25 3.7385 11.25 6.5C11.25 9.2615 9.0115 11.5 6.25 11.5Z"
                          fill="#2E8BE1"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_12_1552">
                          <rect
                            width="12"
                            height="12"
                            fill="white"
                            transform="translate(0.25 0.5)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </span>

                  <span>
                    {currentLanguage == "ar"
                      ? isTranslation
                        ? t("originalLanguage")
                        : t("transToAr")
                      : currentLanguage == "fa"
                      ? isTranslation
                        ? t("originalLanguage")
                        : t("transToFa")
                      : isTranslation
                      ? t("originalLanguage")
                      : t("transToEn")}
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="my-3 lg:my-0">
          <div className=" rounded-full  h-6 lg:h-[1.8880208333333333vw] w-32 lg:w-[9.505208333333334vw] bg-transparent border">
            <div
              className={`bg-warning text-xs lg:text-[1.0416666666666667vw]  text-[#2E2744] font-danaBold text-center flex items-center gap-2 lg:gap-[0.390625vw] p-0.5 leading-none ${
                score == 100 ? "rounded-full" : "rounded-s-full"
              }  h-full w-full `}
              style={{ width: score ? `${score}%` : 0 }}
            >
              {" "}
              <img
                className="w-4 lg:w-[0.9114583333333334vw] ms-3 lg:-mt-1"
                src="/icons/Shape.png"
                alt="DashWind Logo"
              />
              <span>{score ? score : 0}%</span>
            </div>
          </div>
        </div>
      </div>

      {isSkeleton ? (
        <div className="skeleton h-10 w-full rounded-lg"></div>
      ) : (
        <p className="text-justify tracking-wide font-danaMedium text-sm leading-6 lg:text-[0.97890625vw] lg:leading-[1.913671875vw] text-[#2E2744]">
          {/* {translation} */}
          {/* {description} */}
          {/* {
            isTranslation == false || isTranslation==true? translation:description
          } */}
          {isChange ? description : translation}
        </p>
      )}
    </div>
  );
}

export default CommentBox;
