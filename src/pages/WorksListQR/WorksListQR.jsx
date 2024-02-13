import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { PiPaintBrushLight } from "react-icons/pi";
import { useTranslation } from "react-i18next";
import i18n from "i18next";
import { useQuery } from "react-query";
import QRCode from "react-qr-code";
import { Link } from "react-router-dom";
import { getWorkLists } from "../../core/api/servises/works";
import { AuthContext } from "../../gard/context/AuthContext";
// import TitleCard from "../../components/Cards/TitleCard";
import TitleCard from "./../../components/Cards/TitleCard";
import { getGeneralArtList } from "../../core/api/servises/general";

import toast from "react-hot-toast";
import ReactPaginate from "react-paginate";
import { ThreeDots } from "react-loader-spinner";

function WorksListQR() {
  const { t } = useTranslation();
  const [lang, setlang] = useState("en");
  const { userToken } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [arts, setArts] = useState([]);
  // const [title, setTitle] = useState(null);
  // const [tracking_code, setTracking_code] = useState(null);
  // const [category_id, setCategory_id] = useState(null);
  // const [status, setStatus] = useState(null);

  // const { isLoading, data } = useQuery(["qr-works-list", userToken], () =>
  //   getGeneralArtList(userToken)
  // );
  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [apiCurrenPage, setApiCurrenPage] = useState(1);
  const getDatas = async () => {
    const result = await getGeneralArtList(
      userToken,
      apiCurrenPage,
      itemsPerPage
    )
      .then(function (response) {
        setArts(response);
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
  const allData = arts?.data?.data;
  // console.log("allData --->", allData);
  const current_page = arts?.data?.current_page;
  // console.log("current_page --->", current_page);
  const from = arts?.data?.from;
  // console.log("from --->", from);
  const to = arts?.data?.to;
  // console.log("to --->", to);
  const last_page = arts?.data?.last_page; /// last page count
  // console.log("last_page --->", last_page);
  const per_page = arts?.data?.per_page; //// per page
  // console.log("per_page --->", per_page);
  const total = arts?.data?.total; /// all items count
  // console.log("total --->", total);
  useEffect(() => {
    getDatas();
  }, [apiCurrenPage, itemsPerPage]);
  // console.log("work------------->", data?.data);

  const changeLanguage = (event) => {
    i18n.changeLanguage(event.target.value);
    setlang(event.target.value);
    // console.log("i18n ::::", i18n.language);
  };

  // console.log("data-----> ::::", data);
  // const serachHandler = async (e) => {
  //   e.preventDefault();
  //   await getWorkSearch({
  //     userToken: userToken,
  //     title: title,
  //     tracking_code: tracking_code,
  //     category_id: category_id,
  //     status: status,
  //   })
  //     .then(function (response) {
  //       if (
  //         title == null &&
  //         tracking_code == null &&
  //         category_id == null &&
  //         status == null
  //       ) {
  //         getDatas();
  //       } else {
  //         setArts(response?.data?.data);
  //       }
  //       // console.log("response", response.data?.data);
  //       // setIsLoading(false);
  //     })
  //     .catch(function (error) {
  //       // console.log("error", error.response.data.status);
  //       toast.error(`${error.response.data.status.message}`);
  //     });
  // };

  // const { data } = useQuery(["categories-qr-list"], () => getCategoryList());

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
  return (
    <>
      <nav className="w-full flex justify-end lg:pb-2 md:pb-2 lg:p-10 md:p-10  p-2  bg-gray-800 md:bg-transparent lg:bg-transparent">
        <select
          onChange={changeLanguage}
          className="border border-gray-500 select select-sm mr-4"
        >
          {/* <option disabled selected>{t("language")}</option> */}
          <option value="en">{t("en")}</option>
          <option value="fa" selected>
            {t("fa")}
          </option>
          <option value="ar">{t("ar")}</option>
        </select>
      </nav>

      <div className="flex flex-col gap-5 p-5 pt-0 lg:p-12 lg:pt-5">
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
        ) : (
          <TitleCard
            isIcon={true}
            symbol={<PiPaintBrushLight className=" text-lg text-white" />}
            title={t("participantWorkslist")}
            topMargin="mt-2"
          >
            {/* Invoice list in table format loaded constant */}
            <div className="overflow-x-auto w-full">
              <table
                className={`table w-full ${
                  i18n.language == "en" ? "ltr" : "rtl"
                } `}
              >
                <thead>
                  <tr className="text-center">
                    <th> {t("row")} </th>
                    <th>{t("trackingCode")}</th>
                    <th className="min-w-[10rem]">{t("workName")}</th>
                    <th className="min-w-[10rem]"> {t("name")} </th>
                    <th> {t("mobile")} </th>
                    <th> {t("email")}</th>
                    <th> {t("typeOfWork")}</th>
                    <th> {t("score")}</th>
                    <th> {t("category")}</th>
                    <th className="min-w-[10rem]"> {t("status")} </th>
                    {/* <th> {t("comments")} </th> */}
                    <td>{t("details")}</td>
                  </tr>
                </thead>
                <tbody>
                  {currentPosts?.lengtn <= 0 ? (
                    <div className="ml-20  w-max py-6 text-center flex justify-center text-md font-yekanReg  text-red-400">
                      {t("emptyMsg")}
                    </div>
                  ) : (
                    currentPosts?.map((l, k) => {
                      return (
                        <tr key={k} className="cursor-pointer text-center">
                          <td>{++first}</td>
                          <td>{l?.tracking_code}</td>
                          <td>{l?.title}</td>
                          <td>{l?.user?.name}</td>
                          <td>{l?.user?.mobile ? l?.user?.mobile : "-"}</td>
                          <td>{l?.user?.email ? l?.user?.email : "-"}</td>
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
                          <td>
                            <progress
                              className="progress progress-primary w-40"
                              value={l?.score ? l.score : 0}
                              max="100"
                            ></progress>
                            {/* <progress id="file" value={l?.score} max="100"> {l?.score} </progress> */}
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
                          <td className="flex items-center gap-3">
                            {/* <Link
                              to={`/app/guest/comments/${l?.unique_key}`}
                              className="btn"
                            >
                              {t("guests")}
                            </Link>

                            <Link
                              to={`/app/juror/comments/${l?.unique_key}`}
                              className="btn"
                            >
                              {t("jurors")}
                            </Link> */}
                          </td>
                          <td className="flex justify-center">
                            <QRCode
                              value={`https://dabirkhane.mohammadrasoulollah.com/work/informatin/${l?.unique_key}/${l?.tracking_code}`}
                              size="100"
                            />
                            {/* <QRCode value={`https://dabirkhane.mohammadrasoulollah.com/core/api/v1//${i18n.language === "fa"?"app/post-guest-comment-ir-work":"app/post-guest-comment-international-work"}/${wrk.tracking_code}`} size="100" /> */}
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
      </div>
    </>
  );
}

export default WorksListQR;
