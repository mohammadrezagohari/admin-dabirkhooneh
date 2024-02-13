
import { useContext, useEffect, useState } from "react";
import { IoIosList } from "react-icons/io";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { GoTrash } from "react-icons/go";
import TitleCard from "../../../../components/Cards/TitleCard";
import {
  getAdminDeleteWorkComment,
  getAdminJurorCommentList
} from "../../../../core/api/servises/users";
import { AuthContext } from "../../../../gard/context/AuthContext";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ReactPaginate from "react-paginate";
import { ThreeDots } from "react-loader-spinner";import Modal from "../../../../components/modal/Modal";
import i18n from "i18next";
import toast from "react-hot-toast";


function AdminRefereeCommentsList() {
  const { unique_key } = useParams();
  const { userToken } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  const { t } = useTranslation();
  const [showDetails, setShowDetails] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [apiCurrenPage, setApiCurrenPage] = useState(1);
  const showItemInfo = async (unique_key) => {
    const showResult = await getAdminJurorCommentList(unique_key, userToken, apiCurrenPage,
      itemsPerPage)
      .then(function (response) {
        setShowDetails(response);
        setIsLoading(false);
      })
      .catch(function (err) {
        // console.log("error", err);
      });
    return showResult;
  };
  const allData = showDetails?.data?.data;
  // console.log("allData --->", allData);
  const current_page = showDetails?.data?.current_page;
  // console.log("current_page --->", current_page);
  const from = showDetails?.data?.from;
  // console.log("from --->", from);
  const to = showDetails?.data?.to;
  // console.log("to --->", to);
  const last_page = showDetails?.data?.last_page; /// last page count
  // console.log("last_page --->", last_page);
  const per_page = showDetails?.data?.per_page; //// per page
  // console.log("per_page --->", per_page);
  const total = showDetails?.data?.total; /// all items count
  // console.log("total --->", total);
  const deleteItem = async (unique_key) => {
    const deleteResult = await getAdminDeleteWorkComment(unique_key, userToken)
      .then(function (response) {
        if (response.status) {
          // toast.success("حذف با موفقیت انجام شد !");
          setShowDetails(
            showDetails?.data?.data.filter(
              (ptr) => ptr.unique_key !== unique_key
            )
          );
          showItemInfo(unique_key);
          // console.log("response result : ", response);
          toast.success(`${response.status.message}`);
        }
      })
      .catch(function (error) {
        // console.log("error", error.response.data.status);
        toast.error(`${error.response.data.status.message}`);
        showItemInfo(unique_key);
      });

    return deleteResult;
  };
  useEffect(() => {
    showItemInfo(unique_key);
  }, [apiCurrenPage, itemsPerPage]);

  const currentPosts = allData;

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
        <TitleCard
          isIcon={true}
          symbol={<IoIosList className=" text-lg text-white" />}
          title={` ${t('listOfRegisteredComments')} ${showDetails?.more?.juror_name}   `}
          topMargin="mt-2"
        > 
          {/* {unique_key} */}
          <div className="overflow-x-auto w-full">
            <table className="table w-full">
              <thead>
                <tr className="text-center">
                  <th> {t("row")} </th>
                  <th > {t("name")} </th>
                  <th> {t("mobile")} </th>
                      <th> {t("email")}</th>
                  <th className=""> {t("description")} </th>
                  <th> {t("score")}</th>
                  <th> {t("language")}</th>
                  {/* <th> {t("category")}</th> */}
                  {/* <th> {t('nationality')} </th> */}
                  <th > {t("dateOfRegistration")} </th>
                  <th className="min-w-[10rem]"> {t("status")} </th>
                  <th className="min-w-[8rem]"> {t("operations")} </th>
                </tr>
              </thead>
              <tbody>
                {currentPosts?.length <= 0 ? (
                  <div className="ml-20  w-max py-6 text-center flex justify-center text-md font-yekanReg  text-red-400">
                    {t("emptyMsg")}
                  </div>
                ) : (
                  currentPosts?.map((l, k) => {
                    return (
                      <tr key={k} className="cursor-pointer text-center">
                        <td>{++first}</td>
                        <td> <span  className=" threeDoteName">
                          {l?.juror?.name}
                          </span>
                          </td>
                          <td>{l?.juror?.mobile ? l?.juror?.mobile : "-"}</td>
                          <td>{l?.juror?.email ? l?.juror?.email : "-"}</td>
                        <td className="flex items-center gap-2 justify-center">
                          <div className="px-2">
                            <span className=" threeDote">
                              {l?.description ? l?.description : "-"}
                            </span>
                          </div>
                          {l?.description ? (
                            <button
                              className="btn font-medium text-xs"
                              onClick={() =>
                                document.getElementById(`${l?.id}`).showModal()
                              }
                            >
                              {t("showMore")}
                            </button>
                          ) : (
                            <></>
                          )}
                        </td>
                        <td>
                          <progress
                            className="progress progress-primary w-40"
                            value={l?.score ? l?.score : 0}
                            max="100"
                          ></progress>
                          {/* <progress id="file" value={l?.score} max="100"> {l?.score} </progress> */}
                        </td>
                        {/* <td>{l?.email ? l.email : "-"}</td> */}
                        <td>
                          {l?.juror?.lang === "fa"
                            ? t("persian")
                            : l?.juror?.lang === "ar"
                            ? t("arabic")
                            : t("englishBir")}
                        </td>
                        {/* <td>{l?.category.name ? l.category.name : ""}</td> */}
                        <td className="dateOfRegistration !ltr" >
                          {/* {l?.updated_at ? l?.updated_at : ""} */}
                          {formatDate(l?.updated_at)}
                        </td>
                        <td>
                          {l?.status == "4" ? (
                           <div className="badge bg-green-500 text-xs gap-2 text-white py-4 px-4">
                           {t("accesseptStatus")}

                           {/* تایید شده */}
                         </div>
                          ) : l?.status == "2" ? (
                            <div className="badge bg-orange-600 text-xs gap-2 text-white py-4 px-4">
                              {t("pending")}

                              {/* درحال برسی */}
                            </div>
                          ) : l?.status == "1" ? (
                            <div className="badge bg-green-500 text-xs gap-2 text-white py-4 px-4">
                              {t("accesseptStatus")}

                              {/* تایید شده */}
                            </div>
                          ) : l?.status == "0" ? (
                            <div className="badge badge-ghost text-xs  py-4 px-4">
                              {t("deactive")}

                              {/* غیرفعال */}
                            </div>
                          ) : (
                            <></>
                          )}
                        </td>
                        <td>
                         
                              <button
                                onClick={() => deleteItem(l.unique_key)}
                                className="btn bg-red-600 hover:bg-red-700 text-sm font-medium text-white"
                              >
                                {" "}
                                <GoTrash className=" text-lg" />{" "}
                                {t("delete")}{" "}
                              </button>
                        
                          
                        </td>
                      </tr>
                    );
                  })
                )}
                {currentPosts?.map((l, k) => (
                  <Modal key={k} id={l?.id}>

                      <p className={`py-4 ${i18n.language=="en"?"text-left":"text-right"} `}>
                        {l?.description ? l?.description : "-"}
                      </p>
                  </Modal>
                  
                ))}
              </tbody>
            </table>
          </div>
          {
              total>0   ?(<>
              
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
              </>):(<>
              
              </>)
            }
        </TitleCard>
      )}
    </>
  );
}

export default AdminRefereeCommentsList;
