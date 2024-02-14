import { useContext, useEffect, useRef, useState } from "react";
import { GoTrash } from "react-icons/go";
import { IoPower, IoEyeOutline, IoReturnUpBack } from "react-icons/io5";
import { SlQuestion } from "react-icons/sl";
import { IoIosList } from "react-icons/io";
import { PiPaintBrushLight } from "react-icons/pi";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import TitleCard from "../../../../components/Cards/TitleCard";
import {
  getAdminJurorDelete,
  getAdminJurorList,
  getJurorSearch,
  getUserJurorSearch,
  postAdminNewJurorInfo,
  postAdminNewJurorStatus,
} from "../../../../core/api/servises/users";
import { AuthContext } from "../../../../gard/context/AuthContext";
import { getAdminCategoryList } from "../../../../core/api/servises/categories";
import ReactPaginate from "react-paginate";
import { ThreeDots } from "react-loader-spinner";
import SearchUser from "../../../../components/SearchBoxes/SearchUser/SearchUser";
function AdminRefereeList() {
  const { userToken } = useContext(AuthContext);
  const { t } = useTranslation();

  const [jurors, setJurors] = useState([]);
  const [currentPosts, setCurrentPosts] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [apiCurrenPage, setApiCurrenPage] = useState(1);
  
  // const passAlert = useRef();
  //update state
  const [unique_key, setUnique_key] = useState(null);
  const [workTitle, setWorkTitle] = useState("");
  const [newName, setNewName] = useState("");
  const [newPassword, setNewPassword] = useState("");


    //////loader state
    const [isLoading, setIsLoading] = useState(true);
    const [firstLoading, setFirstoading] = useState(true);
    const [isSubmited, setIsSubmited] = useState(false);
    const [isChangeStatus, setIsChangeStatus] = useState(false);
    const [data, setData] = useState(null);
    const [selectItems, setSelectItems] = useState(0);
    const levels = window.localStorage.getItem("level");
    // const { data } = useQuery(
    //   ["categories-admin-referee-list-dropdown", userToken],
    //   () => levels == 5 ? getAdminCategoryList(userToken) : null
    // );

    const getAdminAssis = async () => {
      const result = await getAdminCategoryList(
        userToken,
      )
        .then(function (response) {
          setData(response);
          // console.log("response result : ", response);
          // toast.success(`${response.status.message}`);
        })
        .catch(function (error) {
     
          toast.error(`${error.response.data.status.message}`);
        });
      return result;
    };

  const getDatas = async () => {
    const result = await getAdminJurorList(
      userToken,
      apiCurrenPage,
      itemsPerPage
    )
      .then(function (response) {
        setJurors(response);
        setCurrentPosts(response?.data?.data);
        setIsLoading(false);
        console.log("response result : ", response);
        // toast.success(`${response.status.message}`);
      })
      .catch(function (error) {
        // console.log("error", error.response.data.status);
        toast.error(`${error.response.data.status.message}`);
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

  useEffect(() => {
    if(levels==5) getAdminAssis();
  }, []);
 

  const deleteItem = async (unique_key) => {
    const deleteResult = await getAdminJurorDelete(unique_key, userToken)
      .then(function (response) {
        // console.log("response deleteItem",response)
        if (response.status) {
          setWorkTitle("");
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
    const statusResult = await postAdminNewJurorStatus(unique_key, userToken)
      .then(function (response) {

        setTimeout(() => {
          toast.success(`${response.status.message}`);
          setIsChangeStatus(false);
        }, 700);
        getDatas();
      })
      .catch(function (error) {

        toast.error(`${error.response.data.status.message}`);
        setIsChangeStatus(false);
      });

    return statusResult;
  };

  const updateItem = async (e) => {
    e.preventDefault();
    setIsSubmited(true);
    const formData = new FormData();

    formData.append("name", newName);
    formData.append("password", newPassword);

    const createResult = await postAdminNewJurorInfo(
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
          setIsSubmited(false);
          // setIsShowDetails(false);
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

 
  // const currentPosts = allData;

  const paginate = (event) => {
    // const newOffset = (event.selected * per_page) +1;
    setApiCurrenPage(event.selected + 1);
    setCurrentPage(currentPage + 1);
    // console.log("4currentPage", currentPage);
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
              title={t('jurorList')}
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
                      {/* <th> {t("category")}</th> */}
                      <th> {t("accessCategory")} </th>
                      <th>{t("numberOfComments")}</th>
                      <th className="dateOfRegistration !ltr">
                        {" "}
                        {t("dateOfRegistration")}{" "}
                      </th>
                      <th> {t("comments")} </th>
                      <th> {t("operations")} </th>
                      {/* <th className="min-w-[10rem]"> {t("status")} </th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {jurors?.data?.data?.map((l, k) => {
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
                          <td className="flex justify-center flex-wrap gap-1 ">
                            {[
                              ...new Set(
                                l?.access_category?.map(
                                  (Val) => Val?.category?.name
                                )
                              ),
                            ]?.map((g, i) => (
                              <span
                                key={i}
                                className="bg-blue-50 text-blue-500 p-1 rounded-sm text-xs"
                              >
                                {g}
                              </span>
                            ))}
                          </td>
                          <td>{l?.comment ? l?.comment : "-"}</td>
                          <td className="dateOfRegistration !ltr">
                            {formatDate(l?.updated_at)}
                            {/* {l?.updated_at ? l?.updated_at : ""} */}
                          </td>
                          <td> 
                            <Link
                              to={`/app/juror-result/${l?.unique_key}`}
                              className="btn  font-medium text-sm "
                            >
                              {t("comments")}
                              {/* نظرات */}
                            </Link>
                          </td>
                          <td className="flex items-center gap-3">
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
                              {/* {" "}
                              {l?.status === 1 ? (
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
                                // setSelected(l?.unique_key);
                                setUnique_key(l?.unique_key);
                                // setIsShowDetails(true);
                                setNewName(l?.name);
                                setNewPassword("");
                                setWorkTitle(l?.name);
                              }}
                              className="btn font-medium text-xs"
                            >
                              <IoEyeOutline className=" text-lg" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
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
              isIcon={true}
              symbol={<PiPaintBrushLight className=" text-lg text-white" />}
              title={`${t('update')} ${workTitle}`}
              topMargin="mt-2"
            >
              {workTitle == "" ? (
                <div className="flex items-center justify-center">
                  {" "}
                  {t("notificationJuror")}{" "}
                </div>
              ) : (
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
                      value={newPassword}
                      onChange={(e) =>{

                        setNewPassword(e.target.value)

                            // passAlert.current.textContent = t("updatePassAlert");
                      }
                        
                      
                      }
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
              )}
            </TitleCard>
          </div>
        </div>
      )}
    </>
  );
}

export default AdminRefereeList;
