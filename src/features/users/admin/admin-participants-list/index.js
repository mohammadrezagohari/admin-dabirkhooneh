import { useContext, useEffect, useState } from "react";
import { SlQuestion } from "react-icons/sl";
import { IoIosList } from "react-icons/io";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { ThreeDots } from "react-loader-spinner";
import TitleCard from "../../../../components/Cards/TitleCard";
import { 
  getAdminParticipantsList,
  getParticipantSearch,
  getUserParticipantSearch,
} from "../../../../core/api/servises/users";
import { AuthContext } from "../../../../gard/context/AuthContext";
import { getAdminCategoryList } from "../../../../core/api/servises/categories";
import ReactPaginate from "react-paginate";
import SearchUser from "../../../../components/SearchBoxes/SearchUser/SearchUser";

function AdminParticipantsList() {
  const { t } = useTranslation();
  const { userToken } = useContext(AuthContext);

  const [participants, setParticipants] = useState([]);
  const [currentPosts, setCurrentPosts] = useState(null);
  const [isLoading, setIsLoading] = useState(true);


  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [apiCurrenPage, setApiCurrenPage] = useState(1);
  const [data, setData] = useState(null);

  const levels = window.localStorage.getItem("level");
  // const { data } = useQuery(
  //   ["categories-admin-participants-list-dropdown", userToken],
  //   () => levels == 5 ? getAdminCategoryList(userToken) : null
  // );
  const getAdminParticip = async () => {
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
    const result = await getAdminParticipantsList(
      userToken,
      apiCurrenPage,
      itemsPerPage
    )
      .then(function (response) {
        setParticipants(response);

        setCurrentPosts(response?.data?.data)
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
  const allData = participants?.data?.data;
  // console.log("allData --->", allData);
  const current_page = participants?.data?.current_page;
  // console.log("current_page --->", current_page);
  const from = participants?.data?.from;
  // console.log("from --->", from);
  const to = participants?.data?.to;
  // console.log("to --->", to);
  const last_page = participants?.data?.last_page; /// last page count
  // console.log("last_page --->", last_page);
  const per_page = participants?.data?.per_page; //// per page
  // console.log("per_page --->", per_page);
  const total = participants?.data?.total; /// all items count
  // console.log("total --->", total);

  useEffect(() => {
    getDatas();
  }, [apiCurrenPage, itemsPerPage]);

  useEffect(() => {
    if(levels ==5) getAdminParticip();
  }, []);

  
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
    <SearchUser
        data={data}
        datas={participants}
        setDatas={setParticipants}
        apiFun={getParticipantSearch}
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
        <div className=" mt-4">
          <TitleCard
            isIcon={true}
            symbol={<IoIosList className=" text-lg text-white" />}
            title={t('participantsList')}
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
                    <th> {t('numberOfWorks')} </th>
                    <th >
                      {" "}
                      {t("dateOfRegistration")}{" "}
                    </th>
                    <th className=""> {t("works")} </th>
                  </tr>
                </thead>
                <tbody>
                  {participants?.data?.data.map((l, k) => {
                    return (
                      <tr key={k} className="cursor-pointer text-center">
                        <td className=" text-center">{++first}</td>
                        <td> <span  className=" threeDoteName">{l?.name}</span></td>
                        <td>{l?.mobile ? l?.mobile : "-"}</td>
                        <td>{l?.email ? l?.email : "-"}</td>
                        <td>
                          {l?.lang === "fa"
                            ? t("persian")
                            : l?.lang === "ar"
                            ? t("arabic")
                            : t("englishBir")}
                        </td>
                        <td>{l?.works ? l?.works : "-"}</td>
                        <td className="dateOfRegistration !ltr" >
                          {formatDate(l?.updated_at)}
                          {/* {l?.updated_at ? l.updated_at : ""} */}
                        </td>
                        <td className="">
                          <Link
                            to={`/app/participant/works/${l?.unique_key}`}
                            className="btn  font-medium text-sm "
                          >
                            {t("works")}
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            {total>0   ? (
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

export default AdminParticipantsList;
