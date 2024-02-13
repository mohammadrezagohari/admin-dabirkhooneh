import { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import toast from "react-hot-toast";
import ReactPaginate from "react-paginate";
import { ThreeDots } from "react-loader-spinner";
import { IoIosList } from "react-icons/io";
import TitleCard from "../../../../components/Cards/TitleCard";
import {
  getAdminParticipantsWorkList,
  getWorkSearch,
} from "../../../../core/api/servises/users";
import { AuthContext } from "../../../../gard/context/AuthContext";
import { getAdminCategoryList } from "../../../../core/api/servises/categories";

function AdminParticipantsWorkList() {
  const { t } = useTranslation();
  const { unique_key } = useParams();
  const { userToken } = useContext(AuthContext);
  const [showDetails, setShowDetails] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const [title, setTitle] = useState(null);
  const [tracking_code, setTracking_code] = useState(null);
  const [category_id, setCategory_id] = useState(null);
  const [status, setStatus] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [apiCurrenPage, setApiCurrenPage] = useState(1);

  const showItemInfo = async (unique_key) => {
    const showResult = await getAdminParticipantsWorkList(
      unique_key,
      userToken,
      apiCurrenPage,
      itemsPerPage
    )
      .then(function (response) {
        setShowDetails(response);
        setIsLoading(false);
        // setCurrentPosts(response?.data?.data)
      })
      .catch(function (err) {
        // console.log("error", err);
      });
    return showResult;
  };

  useEffect(() => {
    showItemInfo(unique_key);
  }, [apiCurrenPage, itemsPerPage]);
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
  // console.log("getAdminParticipantsWorkList showDetails", showDetails);

  const levels = window.localStorage.getItem("level");
  const { data } = useQuery(
    ["categories-admin-participants-work-list", userToken],
    () => (levels == 5 ? getAdminCategoryList(userToken) : null)
  );

  // console.log("showDetails-=-=-=-=-=",showDetails);

  const currentPosts = allData;

  const paginate = (event) => {
    // const newOffset = (event.selected * per_page) +1;
    setApiCurrenPage(event.selected + 1);
    setCurrentPage(currentPage + 1);
    // console.log("currentPage", currentPage);
    // console.log("event.selected",event.selected);
  };
  let last = per_page * current_page;
  let first = last - per_page;
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
          title={`  ${t("registeredWorks")} ${
            showDetails?.more?.participant_name
          }  `}
          topMargin="mt-2"
        >
          <div className="overflow-x-auto w-full">
            <table className="table w-full">
              <thead>
                <tr className="text-center">
                  <th> {t("row")} </th>
                  <th>{t("trackingCode")}</th>
                  <th className="min-w-[10rem]">{t("workName")}</th>
                  {/* <th className="min-w-[10rem]"> {t("name")} </th> */}

                  {currentPosts[0]?.user?.lang == "fa" ? (
                    <th> {t("mobile")} </th>
                  ) : (
                    <th> {t("email")}</th>
                  )}

                  <th> {t("typeOfWork")}</th>
                  <th> {t("category")}</th>
                  <th className="min-w-[10rem]"> {t("status")} </th>
                  <th>{t("numberOfComments")}</th>
                  <th> {t("dateOfRegistration")} </th>
                  <th> {t("details")} </th>
                  <th className="min-w-[12rem]"> {t("comments")} </th>
                </tr>
              </thead>
              <tbody>
                {currentPosts?.length <= 0 ? (
                  <div className="ml-20   w-max py-6 text-center flex justify-center text-md font-yekanReg  text-red-400">
                    {t("emptyMsg")}
                  </div>
                ) : (
                  currentPosts?.map((l, k) => {
                    return (
                      <tr key={k} className="cursor-pointer text-center">
                        <td>{++first}</td>
                        <td>{l?.tracking_code}</td>
                        <td>{l?.title}</td>
                        {/* <td>{l?.user.name}</td> */}
                        {l?.user?.lang == "fa" ? (
                          <td>{l?.user?.mobile ? l?.user?.mobile : "-"}</td>
                        ) : (
                          <td>{l?.user?.email ? l?.user?.email : "-"}</td>
                        )}
                        <td>
                          {l?.type == "2" ? (
                            <div className="badge bg-yellow-400 text-xs gap-2 text-gray-700 py-4 px-4">
                              <span>{t("likeWork")}</span>
                              {/* <IoIosStar  /> */}
                            </div>
                          ) : l?.type == "1" ? (
                            <div className="badge badge-ghost text-xs gap-2  py-4 px-4">
                              <span>{t("normalWork")}</span>
                              {/* <IoIosStarOutline  /> */}
                            </div>
                          ) : (
                            <></>
                          )}
                        </td>
                        <td>{l?.category?.name}</td>
                        <td>
                          {l?.status == "4" ? (
                            <div className="badge bg-red-600 text-xs gap-2 text-white py-4 px-4">
                              {t("reject")}
                              {/* رد شده */}
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
                        <td>{l?.comment ? l?.comment : "-"}</td>

                        <td className="dateOfRegistration !ltr">
                          {formatDate(l?.updated_at)}
                          {/* {l?.updated_at ? l?.updated_at : ""} */}
                        </td>
                        <td>
                          {/* {
                            l?.status == 2 ?(<div className="col-span-2 flex justify-center items-center" >-</div>):(<>
                            
                            <Link
                              to={`/app/work/info/l?.unique_key}/${l?.tracking_code}`}
                              className="btn font-medium text-xs "
                            >
                              <IoEyeOutline className="text-lg" />
                            </Link>
                            </>)
                          } */}
                          <Link
                            to={`/app/work/info/${l?.unique_key}/${l?.tracking_code}`}
                            className="btn font-medium text-xs "
                          >
                            <IoEyeOutline className="text-lg" />
                          </Link>
                        </td>
                        <td className="grid grid-cols-2 gap-2">
                          {l?.status == 2 ? (
                            <div className="col-span-2 flex justify-center items-center">
                              -
                            </div>
                          ) : (
                            <>
                              <Link
                                to={`/app/guest/comments/${l?.unique_key}`}
                                className="btn font-medium text-sm "
                              >
                                {t("guests")}
                              </Link>

                              <Link
                                to={`/app/work/comments/${l?.unique_key}`}
                                className="btn  font-medium text-sm "
                              >
                                {t("jurors")}
                              </Link>
                            </>
                          )}
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
      )}
    </>
  );
}

export default AdminParticipantsWorkList;
