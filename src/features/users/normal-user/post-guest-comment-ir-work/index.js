import { useContext, useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import copy from "copy-to-clipboard";
import { useTranslation } from "react-i18next";
import i18n from "i18next";
import {
  // getWorkDetails,
  postGuestCommentIRWork,
  postGuestCommentInternationalWork,
} from "../../../../core/api/servises/users";
import {
  getListGuestCommentsWork,
  getListJurorCommentsWork,
  publicApi,
} from "../../../../core/api/servises/general";
import { AuthContext } from "../../../../gard/context/AuthContext";
import { OtpContext } from "../../../../gard/context/OtpContext";
import {
  getWorkDetails,
  postOtpVerify,
} from "../../../../core/api/servises/general";
import Modal from "../../../../components/modal/Modal";
import WorkItem from "../../../common/work-items";
import Tab from "../../../../components/Tab";
import CommentBox from "../../../common/comment-box";
import ChangeLanguageDropDown from "../../../../components/DropDowns/ChangeLanguageDropDown";
import { LangContext } from "../../../../gard/context/LangContext";
import PublicDropDown from "../../../../components/DropDowns/PublicDropDown";
 
function PostGuestCommentIRWork() {
  const { t } = useTranslation();
  const { tracking_code, unique_key } = useParams();
  const { userToken } = useContext(AuthContext);
  const { changeLanguage } = useContext(LangContext);
  // const { isSendOtp, setIsSendOtp } = useContext(OtpContext);
  // console.log('changeLanguage-=-=-==-=',changeLanguage)
  // const currentLanguage = window.localStorage.getItem("current_Language");
  const [otpUnique_key, setOtpUnique_key] = useState("");
  const [isShowMore, setIsShowMore] = useState(false);

  //form inputs
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [score, setScore] = useState(10);
  const [isSendOtp, setIsSendOtp] = useState(false);
  const [isSubmited, setIsSubmited] = useState(false);
  const [phoneNum, setPhoneNum] = useState("");
  const [code, setCode] = useState("");

  const [isOpenOtpModal, setIsOpenOtpModal] = useState(false);
  const [isOpenInfoModal, setIsOpenInfoModal] = useState(false);

  const [inView, setInView] = useState(1);
  const item = [
    { id: 1, title: t("jurorCount"), content: "test1" },
    { id: 2, title: t("peoples"), content: "test2" },
  ];
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [apiCurrenPage, setApiCurrenPage] = useState(1);
  const [jurorComments, setJurorComments] = useState();
  const [guestComments, setGuestComments] = useState();

  const [datas, setDatas] = useState([]);
  const getDatas = async (page = null) => {
    const result = await publicApi()
      .then(function (response) {
        setDatas(response);
      })
      .catch(function (error) {
        // console.log("error", error.response.data.status);
        toast.error(`${error.response.data.status.message}`);
      });
    return result;
  };

  const showJurorComment = async (unique_key) => {
    const showResult = await getListJurorCommentsWork(
      unique_key,
      apiCurrenPage,
      itemsPerPage
    )
      .then(function (response) {
        setJurorComments(response);
        // setIsLoading(false);
      })
      .catch(function (err) {
        //console.log("error", err);
      });
    return showResult;
  };

  const showGuestComment = async (unique_key) => {
    const showResult = await getListGuestCommentsWork(
      unique_key,
      apiCurrenPage,
      itemsPerPage
    )
      .then(function (response) {
        setGuestComments(response);
        // setIsLoading(false);
      })
      .catch(function (err) {
        //console.log("error", err);
      });
    return showResult;
  };

  const [showDetails, setShowDetails] = useState();

  const storeIRItem = async (e) => {
    e.preventDefault();
    setIsSubmited(true);

    const formData = new FormData();
    // formData.append("title", title);
    formData.append("name", name);
    formData.append("mobile", mobile);
    formData.append("description", description);
    formData.append("score", score);

    const createResult = await postGuestCommentIRWork(unique_key, formData)
      .then(function (response) {
        // console.log("response result : ", response);
        if (response.status) {
          setIsSubmited(false);
          document.getElementById("my_modal_4").close();
          document.getElementById("my_modal_5").showModal();
          toast.success(`${response?.status?.message}`);
          setIsOpenOtpModal(true);
          setIsOpenInfoModal(false);
          setOtpUnique_key(response?.data?.unique_key);
          setName("");
          setMobile("");
          setEmail("");
          setDescription("");
          setScore("");
          // setIsSendOtp(false)
        } else {
          // document.getElementById("my_modal_4").close()
          // setIsOpenOtpModal(false)
          // setIsSubmited(false);
          // setIsOpenInfoModal(false);
          // setName("");
          // setMobile("");
          // setEmail("");
          // setDescription("");
          // setScore("");
          // setIsSendOtp(false)
        }
        // getDatas()
      })
      .catch(function (error) {
        // console.log("error", error.response.data.status);
        toast.error(`${error.response.data.status.message}`);
        // setIsOpenInfoModal(false);
        setIsSubmited(false);
        // setName("");
        // setMobile("");
        // setEmail("");
        // setDescription("");
        // setScore("");
        // setIsSendOtp(false)
      });

    return createResult;
  };

  const storeInternationalItem = async (e) => {
    e.preventDefault();
    setIsSubmited(true);
    const formData = new FormData();
    // formData.append("title", title);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("description", description);
    formData.append("score", score);
    // formData.append("lang", lang);
    // for (let i = 0; i < image.length; i++) {
    //   formData.append("image[]", image[i]);
    // }
    // for (let i = 0; i < video.length; i++) {
    //   formData.append("video[]", video[i]);
    // }

    const createResult = await postGuestCommentInternationalWork(
      unique_key,
      formData
    )
      .then(function (response) {
        // console.log("response result : ", response);
        if (response.status) {
          toast.success(`${response.status.message}`);
          document.getElementById("my_modal_4").close();
          document.getElementById("my_modal_5").showModal();
          setIsOpenOtpModal(true);
          // setIsOpenInfoModal(false);
          setIsSubmited(false);
          setName("");
          setMobile("");
          setEmail("");
          setDescription("");
          setScore("");
        } else {
          // setIsOpenOtpModal(false)
          setIsSubmited(false);
          // setIsOpenInfoModal(false);
          // setName("");
          // setMobile("");
          // setEmail("");
          // setDescription("");
          // setScore("");
          // setIsSendOtp(false)
        }
        // getDatas()
      })
      .catch(function (error) {
        // console.log("error", error.response.data.status);
        toast.error(`${error.response.data.status.message}`);
        // setIsOpenInfoModal(false);
        setIsSubmited(false);
        // setName("");
        // setMobile("");
        // setEmail("");
        // setDescription("");
        // setScore("");
        // setIsSendOtp(false)
      });
    return createResult;
  };

  const showItemInfo = async (tracking_code) => {
    const showResult = await getWorkDetails(tracking_code)
      .then(function (response) {
        setShowDetails(response?.data);
      })
      .catch(function (err) {
        console.log("error", err);
      });
    return showResult;
  };

  useEffect(() => {
    showItemInfo(tracking_code);
    showJurorComment(unique_key);
    showGuestComment(unique_key);
    getDatas();
  }, []);

  // console.log("showDetails--------------->", showDetails);
  // console.log("datas--------------->", datas);
  // console.log("jurorComments--------------->", jurorComments);
  // http://localhost:3000/work/informatin/yLVGzhK9/825439176

  const sendOtp = async (e) => {
    e.preventDefault();
    setIsSendOtp(true);
    const formData = new FormData();
    formData.append("unique_key", otpUnique_key);
    formData.append("code", code);

    const createResult = await postOtpVerify(unique_key, formData)
      .then(function (response) {
        // console.log("response result : ", response);
        if (response.status) {
          document.getElementById("my_modal_5").close();
          toast.success(`${response.status.message}`);
          setIsSendOtp(false);
          // setIsOpenOtpModal(false);
          showJurorComment(unique_key);
          showGuestComment(unique_key);
          setIsSubmited(false);
        } else {
          // document.getElementById("my_modal_5").close();

          showJurorComment(unique_key);
          showGuestComment(unique_key);
          setIsSubmited(false);
          // setIsOpenOtpModal(false);
          setIsSendOtp(false);
        }
        // getDatas()
      })
      .catch(function (error) {
        // document.getElementById("my_modal_5").close();

        // console.log("error", error.response.data.status);
        toast.error(`${error.response.data.status.message}`);
        setIsSubmited(false);
      });

    return createResult;
  };

  const filterFile = showDetails?.files?.filter(
    (f) =>
      f?.extension == "png" ||
      f?.extension == "jpg" ||
      f?.extension == "gif" ||
      f?.extension == "jpeg" ||
      f?.extension == "mp4"
  );

  const filterDownloadableFiles = showDetails?.files?.filter(
    (f) =>
      f?.extension == "pdf" ||
      f?.extension == "ppt" ||
      f?.extension == "pptx" ||
      f?.extension == "doc" ||
      f?.extension == "docx"
  );
  // console.log("filterFile", filterFile);
  // console.log("filterDownloadableFiles", filterDownloadableFiles);
  var pageUrl;
  if (typeof window !== "undefined") {
    pageUrl = window.location.href;
    // browser code
  }
  // console.log("pageUrl", pageUrl);

  const textRef = useRef();

  //Function to add text to clipboard
  const copyToClipboard = () => {
    // Text from the html element
    let copyText = textRef.current.value;
    // Adding text value to clipboard using copy function
    let isCopy = copy(copyText);

    //Dispalying notification
    if (isCopy) {
      toast.success(t("copied"));
    }
  };
  const [visible, setVisible] = useState(3);
  const showMoreBtn = () => {
    setVisible((prev) => prev + 3);
  };

  const [visibleT, setVisibleT] = useState(3);
  const showMoreBtnT = () => {
    setVisibleT((prev) => prev + 3);
  };

  return (
    <> 
      <div
        style={{ direction: "rtl !important" }}
        className={`${
          i18n.language == "fa" ||
          i18n.language == "fa" ||
          (i18n.language == "fa" && "!rtl")
        } w-full flex flex-col items-center justify-start`}
      >
        <section className=" w-[95%] lg:w-[75%] mt-10 flex  items-center justify-between  ">
          <div className="">
            {/* <ChangeLanguageDropDown /> */}
            <PublicDropDown />
          </div>
        </section>
        <div className="w-32 lg:w-[12.5vw] lg:h-[9.309895833333334vw] mb-8 lg:mb-[3vw]">
          <img
            className="w-full h-full object-contain"
            src={`${datas?.data?.base_url}/${datas?.data?.logo}`}
            alt="DashWind Logo"
          />
        </div>

        <section className="flex flex-col items-center justify-start w-[95%] lg:w-[75%] rounded-xl shadow-xl py-3 px-5 lg:py-[2.4088541666666665vw] lg:px-[3.3854166666666665vw] gap-10 lg:gap-[2.34375vw]">
          <div className=" w-full flex justify-between items-center">
            <div className="flex flex-col gap-2.5 lg:gap-[0.6510416666666666vw]">
              <div className="flex items-center gap-2 lg:gap-[0.7161458333333334vw]">
                <h1 className="line-clamp-1 w-32 lg:w-max font-danaBold lg:font-danaBlack text-[#333332] text-sm leading-5 lg:text-[1.3020833333333333vw] lg:leading-[1.8619791666666667vw] ">
                  {showDetails?.title}
                </h1>
                <div className="">
                  {showDetails?.type == "2" ? (
                    <div className=" bg-yellow-400 text-white text-xs lg:text-[0.9114583333333334vw] gap-1.5 lg:gap-[0.54vw] py-3 px-2 lg:py-[1.0416666666666667vw] lg:px-[1.0416666666666667vw] font-danaBold flex items-center badge">
                      <span className="mt-1">{t("likeWork")}</span>
                      <span>
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clipPath="url(#clip0_12_1594)">
                            <path
                              d="M9.99992 5.83327C11.768 5.83327 13.4637 6.53565 14.714 7.78589C15.9642 9.03614 16.6666 10.7318 16.6666 12.4999C16.6666 14.268 15.9642 15.9637 14.714 17.214C13.4637 18.4642 11.768 19.1666 9.99992 19.1666C8.23181 19.1666 6.53612 18.4642 5.28587 17.214C4.03563 15.9637 3.33325 14.268 3.33325 12.4999C3.33325 10.7318 4.03563 9.03614 5.28587 7.78589C6.53612 6.53565 8.23181 5.83327 9.99992 5.83327ZM9.99992 7.49994C8.67384 7.49994 7.40207 8.02672 6.46438 8.96441C5.5267 9.90209 4.99992 11.1739 4.99992 12.4999C4.99992 13.826 5.5267 15.0978 6.46438 16.0355C7.40207 16.9732 8.67384 17.4999 9.99992 17.4999C11.326 17.4999 12.5978 16.9732 13.5355 16.0355C14.4731 15.0978 14.9999 13.826 14.9999 12.4999C14.9999 11.1739 14.4731 9.90209 13.5355 8.96441C12.5978 8.02672 11.326 7.49994 9.99992 7.49994ZM9.99992 8.74994L11.1024 10.9833L13.5666 11.3416L11.7833 13.0791L12.2041 15.5341L9.99992 14.3749L7.79575 15.5333L8.21658 13.0791L6.43325 11.3408L8.89742 10.9824L9.99992 8.74994ZM14.9999 1.6666V4.1666L13.8641 5.11494C12.9215 4.62042 11.8925 4.3123 10.8333 4.20744V1.6666H14.9999ZM9.16658 1.66577V4.20744C8.10771 4.31214 7.07894 4.61998 6.13658 5.1141L4.99992 4.1666V1.6666L9.16658 1.66577Z"
                              fill="white"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_12_1594">
                              <rect width="20" height="20" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </span>

                      {/* <IoIosStar  /> */}
                    </div>
                  ) : showDetails?.type == "1" ? (
                    <div className=" badge-ghost text-xs lg:text-[0.9114583333333334vw] gap-1.5 lg:gap-[0.5vw] py-3 px-2 lg:py-[1.0416666666666667vw] lg:px-[1.0416666666666667vw] font-danaBold flex items-center badge">
                      <span className="mt-1">{t("normalWork")}</span>
                      <span>
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clipPath="url(#clip0_12_1594)">
                            <path
                              d="M9.99992 5.83327C11.768 5.83327 13.4637 6.53565 14.714 7.78589C15.9642 9.03614 16.6666 10.7318 16.6666 12.4999C16.6666 14.268 15.9642 15.9637 14.714 17.214C13.4637 18.4642 11.768 19.1666 9.99992 19.1666C8.23181 19.1666 6.53612 18.4642 5.28587 17.214C4.03563 15.9637 3.33325 14.268 3.33325 12.4999C3.33325 10.7318 4.03563 9.03614 5.28587 7.78589C6.53612 6.53565 8.23181 5.83327 9.99992 5.83327ZM9.99992 7.49994C8.67384 7.49994 7.40207 8.02672 6.46438 8.96441C5.5267 9.90209 4.99992 11.1739 4.99992 12.4999C4.99992 13.826 5.5267 15.0978 6.46438 16.0355C7.40207 16.9732 8.67384 17.4999 9.99992 17.4999C11.326 17.4999 12.5978 16.9732 13.5355 16.0355C14.4731 15.0978 14.9999 13.826 14.9999 12.4999C14.9999 11.1739 14.4731 9.90209 13.5355 8.96441C12.5978 8.02672 11.326 7.49994 9.99992 7.49994ZM9.99992 8.74994L11.1024 10.9833L13.5666 11.3416L11.7833 13.0791L12.2041 15.5341L9.99992 14.3749L7.79575 15.5333L8.21658 13.0791L6.43325 11.3408L8.89742 10.9824L9.99992 8.74994ZM14.9999 1.6666V4.1666L13.8641 5.11494C12.9215 4.62042 11.8925 4.3123 10.8333 4.20744V1.6666H14.9999ZM9.16658 1.66577V4.20744C8.10771 4.31214 7.07894 4.61998 6.13658 5.1141L4.99992 4.1666V1.6666L9.16658 1.66577Z"
                              fill="#333332"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_12_1594">
                              <rect width="20" height="20" fill="#333332" />
                            </clipPath>
                          </defs>
                        </svg>
                      </span>
                      {/* <IoIosStarOutline  /> */}
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2 lg:gap-[0.390625vw]">
                <div className="w-6 h-6 lg:w-[1.5vw] lg:h-[1.5vw] border  rounded-full ">
                  <img
                    className="w-full h-full object-cover"
                    src="/icons/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.webp"
                    alt="DashWind Logo"
                  />
                </div>
                <span className="font-danaMedium text-[#2E274480] text-xs leading-5 lg:text-[1vw] lg:leading-[1.3033854166666667vw]">
                  {showDetails?.user?.name}
                </span>
              </div>
            </div>
            <div
              // style={{ backgroundImage: "url(/icons/star-smile-fill.png)" }}
              className="z-0 flex flex-col justify-end relative w-[75px] h-20 lg:w-[6.6vw] lg:h-[5.9vw] bg-no-repeat bg-center bg-cover  "
            >
              <img
                className="-z-50 w-[75px] h-20 lg:w-[6.6vw] lg:h-[5.9vw] absolute inset-0"
                src="/icons/star-smile-fill.png"
                alt="DashWind Logo"
              />
              <span className=" z-50 mb-7 lg:mb-[1.3020833333333333vw] font-danaBold text-[#333332] text-xl leading-3 lg:text-[2vw] lg:leading-[2vw] ">
                {showDetails?.score}%
              </span>
              <span className="absolute -right-5 lg:-right-[0.45vw] z-50 font-danaMedium text-[#2E274480] text-sm leading-5 lg:text-[0.9114583333333334vw] lg:leading-[1.3033854166666667vw]">
                {t("judgesScore")}
              </span>
            </div>
          </div>

          {filterFile?.length >= 1 && (
            <div className="z-0 relative w-full h-[60vh] lg:h-[36.783854166666664vw] rounded-xl border flex justify-center">
              {filterFile?.length == 1 ? (
                <>
                  {filterFile?.map((f, i) => (
                    <div
                      key={i}
                      className="!h-full !inline-flex !justify-center "
                    >
                      <div className="!h-full !w-full lg:!w-[80%] rounded-xl lg:rounded-none overflow-hidden">
                        {/* <img
                        className="w-full h-full object-cover"
                        src={f?.path}
                        alt="DashWind Logo"
                      /> */}
                        {f?.extension === "png" ||
                        f?.extension === "jpg" ||
                        f?.extension === "gif" ||
                        f?.extension === "jpeg" ? (
                          <img
                            src={f.path}
                            className="w-full h-full object-contain"
                            alt=""
                          />
                        ) : f?.extension === "mp4" ? (
                          <>
                            <video width="750" height="500" controls>
                              <source
                                className="w-full h-full object-contain"
                                src={f.path}
                                type="video/mp4"
                              />
                            </video>
                          </>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <>
                  <div className="z-50 absolute left-2 right-2 lg:left-[2%] lg:right-[2%] top-[50%] bottom-[50%] flex justify-between items-center">
                    <button
                      type="button"
                      className="next_btn bg-white w-10 h-10 lg:w-[2.9947916666666665vw] lg:h-[2.9947916666666665vw] rounded-xl shadow-[0px_0px_40px_0px_#4D486729] flex items-center justify-center"
                    >
                      <img
                        className="w-[18px] lg:w-[1.171875vw]"
                        src="/icons/arrow-left-line (1).png"
                        alt="DashWind Logo"
                      />
                    </button>
                    <button
                      type="button"
                      className="prev_btn bg-white w-10 h-10 lg:w-[2.9947916666666665vw] lg:h-[2.9947916666666665vw] rounded-xl shadow-[0px_0px_40px_0px_#4D486729] flex items-center justify-center"
                    >
                      <img
                        className="w-[18px] lg:w-[1.171875vw]"
                        src="/icons/arrow-left-line.png"
                        alt="DashWind Logo"
                      />
                    </button>
                  </div>
                  <Swiper
                    pagination={{
                      type: "fraction",
                    }}
                    modules={[Pagination, Navigation]}
                    navigation={{
                      prevEl: ".prev_btn",
                      nextEl: ".next_btn",
                    }}
                    className="mySwiper work_slider !w-full !h-full"
                  >
                    {filterFile?.map((f, i) => (
                      <SwiperSlide
                        key={i}
                        className="!h-full !inline-flex !justify-center "
                      >
                        <div className="!h-full !w-full lg:!w-[80%] rounded-xl lg:rounded-none overflow-hidden">
                          {f?.extension === "png" ||
                          f?.extension === "jpg" ||
                          f?.extension === "gif" ||
                          f?.extension === "jpeg" ? (
                            <img
                              src={f.path}
                              className="w-full h-full object-cover"
                              alt=""
                            />
                          ) : f?.extension === "mp4" ? (
                            <>
                              <video width="750" height="500" controls>
                                <source
                                  className="w-full h-full object-cover"
                                  src={f.path}
                                  type="video/mp4"
                                />
                              </video>
                            </>
                          ) : (
                            <></>
                          )}
                          {/* <img
                        className="w-full h-full object-cover"
                        src={f?.path}
                        alt="DashWind Logo"
                      /> */}
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </>
              )}
            </div>
          )}

          {showDetails?.description != null && (
            <div className="!w-full relative flex justify-center">
              <div
                className={`z-0 relative 
              !w-full ${
                isShowMore
                  ? "max-h-max lg:max-h-max pb-12"
                  : "max-h-[40vh] lg:max-h-[13.720703125vw] before:content-[''] before:w-full before:h-[50%] before:absolute before:bottom-0 before:left-0 before:right-0  before:bg-gradient-to-t before:from-white before:from-10%"
              }  rounded-xl border flex justify-center pt-3 px-5 lg:pt-[1.416015625vw] lg:px-[1.953125vw] overflow-hidden`}
              >
                <p className="!w-full text-justify tracking-wide font-danaMedium text-sm leading-6 lg:text-[0.97890625vw] lg:leading-[1.913671875vw] text-[#2E2744]">
                  {showDetails?.description}
                </p>
              </div>
              <button
                onClick={() => setIsShowMore((prev) => !prev)}
                type="button"
                className="absolute -bottom-4  bg-white px-3 lg:px-[1vw] h-12  lg:h-[2.9947916666666665vw] rounded-xl shadow-[0px_0px_40px_0px_#4D486729] flex items-center justify-center gap-1"
              >
                <span className="text-sm lg:text-[0.8vw] font-danaBlack">
                  {isShowMore ? t("close") : t("showAll")}
                </span>
                {isShowMore ? (
                  <img
                    className="transform rotate-180 w-[18px] lg:w-[1.171875vw]"
                    src="/icons/down.png"
                    alt="DashWind Logo"
                  />
                ) : (
                  <img
                    className="w-[18px] lg:w-[1.171875vw]"
                    src="/icons/down.png"
                    alt="DashWind Logo"
                  />
                )}
              </button>
            </div>
          )}

          <ul className="z-0 mt-6 lg:mt-[1.8229166666666667vw] relative w-full rounded-xl border grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 py-5 px-4 lg:py-[1.416015625vw] lg:px-[1.953125vw]">
            <li className="flex justify-start lg:justify-center">
              <WorkItem
                title={t("category")}
                icon="stack-fill.png"
                value={showDetails?.category?.name}
              />
            </li>
            <li className="flex justify-start lg:justify-center">
              <WorkItem
                title={t("popularComments")}
                icon="account-box-line.png"
                value={showDetails?.public_comment}
              />
            </li>
            <li className="flex justify-start lg:justify-center">
              <WorkItem
                title={t("languageOfWork")}
                icon="Group.png"
                value={
                  showDetails?.lang == "fa"
                    ? `${t("persian")}`
                    : showDetails?.lang == "ar"
                    ? `${t("arabic")}`
                    : `${t("englishBir")}`
                }
              />
            </li>
            <li className="flex justify-start lg:justify-center">
              <WorkItem
                title={t("country")}
                icon="flag-2-line.png"
                value={showDetails?.country}
              />
            </li>
            <li className="flex justify-start lg:justify-center">
              <WorkItem
                title={t("city")}
                icon="bubble-chart-fill.png"
                value={showDetails?.city}
              />
            </li>
          </ul>

          {filterDownloadableFiles?.length >= 1 && (
            <div className="w-full !flex !flex-col gap-4 lg:gap-[1.171875vw] !items-start">
              <h3 className="text-right font-danaBold lg:font-danaBlack text-[#333332] text-base leading-5 lg:text-[1.5vw] lg:leading-[1.8619791666666667vw] ">
                {t("uploadedFiles")}
              </h3>
              <ul className="flex flex-wrap items-center justify-start gap-2">
                {filterDownloadableFiles?.map((f, i) => (
                  <li key={i} className="">
                    <Link
                      to={f.path}
                      download="Example-PDF-document"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 flex-wrap rounded-xl border-dashed border-[#5fe179] p-5 bg-[#C8DA59]"
                    >
                      <div className=" w-4 lg:w-[1.6vw]  ">
                        <img
                          className="w-full"
                          src="/icons/file-download-fill.png"
                          alt="DashWind Logo"
                        />
                      </div>
                      <div className="">
                        <h3 className="text-sm lg:text-[0.8vw] font-danaBlack">
                          {/* {f.name} */}
                          {t("file")} {i + 1}
                        </h3>
                        <span className="font-danaMedium text-[#2E274480] text-sm leading-4 lg:text-[0.8114583333333334vw] lg:leading-[1vw]">
                          {f.extension}.
                        </span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>

        <section className="w-[95%] lg:w-[75%] flex items-center justify-end gap-2 py-4 mb-8 lg:mb-[3.9vw]">
          <div className=" w-[17.25px] lg:w-[1.123046875vw]  ">
            <img
              className="w-full"
              src="/icons/share.png"
              alt="DashWind Logo"
            />
          </div>
          <label
            htmlFor=""
            onClick={copyToClipboard}
            className="text-[#848484] text-base lg:text-[0.9114583333333334vw] cursor-pointer"
          >
            {t("share")}
          </label>

          <input
            value={pageUrl}
            disabled
            type="text"
            className="hidden"
            ref={textRef}
          />

          {/* <button onClick={copyToClipboard}>Copy</button> */}

          {/* <br />
      <br />
      <textarea placeholder="Paste here the copied text"></textarea> */}
        </section>

        <section className="w-[95%] lg:w-[75%]  py-4 mb-8 lg:mb-[3vw]">
          <div className="flex items-center justify-between">
            <h3 className="mb-3 text-right font-danaBold lg:font-danaBlack text-[#333332] text-xl leading-5 lg:text-[2.0833333333333335vw] lg:leading-[2.9791666666666665vw] ">
              {t("comments")}
            </h3>
            {inView == 2 && (
              // setIsOpenInfoModal(true);
              <button
                onClick={() => {
                  document.getElementById("my_modal_4").showModal();
                }}
                type="button"
                className=" bg-white px-3 lg:px-[1vw] h-12  lg:h-[2.9947916666666665vw] rounded-xl shadow-[0px_0px_40px_0px_#4D486729] flex items-center justify-center gap-1"
              >
                <img
                  className="w-[18px] lg:w-[1.171875vw]"
                  src="/icons/add-line.png"
                  alt="DashWind Logo"
                />
                <span className="text-sm lg:text-[0.8vw] font-danaBlack">
                  {t("addComments")}
                </span>
              </button>
            )} 
          </div>
          <div className=" w-full">
            {/* <Tab item={item} inView={inView} setInView={setInView} cssClass=' lg:!w-[50%]' />
            {inView == 1 && <div className="">1</div>}
            {inView == 2 && <div className="">2</div>} */}
            <div className="border-b border-[#DBDBDB] !pb-0 w-full">
              {item.map((it, i) => (
                <div
                  key={i}
                  onClick={() => setInView(it.id)}
                  className={`tab font-danaBold text-base lg:text-[1.3020833333333333vw] border-b border-transparent ${
                    inView === it.id
                      ? "  tab-active text-[#333332] border-[#333332]"
                      : " text-[#ADADAD] "
                  } `}
                >
                  {it.title}
                </div>
              ))}
            </div>
            {inView == 1 && (
              <div className=" pt-10 lg:pt-[2.4739583333333335vw] flex flex-col gap-6 lg:gap-[1.2369791666666667vw] ">
                {jurorComments?.data?.data?.length >= 1 ? (
                  jurorComments?.data?.data
                    ?.slice(0, visible)
                    .map((cmmnt, i) => (
                      <CommentBox
                        lang={cmmnt?.lang}
                        unique_key={cmmnt?.unique_key}
                        score={cmmnt?.score}
                        updated_at={cmmnt?.updated_at}
                        name={cmmnt?.juror?.name}
                        description={cmmnt?.description}
                        key={i}
                      />
                    ))
                ) : (
                  <div className="flex justify-center items-center py-5">
                    <h6 className="font-danaMedium text-[#2E274480] text-lg leading-5 lg:text-[1vw] lg:leading-[1.3033854166666667vw]">
                      {t("emptyComment")}
                    </h6>
                  </div>
                )}

                {jurorComments?.data?.data?.length > visibleT ? (
                  <>
                    <button
                      onClick={showMoreBtnT}
                      type="button"
                      className="absolute -bottom-4 left-[45%] bg-white px-3 lg:px-[1vw] h-12  lg:h-[2.9947916666666665vw] rounded-xl shadow-[0px_0px_40px_0px_#4D486729] flex items-center justify-center gap-1"
                    >
                      <span className="text-sm lg:text-[0.8vw] font-danaBlack">
                        {t("showAll")}
                      </span>
                      <img
                        className="w-[18px] lg:w-[1.171875vw]"
                        src="/icons/arrow-left-line (2).png"
                        alt="DashWind Logo"
                      />
                    </button>
                    {/* <div className="flex justify-center my-5">
                        <button
                        onClick={showMoreBtn} 
                        className={`  hover:bg-ad9 border-a31 text-a31 active:bg-a31 active:text-white border font-yekanBakhtFaNumRegular transition-all duration-500 text-[14px] px-4 py-2 lg:px-5 lg:py-2 `}>
                             مشاهده همه  <BiArrowBack className='float-left mt-1 mr-1' />
                        </button>
                       
                        </div> */}
                  </>
                ) : (
                  <></>
                )}
              </div>
            )}
            {/* onClick={showMoreBtn} */}
            {inView == 2 && (
              <div className="relative pt-10 lg:pt-[2.4739583333333335vw] flex flex-col gap-6 lg:gap-[1.2369791666666667vw] ">
                {guestComments?.data?.data?.length >= 1 ? (
                  guestComments?.data?.data
                    ?.slice(0, visible)
                    .map((cmmnt, i) => (
                      <CommentBox
                        lang={cmmnt?.lang}
                        unique_key={cmmnt?.unique_key}
                        score={cmmnt?.score}
                        updated_at={cmmnt?.updated_at}
                        name={cmmnt?.guest?.name}
                        description={cmmnt?.description}
                        key={i}
                      />
                    ))
                ) : (
                  <div className="flex justify-center items-center py-5">
                    <h6 className="font-danaMedium text-[#2E274480] text-lg leading-5 lg:text-[1vw] lg:leading-[1.3033854166666667vw]">
                      {t("emptyComment")}
                    </h6>
                  </div>
                )}

                {guestComments?.data?.data?.length > visible ? (
                  <>
                    <button
                      onClick={showMoreBtn}
                      type="button"
                      className="absolute -bottom-4 left-[35%] lg:left-[45%] bg-white px-3 lg:px-[1vw] h-12  lg:h-[2.9947916666666665vw] rounded-xl shadow-[0px_0px_40px_0px_#4D486729] flex items-center justify-center gap-1"
                    >
                      <span className="text-sm lg:text-[0.8vw] font-danaBlack">
                        {t("showAll")}
                      </span>
                      <img
                        className="w-[18px] lg:w-[1.171875vw]"
                        src="/icons/arrow-left-line (2).png"
                        alt="DashWind Logo"
                      />
                    </button>
                    {/* <div className="flex justify-center my-5">
                        <button
                        onClick={showMoreBtn} 
                        className={`  hover:bg-ad9 border-a31 text-a31 active:bg-a31 active:text-white border font-yekanBakhtFaNumRegular transition-all duration-500 text-[14px] px-4 py-2 lg:px-5 lg:py-2 `}>
                             مشاهده همه  <BiArrowBack className='float-left mt-1 mr-1' />
                        </button>
                       
                        </div> */}
                  </>
                ) : (
                  <></>
                )}
              </div>
            )}
          </div>
        </section>
        <section className="w-full flex items-center justify-center bg-[#F2F2F2] text-[#8D8D85] py-4 lg:py-[1.4895833333333333vw]">
          <span className="text-xs leading-5 lg:text-[0.85vw] ">
            {" "}
            تمامی حقوق مادی و معنوی این سایت متعلق به دبیرخانه میباشد{" "}
          </span>
        </section>
      </div>

      <dialog id="my_modal_4" className="modal">
        <div className="modal-box w-11/12 lg:w-6/12 max-w-7xl">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          {/* <h3 className="font-bold text-lg">Hello!</h3> */}
          <section className=" py-6 lg:py-[1.4vw]">
            <div className="text-center flex flex-col items-center justify-center gap-2 w-full lg:w-[60%]  mx-auto mb-7 lg:mb-[2vw]">
              <div className="text-center flex flex-wrap justify-center items-center gap-2  text-lg lg:text-[1.26953125vw]  ">
                <span>{t("registerAcomment")}</span>
                <span className=" text-[#C8DA59]">{showDetails?.title}</span>
              </div>
              <h6 className="text-sm  left-6 lg:leading-7">
                {t("shareComment")}
              </h6>
            </div>
            <form
              method="post"
              onSubmit={
                i18n.language == "fa" ? storeIRItem : storeInternationalItem
              }
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 w-full lg:w-[70%]  mx-auto"
            >
              <div className="">
                {/* <h4 className="mb-2 text-sm">{t("name")}</h4> */}
                <input
                  type="text"
                  name="name"
                  // value={score}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t("name")}
                  className="input  input-bordered w-full text-sm  active:outline-none focus:outline-none bg-[#F5F5F5] placeholder:font-danaMedium border-none border-0"
                />
              </div>
              <div className="">
                {/* <h4 className="mb-2 text-sm">{t("userPhone")}</h4> */}
                {i18n.language == "fa" ? (
                  <>
                    <input
                      type="text"
                      name="mobile"
                      // value={score}
                      onChange={(e) => setMobile(e.target.value)}
                      placeholder={t("userPhone")}
                      maxLength={11}
                      minLength={11}
                      className="input  input-bordered w-full text-sm  active:outline-none focus:outline-none bg-[#F5F5F5] placeholder:font-danaMedium border-none border-0"
                    />
                  </>
                ) : (
                  <>
                    <input
                      type="text"
                      name={t("userEmail")}
                      // value={description}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t("userEmail")}
                      className="input  input-bordered w-full text-sm  active:outline-none focus:outline-none bg-[#F5F5F5] placeholder:font-danaMedium border-none border-0"
                    />
                  </>
                )}
              </div>
              <div className="col-span-1 md:col-span-2 lg:col-span-2 ">
                <h4 className="mb-2 text-sm">{t("score")}</h4>
                {score}
                <input
                  onChange={(e) => {
                    setScore(e.target.value);
                    // console.log("score", score);
                  }}
                  type="range"
                  min={0}
                  max={10}
                  value={score}
                  className="rtl range range-[#C8DA59] text-[#C8DA59] "
                />
              </div>
              <div className="col-span-1 md:col-span-2 lg:col-span-2 ">
                <h4 className="mb-2 text-sm">{t("yourComment")}</h4>
                <textarea
                  type="text"
                  name="description"
                  // value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder={t("description")}
                  rows="4"
                  className="input h-28 input-bordered w-full text-sm py-3 active:outline-none focus:outline-none bg-[#F5F5F5] placeholder:font-danaMedium border-none border-0"
                />
              </div>

              <div className="w-full col-span-1 md:col-span-2 lg:col-span-2 flex items-center justify-center">
                <button
                  type="submit"
                  // onClick={() =>

                  //   document.getElementById("my_modal_5").showModal()
                  // }
                  className="btn btn-[#C8DA59] text-white bg-[#C8DA59] hover:bg-[#a7b64a] flex justify-center items-center"
                >
                  {isSubmited ? (
                    <span className="loading loading-dots font-medium loading-md"></span>
                  ) : (
                    <>{t("registerComment")}</>
                  )}
                </button>
              </div>
            </form>
          </section>
        </div>
      </dialog>
      {/* {isOpenInfoModal ? (
      ) : (
        <></>
      )} */}

      <dialog id="my_modal_5" className="modal">
        <div className="modal-box w-11/12 lg:w-5/12 max-w-7xl">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          {/* <h3 className="font-bold text-lg">Hello!</h3> */}
          <section className=" py-6 lg:py-[1.7vw]">
            <div className="flex text-center flex-col items-center justify-center gap-2 w-full lg:w-[50%]  mx-auto mb-7 lg:mb-[2vw]">
              <div className=" flex items-center gap-2 text-center text-lg lg:text-[1.26953125vw]  ">
                <span>{t("registerAcomment")}</span>
                <span className=" text-[#C8DA59]">{showDetails?.title}</span>
              </div>
              <h6 className="text-sm left-6 lg:leading-7">
                {t("shareComment")}
              </h6>
            </div>
            <form
              method="post"
              onSubmit={sendOtp}
              className="grid grid-cols-1 gap-5 w-full lg:w-[55%]  mx-auto"
            >
              <div className=" ">
                <input
                  type="text"
                  name="code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder={t("verificationCode")}
                  className="input  input-bordered w-full text-sm  active:outline-none focus:outline-none bg-[#F5F5F5] placeholder:font-danaMedium border-none border-0"
                />
              </div>

              <div className="w-full  flex items-center justify-center">
                <button
                  type="submit"
                  className="btn btn-[#C8DA59] text-white bg-[#C8DA59] hover:bg-[#a7b64a] flex justify-center items-center"
                >
                  {isSendOtp ? (
                    <span className="loading loading-dots loading-md"></span>
                  ) : (
                    <>{t("One_timePassword")}</>
                  )}
                </button>
              </div>
            </form>
          </section>
        </div>
      </dialog>
      {/* {isOpenOtpModal ? (
      ) : (
        <></>
      )} */}
    </>
  );
}

export default PostGuestCommentIRWork;
