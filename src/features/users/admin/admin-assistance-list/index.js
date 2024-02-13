import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import toast from "react-hot-toast";
import { useQuery } from "react-query";
import { GoTrash } from "react-icons/go";
import { IoPower, IoEyeOutline, IoReturnUpBack } from "react-icons/io5";
import { SlQuestion } from "react-icons/sl";
import { IoIosList } from "react-icons/io";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import ReactPaginate from "react-paginate";
import TitleCard from "../../../../components/Cards/TitleCard";
import { getAdminCategoryList } from "../../../../core/api/servises/categories";
import {
  getAdminAssistanceDelete,
  getAdminAssistanceList,
  getUserAssistanceSearch,
  getassistanceSearch,
  postAdminNewAssistanceIR,
  postAdminNewAssistanceInfo,
  postAdminNewAssistanceInternational,
  postAdminNewAssistanceStatus,
} from "../../../../core/api/servises/users";
import { AuthContext } from "../../../../gard/context/AuthContext";
import { CategoryDropDown } from "../../../../components/DropDowns/CategoryDropDown";
import Tab from "../../../../components/Tab";
import { ThreeDots } from "react-loader-spinner";
import Modal from "../../../../components/modal/Modal";
import SearchUser from "../../../../components/SearchBoxes/SearchUser/SearchUser";
import { LangAssistDropDown } from "../../../../components/DropDowns/LangAssistDropDown";

