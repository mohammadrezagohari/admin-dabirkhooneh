import { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { IoPower, IoEyeOutline, IoReturnUpBack } from "react-icons/io5";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { IoIosList } from "react-icons/io";
import { SlQuestion } from "react-icons/sl";
import { GoTrash } from "react-icons/go";
import {
  getAssistanceCategoryList,
  getAssistanceJurorDelete,
  getAssistanceJurorSearch,
  getAssistanceMyJurorList,
  getJurorSearch,
  getUserAssistanceSearch,
  getUserJurorSearch,
  postAssistanceAddJurorNewCategory,
  postAssistanceInternalNewJuror,
  postAssistanceInternationalNewJuror,
  postAssistanceNewJurorInfo,
  postAssistanceNewJurorStatus,
} from "../../../../core/api/servises/users";
import { ThreeDots } from "react-loader-spinner";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import TitleCard from "../../../../components/Cards/TitleCard";
import { AuthContext } from "../../../../gard/context/AuthContext";
import { CategoryDropDown } from "../../../../components/DropDowns/CategoryDropDown";
import { LangDropDown } from "../../../../components/DropDowns/LangDropDown";
import { StatusDropDown } from "../../../../components/DropDowns/StatusDropDown";
import { TypeDropDown } from "../../../../components/DropDowns/TypeDropDown";
import Tab from "../../../../components/Tab";
import ReactPaginate from "react-paginate";
import SearchUser from "../../../../components/SearchBoxes/SearchUser/SearchUser";
import { Link } from "react-router-dom";

function MyRefereeList() {
  const { t } = useTranslation();

  const { userToken } = useContext(AuthContext);
  const [jurors, setJurors] = useState([]);
  const [currentPosts, setCurrentPosts] = useState(null);
  const [searchJurors, setSearchJurors] = useState([]);

  const [hiddenResultBox, setHiddenResultBox] = useState(false);

  //////loader state
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmited, setIsSubmited] = useState(false);
  const [isChangeStatus, setIsChangeStatus] = useState(false);
  const [selectItems, setSelectItems] = useState(0);

  //////global search states
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [lang, setLang] = useState(null);

  //////create states
  const [userMobile, setUserMobile] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectlang, setSelectLang] = useState("default");
  const [username, setUsername] = useState("");

  const [searchlang, setSearchlang] = useState("");

  //update state
  const [workTitle, setWorkTitle] = useState("");
  const [newName, setNewName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isShowDetails, setIsShowDetails] = useState(false);

  const [inView, setInView] = useState(1);

  const item = [
    {
      id: 1,
      title: isShowDetails ? t("update") : t("newRefereeRegistration"),
      content: "test1",
    },
    { id: 2, title: t("addJurortogategory"), content: "test2" },
  ];
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [apiCurrenPage, setApiCurrenPage] = useState(1);
  const getDatas = async () => {
    const result = await getAssistanceMyJurorList(
      userToken,
      apiCurrenPage,
      itemsPerPage
    )
      .then(function (response) {
        // console.log("response", response.data?.data);
        setJurors(response);
        setCurrentPosts(response?.data?.data);
        setIsLoading(false);
      })
      .catch(function (err) {
        // console.log("error", err);
      });
    return result;
  };
  const allData = jurors?.data?.data;
  // console.log("allData --->", allData);
  const current_page = jurors?.data?.current_page;
  // console.log("current_page --->", current_page);
  const from = jurors?.data?.from;
  // console.log("from --->", from);
  const to = jurors?.data?.to;
  // console.log("to --->", to);
  const last_page = jurors?.data?.last_page; /// last page count
  // console.log("last_page --->", last_page);
  const per_page = jurors?.data?.per_page; //// per page
  // console.log("per_page --->", per_page);
  const total = jurors?.data?.total; /// all items count
  // console.log("total --->", total);
  useEffect(() => {
    getDatas();
  }, [apiCurrenPage, itemsPerPage]);

  const { data } = useQuery(
    ["assistances-referee-category-list", userToken],
    () => getAssistanceCategoryList(userToken)
  );

  const storeIRItem = async (e) => {
    e.preventDefault();
    setIsSubmited(true);
    const formData = new FormData();
    formData.append("name", username);
    formData.append("mobile", userMobile);
    formData.append("password", password);
    // formData.append("category_id", category_id);
    formData.append("lang", selectlang);

    const createResult = await postAssistanceInternalNewJuror(
      formData,
      userToken
    )
      .then(function (response) {
        // console.log("response result : ", response);
        if (response.status) {
          toast.success(`${response.status.message}`);
          setIsSubmited(false);
          setUsername("");
          setUserMobile("");
          setPassword("");
          setSelectLang("default");
        } else {
          setIsSubmited(false);
          setUsername("");
          setUserMobile("");
          setPassword("");
          setSelectLang("default");
        }
        getDatas();
      })
      .catch(function (error) {
        // console.log("error", error.response.data.status);
        toast.error(`${error.response.data.status.message}`);
        setIsSubmited(false);
      });
    return createResult;
  };

  const storeInternationalItem = async (e) => {
    e.preventDefault();
    setIsSubmited(true);
    const formData = new FormData();
    formData.append("name", username);
    formData.append("email", userEmail);
    formData.append("password", password);
    // formData.append("category_id", category_id);
    formData.append("lang", lang);
    // for (let i = 0; i < image.length; i++) {
    //   formData.append("image[]", image[i]);
    // }
    // for (let i = 0; i < video.length; i++) {
    //   formData.append("video[]", video[i]);
    // }

    const createResult = await postAssistanceInternationalNewJuror(
      formData,
      userToken
    )
      .then(function (response) {
        // console.log("response result : ", response);
        if (response.status) {
          toast.success(`${response.status.message}`);
          setIsSubmited(false);
          setUsername("");
          setUserEmail("");
          setPassword("");
          setSelectLang("default");
        } else {
          setIsSubmited(false);
          setUsername("");
          setUserEmail("");
          setPassword("");
          setSelectLang("default");
        }
        getDatas();
      })
      .catch(function (error) {
        // console.log("error", error.response.data.status);
        toast.error(`${error.response.data.status.message}`);
        setIsSubmited(false);
      });

    return createResult;
  };

  const [unique_key, setUnique_key] = useState("");

  const deleteItem = async (unique_key) => {
    const deleteResult = await getAssistanceJurorDelete(unique_key, userToken)
      .then(function (response) {
        // console.log("response deleteItem",response)
        if (response.status) {
          setWorkTitle("");
          setIsShowDetails(false);
          getDatas();
          toast.success(`${response?.status?.message}`);
          setJurors(allData.filter((ptr) => ptr?.unique_key !== unique_key));
          // console.log("response result : ", response);
          // console.log("isShowDetails deleteItem",isShowDetails)
        } else {
          // setIsSubmited(false);
          // setIsShowDetails(false);
          getDatas();
        }
        getDatas();
      })
      .catch(function (error) {
        // console.log("error", error.response.data.status);
        // setIsShowDetails(false);

        toast.error(`${error?.response?.data?.status?.message}`);
      });

    return deleteResult;
  };

  const statusItem = async (unique_key) => {
    setIsChangeStatus(true);
    const statusResult = await postAssistanceNewJurorStatus(
      unique_key,
      userToken
    )
      .then(function (response) {
        // console.log("response result : ", response);
        // setIsChangeStatus(prev=>!prev)
        setTimeout(() => {
          toast.success(`${response.status.message}`);
          setIsChangeStatus(false);
        }, 700);
        getDatas();
      })
      .catch(function (error) {
        // console.log("error", error.response.data.status);
        setIsChangeStatus(false);
        toast.error(`${error.response.data.status.message}`);
      });

    return statusResult;
  };

  const updateItem = async (e) => {
    e.preventDefault();
    // setIsSubmited(true);
    const formData = new FormData();

    formData.append("name", newName);
    formData.append("password", newPassword);

    const createResult = await postAssistanceNewJurorInfo(
      formData,
      unique_key,
      userToken
    )
      .then(function (response) {
        // console.log("response result : ", response);
        if (response.status) {
          setWorkTitle("");

          getDatas();
          toast.success(`${response?.status?.message}`);
          // setIsSubmited(false);
          setIsShowDetails(false);
        } else {
          setIsShowDetails(false);
        }
      })
      .catch(function (error) {
        // console.log("error", error.response.data.status);
        toast.error(`${error.response.data.status.message}`);
        setIsShowDetails(false);
      });
    return createResult;
  };

  const serachJuror = async (type) => {
    if (type === "mobile") {
      await getAssistanceJurorSearch({ userToken: userToken, mobile: mobile })
        .then(function (response) {
          setSearchJurors(response?.data?.data);
          // console.log("serachJuror response", response.data?.data);
          // setIsLoading(false);
        })
        .catch(function (error) {
          // console.log("error", error.response.data.status);
          // toast.error(`${error.response.data.status.message}`);
        });
    } else if (type === "email") {
      await getAssistanceJurorSearch({ userToken: userToken, email: email })
        .then(function (response) {
          setSearchJurors(response?.data?.data);
          // console.log("serachJuror response", response.data?.data);
          // setIsLoading(false);
        })
        .catch(function (error) {
          // console.log("error", error.response.data.status);
          // toast.error(`${error.response.data.status.message}`);
        });
    }
  };

  const addJurorItem = async (e) => {
    e.preventDefault();
    setIsSubmited(true);
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
          setIsSubmited(false);
          setSearchlang("");
          setEmail(null);
          setMobile(null);
        } else {
          setIsSubmited(false);
        }
        getDatas();
      })
      .catch(function (error) {
        // console.log("error", error.response.data.status);
        toast.error(`${error.response.data.status.message}`);
        setIsSubmited(false);
      });

    return createResult;
  };

  // const currentPosts = allData;

  const paginate = (event) => {
    // const newOffset = (event.selected * per_page) +1;
    setApiCurrenPage(event.selected + 1);
    setCurrentPage(currentPage + 1);
    // console.log("currentPage", currentPage);
    // console.log("event.selected",event.selected);
  };

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
  // const [inputValue, setInputValue] = useState("");
  const [timeoutId, setTimeoutId] = useState(null);

  const handleInputChange = (e) => {
    setEmail(e.target.value);
    setMobile(e.target.value);

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    setTimeoutId(setTimeout(() => {}, 1000));
  };
  const handleBlur = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  };
  let last = per_page * current_page;
  let first = last - per_page;
  return (
    <>
      <SearchUser
        data={data}
        datas={jurors}
        setDatas={setJurors}
        apiFun={getJurorSearch}
      />

      {isLoading ? (
        <div className="flex items-center justify-center py-60">
          <ThreeDots
            height="80"
            width="80"
            radius="9"
            color="#4fa94d"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
          />
        </div>
      ) : (
        <div className="flex items-start justify-center lg:flex-nowrap flex-wrap gap-4  mt-4">
          <div className="w-full  lg:w-[65%]">
            <TitleCard
              isIcon={true}
              symbol={<IoIosList className=" text-lg text-white" />}
              title={t("myJurorLists")}
              topMargin="mt-2"
            >
              <div className="overflow-x-auto w-full">
                <table className="table w-full">
                  <thead>
                    <tr className="text-center">
                      <th> {t("row")} </th>
                      <th> {t("name")} </th>
                      <th> {t("mobile")} </th>
                      <th> {t("email")}</th>
                      <th> {t("language")}</th>
                      <th>{t("numberOfComments")}</th>
                      <th> {t("accessCategory")} </th>
                      <th> {t("dateOfRegistration")} </th>
                      <th> {t("operations")} </th>
                      {/* <th className="min-w-[12rem]"> نتایج ثبت شده داور </th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {jurors?.data?.data?.length === 0 ? (
                      <div className="ml-20 w-max py-4 text-center  text-md font-yekanReg  text-red-400">
                        {t("emptyMsg")}
                      </div>
                    ) : (
                      jurors?.data?.data?.map((l, k) => {
                        return (
                          <tr key={k} className="cursor-pointer text-center">
                            <td className=" text-center">{++first}</td>
                            <td>
                              {" "}
                              <span className=" threeDoteName">{l?.name}</span>
                            </td>
                            <td>{l?.mobile ? l?.mobile : "-"}</td>
                            <td>{l?.email ? l?.email : "-"}</td>
                            <td>
                              {l?.lang === "fa"
                                ? t("persian")
                                : l?.lang === "ar"
                                ? t("arabic")
                                : t("englishBir")}
                            </td>
                            <td>{l?.comment ? l?.comment : "-"}</td>
                            <td className="flex justify-center flex-wrap gap-1 ">
                              {[
                                ...new Set(
                                  l?.access_category?.map(
                                    (Val) => Val?.category?.name
                                  )
                                ),
                              ].map((g, i) => (
                                <span
                                  key={i}
                                  className="bg-blue-50 text-blue-500 p-1 rounded-sm text-xs"
                                >
                                  {g}
                                </span>
                              ))}
                            </td>
                            <td className="dateOfRegistration !ltr">
                              {formatDate(l?.updated_at)}
                            </td>
                            <td className="flex items-center gap-3">
                              <Link
                                to={`/app/juror-result/${l?.unique_key}`}
                                className="btn  font-medium text-sm "
                              >
                                {t("comments")}
                                {/* نظرات */}
                              </Link>
                              <button
                                onClick={() => {
                                  statusItem(l?.unique_key);
                                  // setIsChangeStatus(true)
                                  setSelectItems(k);
                                }}
                                className={`btn  text-sm  text-white font-medium ${
                                  l?.status === 1
                                    ? "bg-green-500 hover:bg-green-600"
                                    : "bg-red-600 hover:bg-red-700"
                                }`}
                              >
                                {l?.status === 1 ? (
                                  selectItems == k && isChangeStatus ? (
                                    <span className="loading loading-dots loading-md"></span>
                                  ) : (
                                    <>
                                      <IoMdCheckmarkCircleOutline className=" text-lg" />{" "}
                                      {t("active")}
                                    </>
                                  )
                                ) : selectItems == k && isChangeStatus ? (
                                  <span className="loading loading-dots loading-md"></span>
                                ) : (
                                  <>
                                    <IoPower className=" text-lg" />{" "}
                                    {t("deactive")}
                                  </>
                                )}
                              </button>

                              <button
                                onClick={() => {
                                  // setSelected(l?.unique_key);
                                  setUnique_key(l?.unique_key);
                                  // setIsShowDetails(true);
                                  setNewName(l?.name);
                                  setNewPassword("");
                                  setWorkTitle(l?.name);
                                  setIsShowDetails(true);
                                }}
                                className="btn font-medium text-xs"
                              >
                                <IoEyeOutline className=" text-lg" />
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
              {total > 0 ? (
                <>
                  <ReactPaginate
                    pageRangeDisplayed={2}
                    breakLabel="..."
                    onPageChange={paginate}
                    pageCount={Math.ceil(total / itemsPerPage)}
                    previousLabel={
                      <FaChevronRight
                        className={` text-lg ${
                          apiCurrenPage === 1
                            ? "text-[#999] cursor-default"
                            : "text-cd9 cursor-pointer"
                        } `}
                      />
                    }
                    nextLabel={
                      <FaChevronLeft
                        className={` text-lg ${
                          apiCurrenPage === last_page
                            ? "text-[#999] cursor-default"
                            : "text-cd9 cursor-pointer"
                        } `}
                      />
                    }
                    previousLinkClassName={"page-number"}
                    nextLinkClassName={"page-number"}
                    containerClassName="flex items-center justify-center gap-4 mt-7"
                    pageClassName="w-[30px] h-[30px] flex items-center justify-center  text-lg"
                    activeClassName="text-cf text-white bg-blue-600 hover:bg-blue-700 text-red"
                  />
                </>
              ) : (
                <></>
              )}
            </TitleCard>
          </div>
          <div className="w-full  lg:w-[35%]">
            <TitleCard
              title={
                inView == 1 ? (
                  isShowDetails ? (
                    <>
                      {t("update")} {workTitle}
                    </>
                  ) : selectlang == "fa" ? (
                    t("newJurorIn")
                  ) : (
                    t("newJurorOut")
                  )
                ) : inView == 2 ? (
                  t("search")
                ) : (
                  <></>
                )
              }
              topMargin="mt-2"
            >
              <Tab item={item} inView={inView} setInView={setInView} />
              {inView == 1 &&
                (isShowDetails ? (
                  <>
                    <form
                      method="post"
                      onSubmit={updateItem}
                      className="grid grid-cols-1 gap-5 "
                    >
                      <div className="">
                        <h4 className="mb-2 text-sm">{t("name")}</h4>
                        <input
                          type="text"
                          name="name"
                          value={newName}
                          onChange={(e) => setNewName(e.target.value)}
                          // { [e.target.name]: e.target.value }
                          // onChange={(e) => setName(e.target.name)}
                          placeholder={t("name")}
                          className="input  input-bordered w-full"
                        />
                      </div>
                      <div className="">
                        <h4 className="mb-2 text-sm">{t("password")}</h4>
                        <input
                          type="text"
                          name="password"
                          required
                          value={newPassword}
                          onChange={(e) => {
                            setNewPassword(e.target.value);

                            // passAlert.current.textContent = t("updatePassAlert");
                          }}
                          // { [e.target.name]: e.target.value }
                          // onChange={(e) => setName(e.target.name)}
                          minLength={6}
                          placeholder={t("password")}
                          className="input  input-bordered w-full"
                        />
                      </div>

                      {workTitle == "" ? (
                        <></>
                      ) : (
                        <>
                          <div className="col-span-1 btnColloction flex justify-start gap-1">
                            <div
                              onClick={() => {
                                setWorkTitle("");
                                setIsShowDetails(false);
                                setIsSubmited(false);
                              }}
                              // type="button"
                              className="btn flex justify-center items-center"
                            >
                              <IoReturnUpBack className=" text-lg transform -rotate-180" />
                            </div>
                            <button type="submit" className="btn btn-primary">
                              {isSubmited ? (
                                <span className="loading loading-dots loading-md"></span>
                              ) : (
                                <>{t("send")}</>
                              )}
                            </button>
                            <button
                              type="button"
                              onClick={() => deleteItem(unique_key)}
                              className="btn bg-red-600 hover:bg-red-700 text-sm font-medium text-white"
                            >
                              {" "}
                              <GoTrash className=" text-lg" /> {t("delete")}{" "}
                            </button>
                          </div>
                        </>
                      )}
                    </form>
                  </>
                ) : (
                  <>
                    {/* { unique_key } */}
                    <form
                      method="post"
                      onSubmit={
                        selectlang == "fa"
                          ? storeIRItem
                          : storeInternationalItem
                      }
                      className="grid grid-cols-1 gap-5 mt-4"
                    >
                      <div className="">
                        <h4 className="mb-2 text-sm">{t("chooseLang")}</h4>
                        <LangDropDown
                          lang={selectlang}
                          setLang={setSelectLang}
                        />
                      </div>
                      {/* <div className="">
                          <h4 className="mb-2 text-sm">{t("chooseCategory")}</h4>
                          <CategoryDropDown
                            data={data}
                            category_id={category_id}
                            setCategory_id={setCategory_id}
                          />
                        </div> */}

                      <div className="">
                        <h4 className="mb-2 text-sm">{t("name")}</h4>

                        <input
                          type="text"
                          name="name"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          placeholder={t("name")}
                          className="input  input-bordered w-full"
                        />
                      </div>

                      {selectlang == "fa" ? (
                        <>
                          <div className="">
                            <h4 className="mb-2 text-sm">{t("userPhone")}</h4>
                            <input
                              type="text"
                              name="mobile"
                              value={userMobile}
                              onChange={(e) => setUserMobile(e.target.value)}
                              placeholder={t("userPhone")}
                              maxLength={11}
                              minLength={11}
                              className="input text-center input-bordered w-full"
                            />
                          </div>
                        </>
                      ) : (
                        <div className="">
                          <h4 className="mb-2 text-sm">{t("userEmail")}</h4>
                          <input
                            type="text"
                            name={t("userEmail")}
                            value={userEmail}
                            onChange={(e) => setUserEmail(e.target.value)}
                            placeholder={t("userEmail")}
                            className="input  input-bordered w-full"
                          />
                        </div>
                      )}

                      <div className="">
                        <h4 className="mb-2 text-sm">{t("password")}</h4>
                        <input
                          type="text"
                          name={t("password")}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder={t("password")}
                          className="input  input-bordered w-full"
                        />
                      </div>

                      <div className="col-span-1  flex justify-end">
                        <button
                          type="submit"
                          className="btn btn-primary flex justify-center items-center"
                        >
                          {isSubmited ? (
                            <span className="loading loading-dots loading-md"></span>
                          ) : (
                            <>{t("send")}</>
                          )}
                        </button>
                      </div>
                    </form>
                  </>
                ))}
              {inView == 2 && (
                <>
                  <form
                    onSubmit={addJurorItem}
                    className="grid grid-cols-1  pb-4 gap-3 items-end  mt-4"
                  >
                    {searchlang == "" ? (
                      <>
                        <div className="">
                          <h4 className="mb-2 text-sm">{t("chooseLang")}</h4>
                          <LangDropDown
                            lang={searchlang}
                            setLang={setSearchlang}
                          />
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                    {searchlang == "fa" ? (
                      <>
                        <div className="">
                          <h4 className="mb-2 text-sm">{t("userPhone")}</h4>

                          <input
                            type="text"
                            name="mobile"
                            autoComplete="false"
                            value={mobile}
                            onChange={(e) => {
                              // setSearchJurors(-1);
                              setMobile(e.target.value);
                              serachJuror("mobile");
                              if (timeoutId) {
                                clearTimeout(timeoutId);
                              }

                              setTimeoutId(setTimeout(() => {}, 1000));
                            }}
                            onBlur={handleBlur}
                            // onChange={(e) => handleSearchInput(e.target.value)}
                            placeholder={t("userPhone")}
                            maxLength={11}
                            minLength={11}
                            className="input  input-bordered w-full text-sm "
                          />
                        </div>
                        <ul
                          className={`shadow-2xl  ${
                            hiddenResultBox || mobile == "" ? "hidden" : ""
                          }`}
                        >
                          {searchJurors
                            ?.filter((val) => val?.mobile != null)
                            ?.map((po, i) => (
                              <li
                                key={i}
                                className=" px-2 py-2 rounded-md duration-200 transition-all
                                    hover:bg-zinc-200 m-2 w-[95%] "
                                onClick={() => {
                                  setMobile(po?.name);
                                  setUnique_key(po?.unique_key);
                                  setHiddenResultBox(true);
                                  // setActive(false);
                                }}
                              >
                                {po?.name}
                              </li>
                            ))}
                        </ul>
                      </>
                    ) : searchlang == "ar" || searchlang == "en" ? (
                      <>
                        <div className="">
                          <h4 className="mb-2 text-sm">{t("userEmail")}</h4>

                          <input
                            type="text"
                            name="email"
                            value={email}
                            autoComplete="false"
                            onChange={(e) => {
                              // setSearchJurors(-1);
                              setEmail(e.target.value);
                              serachJuror("email");
                              if (timeoutId) {
                                clearTimeout(timeoutId);
                              }

                              setTimeoutId(setTimeout(() => {}, 1000));
                            }}
                            onBlur={handleBlur}
                            placeholder={t("userEmail")}
                            className="input  input-bordered w-full text-sm "
                          />
                        </div>

                        <ul
                          className={`shadow-2xl ${
                            hiddenResultBox || email == "" ? "hidden" : ""
                          }`}
                        >
                          {searchJurors
                            ?.filter((val) => val?.email != null)
                            ?.map((po, i) => (
                              <li
                                key={i}
                                className=" px-2 py-2 rounded-md duration-200 transition-all
                                    hover:bg-zinc-200 m-2 w-[95%] "
                                onClick={() => {
                                  setEmail(po?.name);
                                  setUnique_key(po?.unique_key);
                                  setHiddenResultBox(true);
                                  // setActive(false);
                                }}
                              >
                                {po?.name}
                              </li>
                            ))}
                        </ul>
                      </>
                    ) : (
                      <></>
                    )}

                    {searchlang == "" ? (
                      <></>
                    ) : (
                      <>
                        <div className="col-span-1 btnColloction flex justify-start gap-1">
                          <div
                            onClick={() => {
                              setSearchlang("");
                              setEmail("");
                              setMobile("");
                            }}
                            // type="button"
                            className="btn flex justify-center items-center"
                          >
                            <IoReturnUpBack className=" text-lg transform -rotate-180" />
                          </div>

                          <button
                            // disabled={active || name=="" || email=="" ? true : false}
                            type="submit"
                            className="btn btn-primary flex justify-center items-center"
                          >
                            {isSubmited ? (
                              <span className="loading loading-dots loading-md"></span>
                            ) : (
                              <>{t("send")}</>
                            )}
                          </button>
                        </div>
                      </>
                    )}
                  </form>
                </>
              )}
            </TitleCard>
          </div>
        </div>
      )}
    </>
  );
}

export default MyRefereeList;
