import { useContext, useEffect, useState } from "react";
import TitleCard from "../../../../components/Cards/TitleCard";
import { SlQuestion } from "react-icons/sl";
import { useTranslation } from "react-i18next";
import { PiPaintBrushLight } from "react-icons/pi";
import { FaRegCommentAlt } from "react-icons/fa";

import { IoEyeOutline } from "react-icons/io5";
import {
  getAdminDeleteWorkComment,
  getArtsSearch,
  getJurorWorkList,
  getWorkSearch,
} from "./../../../../core/api/servises/users";
import { useQuery } from "react-query";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../../gard/context/AuthContext";
import toast from "react-hot-toast";
import { CategoryDropDown } from "../../../../components/DropDowns/CategoryDropDown";
import { getGeneralGategoryList } from "../../../../core/api/servises/general";
import { StatusDropDown } from "../../../../components/DropDowns/StatusDropDown";
import FormatDate from "../../../../components/FormatDate/FormatDate";
import ReactPaginate from "react-paginate";
import { ThreeDots } from "react-loader-spinner";

import { TypeDropDown } from "../../../../components/DropDowns/TypeDropDown";
import SearchWork from "../../../../components/SearchBoxes/SearchWork/SearchWork";
function RefereeCommentList() {
  const { userToken } = useContext(AuthContext);
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [works, setWorks] = useState([]);
  const [currentPosts, setCurrentPosts] = useState(null);
  const [title, setTitle] = useState(null);
  const [tracking_code, setTracking_code] = useState(null);
  const [category_id, setCategory_id] = useState(null);
  const [status, setStatus] = useState(null);
  const [type, setType] = useState(null);
  // const [shamsiDate, setShamsiDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [apiCurrenPage, setApiCurrenPage] = useState(1);
  const getDatas = async () => {
    const result = await getJurorWorkList(
      userToken,
      apiCurrenPage,
      itemsPerPage
    )
      .then(function (response) {
        // console.log("response------------", response.data?.data.work);
        setWorks(response);
        setCurrentPosts(response?.data?.data);
        setIsLoading(false);
      })
      .catch(function (err) {
        console.log("error", err);
      });
    return result;
  };
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

  const { data } = useQuery(["categories-referee-list", userToken], () =>
    getGeneralGategoryList(userToken)
  );

 


  const serachHandler = async (e) => {
    e.preventDefault();
    await getWorkSearch({
      userToken: userToken,
      title: title,
      tracking_code: tracking_code,
      type: type,
      status: status,
    })
      .then(function (response) {
        if (
          title == null &&
          tracking_code == null &&
          type == null &&
          status == null
        ) {
          // getDatas();
        } else {
          setWorks(response);
        }
        console.log("response", response.data?.data);
        setWorks(response);
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
    console.log("currentPage", currentPage);
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
            <h4 className="mb-2 text-sm">{t("chooseType")}</h4>

            <TypeDropDown type={type} setType={setType} />
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
        <div className="mt-4">
          <TitleCard
            isIcon={true}
            symbol={<PiPaintBrushLight className=" text-lg text-white" />}
            title={t('looksProvenToMe')}
            topMargin="mt-2"
          >
            <div className="overflow-x-auto w-full">
              <table className="table w-full">
                <thead>
                  <tr className="text-center">
                    <th> {t("row")} </th>
                    <th>{t("trackingCode")}</th>
                    <th>{t("workName")}</th>
                    {/* <th className="min-w-[10rem]"> {t("name")} </th> */}
                    {/* <th> {t("mobile")} </th> */}
                    {/* <th> {t("email")}</th> */}
                    <th> {t("typeOfWork")}</th>
                    <th> {t("category")}</th>
                    <th> {t("numberOfComments")}</th>
                    <th> {t("dateOfRegistration")} </th>
                    <th className="min-w-[9rem]"> {t("status")} </th>
                    <th >{t("details")} </th>
                    <th> {t("jurorsComments")} </th>
                    {/* <th> {t("operations")} </th> */}
                  </tr>
                </thead>
                <tbody className="w-full">
                  {works?.data?.data.length <= 0 ? (
                    <tr className="w-full flex justify-center items-center  ">
                      <td className="ml-20  w-max text-center mt-6 text-md font-yekanReg  text-red-400">
                        {t("emptyMsg")}
                      </td>
                    </tr>
                  ) : (
                    works?.data?.data.map((l, k) => {
                      return (
                        <tr key={k} className="cursor-pointer text-center">
                          <td>{k + 1}</td>
                          <td>{l?.tracking_code}</td>
                          <td> <span  className=" threeDoteName">{l?.title}</span></td>
                          {/* <td>{l?.user?.name}</td> */}
                          {/* <td>{l?.user?.mobile ? l?.user?.mobile : "-"}</td> */}
                          {/* <td>{l?.user?.email ? l?.user?.email : "-"}</td> */}
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
                          <td>{l?.comment}</td>
                          <td className="dateOfRegistration !ltr">
                            {formatDate(l?.updated_at)}
                            {/* <FormatDate  stringDate={l?.updated_at} /> */}
                          </td>
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
                          <td>
                            <Link
                              to={`/app/work/info/${l?.unique_key}/${l.tracking_code}`}
                              className="btn font-medium text-xs "
                            >
                              <IoEyeOutline className="text-lg" />
                            </Link>
                          </td>
                          <td className="">
                            <Link
                              to={`/app/referee/comments/${l?.unique_key}`}
                              className="btn font-medium text-xs "
                            >
                              <FaRegCommentAlt className="text-lg opacity-80" />
                            </Link>
                          </td>
                          <td>
                            {/* <button
                              type="button"
                              onClick={() => deleteItem(l.unique_key)}
                              className="btn bg-red-600 hover:bg-red-700 text-sm font-medium text-white"
                            >
                              {" "}
                              <GoTrash className=" text-lg" /> {t("delete")}{" "}
                            </button> */}
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
      )}
    </>
  );
}

export default RefereeCommentList;