function AdminAssistanceList() {
  // const { unique_key } = useParams();

  const [unique_key, setUnique_key] = useState(null);
  const [isShowDetails, setIsShowDetails] = useState(false);
  const [newName, setNewName] = useState("");
  const [newCategory_id, setNewCategory_id] = useState("");
  const [assistances, setAssistances] = useState([]);
  const [currentPosts, setCurrentPosts] = useState(null);
  const { t } = useTranslation();
 
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [category_id, setCategory_id] = useState("default");
  const [lang, setLang] = useState("default");
  const [langCheckbox, setLangCheckbox] = useState("fa");
  const [password, setPassword] = useState("");
  const [type, setType] = useState(null);

  //////loader state
  const [isLoading, setIsLoading] = useState(true);
  const [firstLoading, setFirstoading] = useState(true);
  const [isSubmited, setIsSubmited] = useState(false);
  const [isChangeStatus, setIsChangeStatus] = useState(false);
  const [selectItems, setSelectItems] = useState(0);

  const [inView, setInView] = useState(1);
  const item = [
    { id: 1, title: t("iranian"), content: "test1" },
    { id: 2, title: t("english"), content: "test2" },
  ];

  // const [status, setStatus] = useState(null);
  const [status, setStatus] = useState(null);

  const { userToken } = useContext(AuthContext);

  // console.log("assistances", assistances?.data?.data?.length);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [apiCurrenPage, setApiCurrenPage] = useState(1);

  const getDatas = async (page = null) => {
    const result = await getAdminAssistanceList(
      userToken,
      apiCurrenPage,
      itemsPerPage
    )
      .then(function (response) {
        setAssistances(response);

        setCurrentPosts(response?.data?.data);
        setIsLoading(false);
        // console.log("response result : ", response);
        // toast.success(`${response.status.message}`);
      })
      .catch(function (error) {
        // console.log("error", error.response.data.status);
        toast.error(`${error.response.data.status.message}`);
      });
    return result;
  };
  const allData = assistances?.data?.data;
  // console.log("allData --->", allData);
  const current_page = assistances?.data?.current_page;
  // console.log("current_page --->", current_page);
  const from = assistances?.data?.from;
  // console.log("from --->", from);
  const to = assistances?.data?.to;
  // console.log("to --->", to);
  const last_page = assistances?.data?.last_page; /// last page count
  // console.log("last_page --->", last_page);
  const per_page = assistances?.data?.per_page; //// per page
  // console.log("per_page --->", per_page);
  const total = assistances?.data?.total; /// all items count
  // console.log("total --->", total);
 
  useEffect(() => {
    if (firstLoading) {
       // console.log("first loading is here")
      getDatas();
      setFirstoading(false)
    }else{
       // console.log("after loading first time")
    }
  }, [apiCurrenPage, itemsPerPage]);

  const deleteItem = async (unique_key) => {
    const deleteResult = await getAdminAssistanceDelete(unique_key, userToken)
      .then(function (response) {
        // console.log("response deleteItem",response)
        if (response.status) {
          setIsShowDetails(false);
          getDatas();
          toast.success(`${response?.status?.message}`);
          setAssistances(
            allData.filter((ptr) => ptr?.unique_key !== unique_key)
          );
          // console.log("response result : ", response);
          // console.log("isShowDetails deleteItem",isShowDetails)
        } else {
          setIsSubmited(false);
          setIsShowDetails(false);
          getDatas();
        }
        getDatas();
      })
      .catch(function (error) {
        // console.log("error", error.response.data.status);
        setIsShowDetails(false);

        toast.error(`${error?.response?.data?.status?.message}`);
      });

    return deleteResult;
  };

  const statusItem = async (unique_key) => {
    setIsChangeStatus(true);
    const statusResult = await postAdminNewAssistanceStatus(
      unique_key,
      userToken
    )
      .then(function (response) {
        // console.log("response result : ", response);
        // setIsChangeStatus(prev=>!prev)
        // setIsSubmited(false);
        setTimeout(() => {
          toast.success(`${response.status.message}`);
          setIsChangeStatus(false);
        }, 700);
        getDatas();
      })
      .catch(function (error) {
        setIsChangeStatus(false);
        toast.error(`${error.response.data.status.message}`);
      });

    return statusResult;
  };

  const updateItem = async (e) => {
    e.preventDefault();
    setIsSubmited(true);
    const formData = new FormData();

    formData.append("name", newName);
    formData.append("category_id", newCategory_id);

    const createResult = await postAdminNewAssistanceInfo(
      formData,
      unique_key,
      userToken
    )
      .then(function (response) {
        // console.log("response result : ", response);
        if (response.status) {
          getDatas();
          toast.success(`${response?.status?.message}`);
          setIsSubmited(false);
          setIsShowDetails(false);
        } else {
          setIsSubmited(false);
        }
      })
      .catch(function (error) {
        // console.log("error", error.response.data.status);
        toast.error(`${error.response.data.status.message}`);
        setIsSubmited(false);
      });
    return createResult;
  };

  const levels = window.localStorage.getItem("level");

  const { data } = useQuery(
    ["categories-international-dropdown", userToken],
    () => levels == 5 ? getAdminCategoryList(userToken) : null
  );

  const storeIRItem = async (e) => {
    e.preventDefault();
    setIsSubmited(true);
    const formData = new FormData();

    formData.append("name", name);
    formData.append("mobile", mobile);
    formData.append("password", password);
    formData.append("category_id", category_id);
    formData.append("lang", langCheckbox);

    const createResult = await postAdminNewAssistanceIR(formData, userToken)
      .then(function (response) {
        // console.log("response result : ", response);
        if (response.status) {
          setIsSubmited(false);
          setMobile("");
          setName("");
          setCategory_id("default");
          setLangCheckbox("fa");
          setPassword("");
          toast.success(`${response.status.message}`);
        } else {
          setIsSubmited(false);
          setMobile("");
          setName("");
          setCategory_id("default");
          setLangCheckbox("fa");
          setPassword("");
        }
        getDatas();
      })
      .catch(function (error) {
        // console.log("error", error.response.data.status);
        toast.error(`${error.response.data.status.message}`);
        setIsSubmited(false);
        setMobile("");
        setName("");
        setCategory_id("default");
        setLangCheckbox("fa");
        setPassword("");
      });

    return createResult;
  };

  const storeInternationalItem = async (e) => {
    e.preventDefault();
    setIsSubmited(true);
    const formData = new FormData();

    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("category_id", category_id);
    formData.append("lang", lang);

    const createResult = await postAdminNewAssistanceInternational(
      formData,
      userToken
    )
      .then(function (response) {
        // console.log("response result : ", response);
        if (response.status) {
          toast.success(`${response.status.message}`);
          setIsSubmited(false);
          setEmail("");
          setName("");
          setCategory_id("default");
          setLang("default");
          setPassword("");
        } else {
          setIsSubmited(false);
          setEmail(null);
          setName(null);
          setCategory_id("default");
          setLang("default");
          setPassword(null);
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

  //PAGINATE

  //========================================================================

  // const currentPosts = allData;

  const paginate = (event) => {
    // const newOffset = (event.selected * per_page) +1;
    setApiCurrenPage(event.selected + 1);
    setCurrentPage(currentPage + 1);
    //console.log("currentPage", currentPage);
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
  let last = per_page * current_page;
  let first = last - per_page;
//   const { data } = useQuery(
//     ["categories-admin-participants-list-dropdown", userToken],
//     () => getAdminCategoryList(userToken)
// );

  return (
    <>
      <SearchUser
        data={data}
        datas={assistances}
        setDatas={setAssistances}
        apiFun={getassistanceSearch}
      />
      {/* {console.log("assistance test ....", assistances)} */}
      
     
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
        <div className="flex items-start justify-center lg:flex-nowrap flex-wrap gap-4 mt-4">
          <div className="w-full  lg:w-[65%]">
            <TitleCard
              isIcon={true}
              symbol={<IoIosList className=" text-lg text-white" />}
              title={t("assistantList")}
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
                      <th> {t("category")}</th>
                      {/* <th> {t('nationality')} </th> */}
                      <th> {t("dateOfRegistration")} </th>
                      <th> {t("operations")} </th>
                    </tr>
                  </thead>

                  <tbody>
                    {/* {console.log("assistances ::::",assistances)} */}
                    {assistances?.data?.data?.map((l, k) => {
                      return (
                        <tr key={k} className="cursor-pointer text-center">
                          <td>{++first}</td>
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
                          <td>{l?.category?.name ? l?.category?.name : ""}</td>
                          <td className="dateOfRegistration !ltr">
                            {formatDate(l?.updated_at)}
                            {/* {l?.updated_at ? l?.updated_at : ""} */}
                          </td>
                        
                          <td className="flex items-center gap-3">
                            {/* <button
                              type="button"
                              onClick={() => deleteItem(l?.unique_key)}
                              className="btn bg-red-600 hover:bg-red-700 text-sm font-medium text-white"
                            >
                              {" "}
                              <GoTrash className=" text-lg" />{" "}
                              {t("deleteAssis")}{" "}
                            </button> */}
                            <button
                              onClick={() => {
                                statusItem(l?.unique_key);
                                setSelectItems(k)
                              }}
                              className={`btn  text-sm  text-white font-medium ${
                                l?.status === 1
                                  ? "bg-green-500 hover:bg-green-600"
                                  : "bg-red-600 hover:bg-red-700"
                               }`}
                            >
                               {
                                  l?.status === 1 ? (
                                    selectItems == k && isChangeStatus ?<span className="loading loading-dots loading-md"></span>:(<>
                                     <IoMdCheckmarkCircleOutline className=" text-lg" />{" "}
                                     {t("active")}
                                    </>)
                               
                                 ) : (
                                   selectItems == k && isChangeStatus  ?<span className="loading loading-dots loading-md"></span>:(<>
                                       <IoPower className=" text-lg" />{" "}
                                     {t("deactive")}
                                    </>)
                                 
                                 )
                              }

                              {/* {l?.status === 1 ? (
                                <>
                                  <IoMdCheckmarkCircleOutline className=" text-lg" />{" "}
                                  {t("active")}
                                </>
                              ) : (
                                <>
                                  <IoPower className=" text-lg" />{" "}
                                  {t("deactive")}
                                </>
                              )} */}
                            </button>

                            <button
                              onClick={() => {
                                setUnique_key(l?.unique_key);
                                setIsShowDetails(true);
                                console.log(
                                  "isShowDetails eye btn",
                                  isShowDetails
                                );
                                setNewName(l?.name);
                                setNewCategory_id(l?.category?.unique_key);
                              }}
                              className="btn font-medium text-xs"
                            >
                              <IoEyeOutline className=" text-lg" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                    {assistances?.data?.data?.map((l, k) => (
                      <Modal
                        title={`${t("assisInfo")} : ${l?.name}`}
                        id={l?.unique_key}
                        key={k}
                      >
                        {/* <p className="py-4 ">
                           {l?.description ? l.description : "-"}
                       </p> */}
                        {/* <h3 className="font-bold text-lg">
                            {" "}
                            {t("assisInfo")} : {l?.name}
                          </h3> */}
                        {/* {unique_key} */}
                        <form
                          method="post"
                          onSubmit={updateItem}
                          className="my-5 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 "
                        >
                          <input
                            type="text"
                            name="name"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            // { [e.target.name]: e.target.value }
                            // onChange={(e) => setName(e.target.name)}
                            placeholder="name"
                            className="input  input-bordered w-full"
                          />

                          <CategoryDropDown
                            data={data}
                            category_id={newCategory_id}
                            setCategory_id={setNewCategory_id}
                          />

                          <div className="col-span-1 md:col-span-2 lg:col-span-2 flex justify-start">
                            <button
                              type="submit"
                              className="btn bg-blue-600 hover:bg-blue-700 font-medium text-sm  text-white flex justify-center items-center"
                            >
                              {isSubmited ? (
                                <span className="loading loading-dots loading-md"></span>
                              ) : (
                                <>{t("send")}</>
                              )}
                            </button>
                          </div>
                        </form>
                      </Modal>
                    ))}
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
            {isShowDetails ? (
              <TitleCard
                isIcon={true}
                symbol={<IoIosList className=" text-lg text-white" />}
                title={t("assisInfo")}
                topMargin="mt-2"
              >
                <form
                  method="post"
                  onSubmit={updateItem}
                  className="my-5 w-full grid grid-cols-1  gap-5 "
                >
                  <input
                    type="text"
                    name="name"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    // { [e.target.name]: e.target.value }
                    // onChange={(e) => setName(e.target.name)}
                    placeholder="name"
                    className="input  input-bordered w-full"
                  />

                  <CategoryDropDown
                    data={data}
                    category_id={newCategory_id}
                    setCategory_id={setNewCategory_id}
                  />

                  <div className="col-span-1 btnColloction flex justify-start gap-1">
                    <div
                      onClick={() => {
                        setIsShowDetails(false);
                      }}
                      // type="button"
                      className="btn flex justify-center items-center"
                    >
                      <IoReturnUpBack className=" text-lg transform -rotate-180" />
                    </div> 
                    <button
                      type="submit"
                      className="btn bg-blue-600 hover:bg-blue-700 font-medium text-sm  text-white flex justify-center items-center"
                    >
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
                </form>
              </TitleCard>
            ) : (
              <>
                <TitleCard
                  isIcon={true}
                  symbol={<IoIosList className=" text-lg text-white" />}
                  title={inView == 1 ? t("regNewAssisIn") : t("regNewAssisOut")}
                  topMargin="mt-2"
                >
                  <Tab item={item} inView={inView} setInView={setInView} />
                  {inView == 1 && (
                    <form
                      method="post"
                      onSubmit={storeIRItem}
                      className="grid grid-cols-1 gap-5 mt-4"
                    >
                      <div className="">
                        <h4 className="mb-2 text-sm">{t("chooseCategory")}</h4>
                        <CategoryDropDown
                          data={data}
                          category_id={category_id}
                          setCategory_id={setCategory_id}
                        />
                      </div>

                      <div className="">
                        <h4 className="mb-2 text-sm">{t("chooseLang")}</h4>
                        {/* <LangDropDown lang={lang} setLang={setLang} /> */}
                        <div className="flex items-center">
                          <label className="label cursor-pointer">
                            <input
                              disabled={true}
                              type="checkbox"
                              checked={langCheckbox}
                              onChange={(e) =>
                                setLangCheckbox(e.target.checked)
                              }
                              className="checkbox checkbox-primary"
                            />
                          </label>
                          <span className="text-sm cursor-default">
                            {t("fa")}
                          </span>
                        </div>
                      </div>

                      <div className="">
                        <h4 className="mb-2 text-sm">{t("name")}</h4>
                        <input
                          type="text"
                          name="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder={t("name")}
                          className="input input-bordered w-full"
                        />
                      </div>

                      <div className="">
                        <h4 className="mb-2 text-sm">{t("userPhone")}</h4>
                        <input
                          type="text"
                          name="mobile"
                          value={mobile}
                          onChange={(e) => setMobile(e.target.value)}
                          placeholder={t("userPhone")}
                          maxLength={11}
                          minLength={11}
                          className="input text-center input-bordered w-full"
                        />
                      </div>

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

                      <div className="col-span-1 ">
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
                  )}
                  {inView == 2 && (
                    <form
                      method="post"
                      onSubmit={storeInternationalItem}
                      className="grid grid-cols-1 gap-5  mt-4"
                    >
                      <div className="">
                        <h4 className="mb-2 text-sm">{t("chooseCategory")}</h4>
                        <CategoryDropDown
                          data={data}
                          category_id={category_id}
                          setCategory_id={setCategory_id}
                        />
                      </div>

                      <div className="">
                        <h4 className="mb-2 text-sm">{t("chooseLang")}</h4>
                        <LangAssistDropDown lang={lang} setLang={setLang} />
                      </div>

                      <div className="">
                        <h4 className="mb-2 text-sm">{t("name")}</h4>

                        <input
                          type="text"
                          name={t("name")}
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder={t("name")}
                          className="input  input-bordered w-full"
                        />
                      </div>

                      <div className="">
                        <h4 className="mb-2 text-sm">{t("userEmail")}</h4>
                        <input
                          type="text"
                          name={t("userEmail")}
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder={t("userEmail")}
                          className="input  input-bordered w-full"
                        />
                      </div>

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

                      <div className="col-span-1 ">
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
                  )}
                </TitleCard>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default AdminAssistanceList;
