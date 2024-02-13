
import { useContext, useEffect, useState } from "react";
import {
  IoIosStar,
  IoIosStarOutline,
  IoMdCheckmarkCircleOutline,
} from "react-icons/io";
import {  IoEyeOutline } from "react-icons/io5";
import { useQuery } from "react-query";
import toast from "react-hot-toast";
import { IoIosList } from "react-icons/io";
import { useTranslation } from "react-i18next";

import TitleCard from "../../../../components/Cards/TitleCard";
import {
  getArtsSearch,
  getAssistanceCategoryList,
  getAssistanceNewWorkList,
  getWorkSearch,
} from "../../../../core/api/servises/users";
import { AuthContext } from "../../../../gard/context/AuthContext";
import {
  postAssistanceWorkConfirmation,
  postAssistanceWorkRejection,
} from "./../../../../core/api/servises/users";
import ReactPaginate from "react-paginate";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { ThreeDots } from "react-loader-spinner";
import Modal from "../../../../components/modal/Modal";
import SearchWork from "../../../../components/SearchBoxes/SearchWork/SearchWork";
import { Link } from "react-router-dom";


function NewWorkList() {
  const { t } = useTranslation();
  const { userToken } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selected, setSelected] = useState(null);
  const [description, setDescription] = useState("");
  // const { isLoading, data } = useQuery(["new-work-list", userToken], () =>
  //   getAssistanceNewWorkList(userToken)
  // );
  // if (isLoading) {
  //   return   <div className="flex items-center justify-center py-60">
  // }
  // console.log("getAssistanceNewWorkList :::", data);
  const [works, setWorks] = useState([]);
  const [currentPosts, setCurrentPosts] = useState(null);
  const [title, setTitle] = useState(null);
  const [tracking_code, setTracking_code] = useState(null);
  const [category_id, setCategory_id] = useState(null);
  const [status, setStatus] = useState(null);
  const [isSubmited, setIsSubmited] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [apiCurrenPage, setApiCurrenPage] = useState(1);

  const getDatas = async () => {
    const result = await getAssistanceNewWorkList(
      userToken,
      apiCurrenPage,
      itemsPerPage
    )
      .then(function (response) {
        setWorks(response);
        setCurrentPosts(response?.data?.data);
        setIsLoading(false);
        // toast.success(`${response.status.message}`);
      })
      .catch(function (error) {
        // console.log("error", error.response.data.status);
        toast.error(`${error.response.data.status.message}`);
      });
    return result;
  };
  // console.log("response result works: ", works);
  const allData = works?.data?.data;
  // console.log("allData --->", allData);
  const current_page = works?.data?.current_page;
  // console.log("current_page --->", current_page);
  const from = works?.data?.from;
  // console.log("from --->", from);
  const to = works?.data?.to;
  // console.log("to --->", to);
  const last_page = works?.data?.last_page; /// last page count
  // console.log("last_page --->", last_page);
  const per_page = works?.data?.per_page; //// per page
  // console.log("per_page --->", per_page);
  const total = works?.data?.total; /// all items count
  // console.log("total --->", total);
  useEffect(() => {
    getDatas();
  }, [apiCurrenPage, itemsPerPage]);

  const statusItem = async (unique_key) => {
    const statusResult = await postAssistanceWorkConfirmation(
      unique_key,
      userToken
    )
      .then(function (response) {
        // console.log("response result : ", response);
        toast.success(`${response.status.message}`);
        getDatas();
      })
      .catch(function (error) {
        // console.log("error", error.response.data.status);
        toast.error(`${error.response.data.status.message}`);
      });

    return statusResult;
  };

 

  const rejectItem = async (e) => {
    e.preventDefault();
    setIsSubmited(true);
    const formData = new FormData();
    formData.append("description", description);
    const rejectResult = await postAssistanceWorkRejection(
      formData,
      selected,
      userToken
    )
      .then(function (response) {
        // console.log("response result : ", response);
        if (response.status) {

          setIsShowModal(false)
          // if (isShowModal==false) {
            
          // }
          toast.success(`${response.status.message}`);
          setIsSubmited(false);
          setDescription("");
        } else {
          setIsSubmited(false);
          setDescription("");
        }
        getDatas();
      })
      .catch(function (error) {
        // console.log("error", error.response.data.status);
        toast.error(`${error.response.data.status.message}`);
        setIsSubmited(false);
      });

    return rejectResult;
  };

  const { data } = useQuery(["categories-new-work-list-list", userToken], () =>
    getAssistanceCategoryList(userToken)
  );

  const serachHandler = async (e) => {
    e.preventDefault();
    await getWorkSearch({
      userToken: userToken,
      title: title,
      tracking_code: tracking_code,
      category_id: category_id,
      status: status,
    })
      .then(function (response) {
        if (
          title == null &&
          tracking_code == null &&
          category_id == null &&
          status == null
        ) {
          setWorks(response);
        } else {
          setWorks(response);
        }
        // console.log("response", response.data?.data);
        // setIsLoading(false);
      })
      .catch(function (error) {
        // console.log("error", error.response.data.status);
        toast.error(`${error.response.data.status.message}`);
      });
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

  let last = per_page * current_page;
  let first = last - per_page;
  return (
    <>
      <SearchWork data={data} datas={works} setDatas={setWorks} apiFun={getArtsSearch} />
      {/* <TitleCard
        title={t("search")}
        isIcon={true}
        symbol={<SlQuestion className=" text-lg text-white" />}
        topMargin="mt-2 mb-6"
      >
        <form className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 pb-4 gap-3 items-end">
          <div className="">
            <h4 className="mb-2 text-sm">{t("workName")}</h4>
            <input
              type="text"
              name="title"
              // value={score}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={t("workName")}
              className="input  input-bordered w-full text-sm"
            />
          </div>

          <div className="">
            <h4 className="mb-2 text-sm">{t("trackingCode")}</h4>

            <input
              type="text"
              name="tracking_code"
              // value={score}
              onChange={(e) => setTracking_code(e.target.value)}
              placeholder={t("trackingCode")}
              className="input  input-bordered w-full text-sm"
            />
          </div>

          <div className="">
            <h4 className="mb-2 text-sm">{t("status")}</h4>

            <StatusDropDown stat={status} setstat={setStatus} />
          </div>

          <div className="">
            <h4 className="mb-2 text-sm">{t("chooseCategory")}</h4>

            <CategoryDropDown
              data={data}
              category_id={category_id}
              setCategory_id={setCategory_id}
            />
          </div>

          <div className="">
            

            <button
              type="submit"
              className="btn bg-green-500 hover:bg-green-600 font-medium text-sm  text-white"
              onClick={serachHandler}
            >
              {t("search")}
            </button>
          </div>
        </form>
      </TitleCard> */}
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
        <div className=" mt-4">
          <TitleCard
            isIcon={true}
            symbol={<IoIosList className=" text-lg text-white" />}
            title={t("newProvenWork")}
            topMargin="mt-2"
          >
            <div className="overflow-x-auto w-full">
              <table className="table w-full">
                <thead>
                  <tr className="text-center">
                    <th> {t("row")} </th>
                    <th>{t("trackingCode")}</th>
                    <th>{t("workName")}</th>
                    <th> {t("country")} </th>
                    <th> {t("language")}</th>
                    <th> {t("category")}</th>
                    <th> {t("numberOfComments")}</th>
                    <th> {t("score")}</th>
                    <th> {t("typeOfWork")}</th>
                    <th> {t("dateOfRegistration")} </th>
                    <th className="min-w-[10rem]"> {t("status")} </th>
                    <th >{t('details')} </th>
                    <th > {t("operations")} </th>
                  </tr>
                </thead>
                <tbody>
                  {works?.data?.data?.length === 0 ? (
                    <div className="ml-20 w-max py-6 text-center flex justify-center text-md font-yekanReg  text-red-400">
                      {t("emptyMsg")}
                    </div>
                  ) : (
                    works?.data?.data?.map((l, k) => {
                      return (
                        <tr key={k} className="cursor-pointer text-center">
                          <td>{++first}</td>
                          <td>{l?.tracking_code}</td>
                          <td> <span  className=" threeDoteName">{l?.title}</span></td>
                          <td>{l?.country}</td>
                          <td>
                            {l?.user?.lang === "fa"
                              ? t("persian")
                              : l?.user?.lang === "ar"
                              ? t("arabic")
                              : t("englishBir")}
                          </td>
                          <td>{l?.category?.name}</td>
                          <td>{l?.comment}</td>
                          <td>
                            <progress
                              className="progress progress-primary w-40"
                              value={l?.score ? l?.score : 0}
                              max="100"
                            ></progress>
                          </td>
                          <td>
                            {l?.type == 2 ? (
                              <div className="badge bg-yellow-400 text-xs gap-2 text-gray-700 py-4 px-4">
                                <span>{t("likeWork")}</span>
                                {/* <IoIosStar  /> */}
                              </div>
                            ) : l?.type == 1 ? (
                              <div className="badge badge-ghost text-xs gap-2  py-4 px-4">
                                <span>{t("normalWork")}</span>
                                {/* <IoIosStarOutline  /> */}
                              </div>
                            ) : (
                              <></>
                            )}
                          </td>
                          {/* <td>{l?.category.name ? l.category.name : ""}</td> */}
                          <td className="dateOfRegistration !ltr">
                            {formatDate(l?.updated_at)}
                            {/* {l?.updated_at ? l?.updated_at : ""} */}
                          </td>
                          <td>
                          {l?.status == 4 ? (
                                <div className="badge bg-red-600 text-xs gap-2 text-white py-4 px-4">
                                  {t("reject")}
                                  {/* رد شده */}
                                </div>
                              ) : l?.status == 2 ? (
                                <div className="badge bg-orange-600 text-xs gap-2 text-white py-4 px-4">
                                  {t("pending")}

                                  {/* درحال برسی */}
                                </div>
                              ) : l?.status == 1 ? (
                                <div className="badge bg-green-500 text-xs gap-2 text-white py-4 px-4">
                                  {t("accesseptStatus")}

                                  {/* تایید شده */}
                                </div>
                              ) : l?.status == 0 ? (
                                <div className="badge badge-ghost text-xs  py-4 px-4">
                                  {t("deactive")}

                                  {/* غیرفعال */}
                                </div>
                              ) : (
                                <></>
                              )}
                          </td>
                          <td>
                           
                           <Link
                             to={`/app/work/info/${l?.unique_key}/${l?.tracking_code}`}
                             className="btn font-medium text-xs "
                           >
                             <IoEyeOutline className="text-lg" />
                           </Link>
                     </td>
                          <td className="flex gap-2">
                            <button
                              onClick={() => statusItem(l?.unique_key)}
                              className={`btn text-white font-medium text-sm bg-green-500 hover:bg-green-600`}
                            >
                              <IoMdCheckmarkCircleOutline className=" text-lg" />{" "}
                              <span> {t("accessept")} </span>
                            </button>
                           
                            <button
                              onClick={() => {
                                setIsShowModal(true)
                                setSelected(l.unique_key);
                                document
                                  .getElementById(l.unique_key)
                                  .showModal(); 
                              }}
                              // onClick={() => rejectItem(l.unique_key)}
                              className={`btn bg-red-600 hover:bg-red-700 text-white  font-medium text-sm  `}
                            >
                              {/* <AiOutlineStop  className="text-lg" /> */}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="bi bi-slash-circle"
                                viewBox="0 0 16 16"
                              >
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                <path d="M11.354 4.646a.5.5 0 0 0-.708 0l-6 6a.5.5 0 0 0 .708.708l6-6a.5.5 0 0 0 0-.708" />
                              </svg>
                              <span>{t("reject")}</span>
                            </button>
                          </td>
                          {
                            isShowModal?(<>
                            
                          <Modal
                          setIsShowModal={setIsShowModal}
                            title={`${t("rejectReason")}`}
                            id={l?.unique_key}
                          >
                            <form
                              method="post"
                              onSubmit={rejectItem}
                              className="w-full grid grid-cols-1 gap-5"
                            >
                              <div className="mt-5">
                                {/* <h4 className="mb-2 text-sm">
                                  {t("description")}
                                </h4> */}
                                <textarea
                                  type="text"
                                  name="description"
                                  value={description}
                                  onChange={(e) =>
                                    setDescription(e.target.value)
                                  }
                                  placeholder={t("description")}
                                  rows="4"
                                  className="input h-28 input-bordered w-full text-sm py-3"
                                />
                              </div>

                              <div className="col-span-1 flex justify-start ">
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
                          </Modal>
                            </>):(<></>)
                          }
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
      )}
    </>
  );
}

export default NewWorkList;
