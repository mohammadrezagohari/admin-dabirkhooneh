import i18n  from 'i18next';
import { useState, useContext, useEffect } from "react";
import { IoIosList } from "react-icons/io";
import { GoTrash } from "react-icons/go";
import { IoPower, IoEyeOutline, IoReturnUpBack } from "react-icons/io5";
import toast from "react-hot-toast";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import TitleCard from "../../../components/Cards/TitleCard";
import { ThreeDots } from "react-loader-spinner";
import { AuthContext } from "../../../gard/context/AuthContext";
import {
  adminDeleteCategory,
  getAdminCategoryList,
  postAdminAdddNewCategory,
  postAdminShangeStatusCategory,
  postAdminUpdateCategory,
} from "../../../core/api/servises/categories";
import { useTranslation } from "react-i18next";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import ReactPaginate from "react-paginate";
import Modal from "../../../components/modal/Modal";

function GategoryList() {
  const { t } = useTranslation();
  const { userToken } = useContext(AuthContext);
  
  const [isShowDetails, setIsShowDetails] = useState(false);
  const [unique_key, setUnique_key] = useState(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");

  //////loader state
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmited, setIsSubmited] = useState(false);
  const [isChangeStatus, setIsChangeStatus] = useState(false);
  const [selectItems, setSelectItems] = useState(0);


  const [categories, setCategories] = useState([]);
  const [currentPosts, setCurrentPosts] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [apiCurrenPage, setApiCurrenPage] = useState(1);

  const getDatas = async () => {
    const result = await getAdminCategoryList(userToken, apiCurrenPage,
      itemsPerPage)
      .then(function (response) {
        // console.log("response", response);
        setCategories(response);
        setCurrentPosts(response?.data?.data)
        setIsLoading(false);
      })
      .catch(function (err) {
        //console.log("error", err);
      });
    return result;
  };

  const allData = categories?.data?.data;
  // console.log("allData --->", allData);
  const current_page = categories?.data?.current_page;
  // console.log("current_page --->", current_page);
  const from = categories?.data?.from;
  // console.log("from --->", from);
  const to = categories?.data?.to;
  // console.log("to --->", to);
  const last_page = categories?.data?.last_page; /// last page count
  // console.log("last_page --->", last_page);
  const per_page = categories?.data?.per_page; //// per page
  // console.log("per_page --->", per_page);
  const total = categories?.data?.total; /// all items count
  // console.log("total --->", total);
  useEffect(() => {
    setTimeout(() => {
      getDatas();
    }, 3000);
  }, [apiCurrenPage, itemsPerPage]);

  const deleteItem = async (unique_key) => {
    const deleteResult = await adminDeleteCategory(unique_key, userToken)
      .then(function (response) {
       
        if (response.status) {
          setIsShowDetails(false);
          getDatas();
          toast.success(`${response?.status?.message}`);
          setCategories(
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
      .catch(function (err) {
        // toast.error("خطا !! مجددا تلاش نمایید");
        //console.log("error", err);
      });



     

    return deleteResult;
  };

  const statusItem = async (unique_key) => {
    setIsChangeStatus(true);
    const statusResult = await postAdminShangeStatusCategory(
      unique_key,
      userToken
    )
      .then(function (response) {
        

        if (response.status) {
          setTimeout(() => {
            toast.success(`${response.status.message}`);
            setIsChangeStatus(false);
          }, 700);
          getDatas();


        } else {
          setIsChangeStatus(false);

        }
        getDatas();
      })
      .catch(function (error) {
        // console.log("error", error.response.data.status);
        toast.error(`${error.response.data.status.message}`);
      });

    return statusResult;
  };

  const updateItem = async (e) => {
    e.preventDefault();
    setIsSubmited(true);
    const formData = new FormData();

    formData.append("name", newName);
    formData.append("description", newDescription);

    const createResult = await postAdminUpdateCategory(
      unique_key,
      formData,
      userToken
    )
      .then(function (response) {
        // console.log("response result : ", response);
        if (response.status) {
          toast.success(`${response.status.message}`);
          setIsSubmited(false);
          setIsShowDetails(false);
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

  const storeItem = async (e) => {
    e.preventDefault();
    setIsSubmited(true);
    const formData = new FormData();

    formData.append("name", name);
    formData.append("description", description);

    const createResult = await postAdminAdddNewCategory(formData, userToken)
      .then(function (response) {
        // console.log("response result : ", response);
        if (response.status) {
          toast.success(`${response.status.message}`);
          setIsSubmited(false);
          setDescription("");
          setName("");
        } else {
          setIsSubmited(false);
          setDescription("");
          setName("");
        }
        getDatas();
      })
      .catch(function (error) {
        // console.log("error", error.response.data.status);
        toast.error(`${error.response.data.status.message}`);
        setIsSubmited(false);
        setDescription("");
        setName("");
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


  return (
    <>
      <div className="flex items-start justify-center lg:flex-nowrap flex-wrap gap-4">
        <div className="w-full  lg:w-[65%]">
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
              title={t('categoryList')}
              topMargin="mt-2"
            > 
            
              <div className="overflow-x-auto w-full">
                <table className="table w-full">
                  <thead className=" w-full">
                    <tr className="text-center w-full">
                      <th> {t("row")} </th>
                      <th > {t("name")} </th>
                      <th > {t("description")} </th>
                      <th >  {t('operations')} </th>
                      <th >  {t('details')} </th>
                    </tr>
                  </thead>
                  <tbody className=" w-full">
                    {currentPosts?.map((l, k) => {
                      return (
                        <tr
                          key={k}
                          className="cursor-pointer text-center w-full"
                        >
                          <td>{k + 1}</td>
                          <td> <span  className=" threeDoteName">{l?.name}</span></td>
                          <td className="inline-flex items-center gap-1 justify-center">
                             <span className=" threeDote">
                                {l?.description ? l.description : "-"}
                              </span>
                            {/* <div className="px-2">
                              <span className=" threeDote">
                                {l?.description ? l.description : "-"}
                              </span>
                            </div>
                            {l?.description ? (
                              <button
                                className="btn font-medium text-xs"
                                onClick={() =>
                                  document
                                    .getElementById(`${l?.id}`)
                                    .showModal()
                                }
                              >
                                {t("showMore")}
                              </button>
                            ) : (
                              <></>
                            )} */}
                          </td>
                          <td className="grid grid-cols-2 gap-2">
                            {/* <button className="btn"> {t('assisStatus')}</button> */}
                          </td>
                          <td>
                            <button
                              onClick={() => {
                                statusItem(l.unique_key)
                                setSelectItems(k)
                              }}
                              className={`btn  text-sm  text-white font-medium ${
                                l.status === 1
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
                          </td>
                          <td>
                            <button
                              onClick={() => {
                                setUnique_key(l.unique_key);
                                setIsShowDetails(true);
                                setNewName(l.name);
                                setNewDescription(
                                  l.description.length > 0 ? l.description : ""
                                );
                              }}
                              className="btn font-medium text-xs"
                            >
                              <IoEyeOutline className=" text-lg" />
                            </button>

                          </td>
                        </tr>
                      );
                    })}
                    {currentPosts?.map((l, k) => (
                      <Modal id={l?.id} key={k} >
                        <p className={`py-4 ${i18n.language=="en"?"text-left":"text-right"}`}>
                            {l?.description ? l.description : "-"}
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
        </div>
        {isShowDetails ? (
          <div className="w-full  lg:w-[35%]">
            <TitleCard
              isIcon={true}
              symbol={<IoIosList className=" text-lg text-white" />}
              title={t('updateCategory')}
              topMargin="mt-2"
            >
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
                    required
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder={t("name")}
                    className="input input-bordered w-full text-sm"
                  />
                </div>

                <div className="">
                  <h4 className="mb-2 text-sm">{t("description")}</h4>
                  <textarea
                    type="text"
                    name="description"
                    required
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    placeholder={t("description")}
                    rows="4"
                    className="input h-28 input-bordered w-full text-sm py-3"
                  />
                </div>

                <div className="col-span-1 btnColloction flex justify-start gap-1 ">
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
                    className="btn btn-primary flex justify-center items-center"
                  >
                    {isSubmited ? (
                      <span className="loading loading-dots loading-md"></span>
                    ) : (
                      <>{t("send")}</>
                    )}
                  </button>
 
                  <button
                   type="button"
                    onClick={() => {
                      deleteItem(unique_key);
                    }}
                    className="btn bg-red-600 hover:bg-red-700 text-sm font-medium text-white"
                  >
                    {" "}
                    <GoTrash className=" text-lg" /> {t("delete")}{" "}
                  </button>
                </div>
              </form>
            </TitleCard>
          </div>
        ) : (
          <div className="w-full  lg:w-[35%]">
            <TitleCard
              isIcon={true}
              symbol={<IoIosList className=" text-lg text-white" />}
              title={t('newCategory')}
              topMargin="mt-2"
            >
              <form
                method="post"
                onSubmit={storeItem}
                className="grid grid-cols-1 gap-5 "
              >
                <div className="">
                  <h4 className="mb-2 text-sm">{t("name")}</h4>
                  <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t("name")}
                    className="input input-bordered w-full text-sm"
                  />
                </div>

                <div className="">
                  <h4 className="mb-2 text-sm">{t("description")}</h4>
                  <textarea
                    type="text"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder={t("description")}
                    rows="4"
                    className="input h-28 input-bordered w-full text-sm py-3"
                  />
                </div>
                <div className="col-span-1  ">
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
            </TitleCard>
          </div>
        )}
      </div>
    </>
  );
}

export default GategoryList;
