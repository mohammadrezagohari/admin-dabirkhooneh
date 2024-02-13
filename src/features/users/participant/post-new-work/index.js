import { useContext, useState, useRef } from "react";
import { SlQuestion } from "react-icons/sl";
import { PiPaintBrushLight } from "react-icons/pi";
import TitleCard from "../../../../components/Cards/TitleCard";

import { useQuery } from "react-query";
import { AuthContext } from "../../../../gard/context/AuthContext";
import { postParticipantNewWork } from "../../../../core/api/servises/users";
import { CategoryDropDown } from "../../../../components/DropDowns/CategoryDropDown";
import { deleteFile, uploadFile } from "../../../../core/api/servises/upload";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import { getGeneralGategoryList } from "../../../../core/api/servises/general";
import DocViewer, {
  DocViewerRenderers,
  PDFRenderer,
  PNGRenderer,
} from "@cyntler/react-doc-viewer";
import i18n from "i18next";
import { ThreeDots } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
// import i18next from "i18next";
function PostNewWork() {
  const { userToken } = useContext(AuthContext);
  const { t } = useTranslation();
  const [title, setTitle] = useState("");
  const [preview, setPreview] = useState(null);
  const [previewArray, setPreviewArray] = useState([]);
  const [description, setDescription] = useState("");
  const [category_id, setCategory_id] = useState(0);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [isSubmited, setIsSubmited] = useState(false);
  const [isUploadSubmited, setIsUploadSubmited] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [files, setFiles] = useState([]);
  const [isShowFiles, setisShowFiles] = useState(false);
  const navigate = useNavigate();
  const [url, setUrl] = useState(null);
  const { isLoading, data } = useQuery(
    "new-work-gategory-list",
    getGeneralGategoryList
  );
  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    setUrl(URL.createObjectURL(file));
    setSelectedFile(file);
    setisShowFiles(true);
    // console.log("selectedFile ---> ", selectedFile);
  };
  console.log("selectedFile ---> ", selectedFile);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploadSubmited(true);
    // console.log("our file is ", selectedFile);
    const createResult = await uploadFile(
      {
        file: selectedFile,
      },
      userToken
    )
      .then(function (response) {
        if (response.status) {
          setFiles([...files, response?.data?.unique_key]);
          console.log("response result== : ", response?.data);
          setPreviewArray([...previewArray, response?.data]);

          console.log("unique_key :::", response?.data?.unique_key);
          toast.success(`${response.status.message}`);
          setIsUploadSubmited(false);
          setisShowFiles(false);
          // setisShowFiles(true)
        } else {
          setIsUploadSubmited(false);
          // setisShowFiles(false)
        }
        // getDatas()
      })
      .catch(function (error) {
        // console.log("error", error.response.data.status);
        toast.error(`${error.response.data.status.message}`);
        setIsSubmited(false);
        setisShowFiles(false);
        setIsUploadSubmited(false);
      });

    return createResult;
  };
  // console.log('previewArray :::',previewArray)

  const storeItem = async (e) => {
    e.preventDefault();
    setIsSubmited(true);
    const formData = new FormData();
    // formData.append("title", title);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("country", country);
    formData.append("category_id", category_id);
    formData.append("city", city);
    // formData.append("file", files);
    for (let i = 0; i < files.length; i++) {
      formData.append("file[]", files[i]);
    }
    const createResult = await postParticipantNewWork(formData, userToken)
      .then(function (response) {
        // console.log("response result : ", response);
        if (response.status) {
          toast.success(`${response.status.message}`);

          navigate("/app/my-work-list");
          setIsSubmited(false);
        } else {
          setIsSubmited(false);
        }
        // getDatas()
      })
      .catch(function (error) {
        // console.log("error", error.response.data.status);
        toast.error(`${error.response.data.status.message}`);
        setIsSubmited(false);
      });

    return createResult;
  };

  const deleteItem = async (unique_key) => {
    const deleteResult = await deleteFile(unique_key, userToken)
      .then(function (response) {
        // console.log("response deleteItem",response)
        if (response.status) {
          // setIsShowDetails(false);
          // getDatas();
          setFiles(files.filter((ptr) => ptr !== unique_key));
          toast.success(`${response?.status?.message}`);
          // console.log("response result : ", response);
          // console.log("isShowDetails deleteItem",isShowDetails)
        } else {
          // setIsSubmited(false);
          // setIsShowDetails(false);
          // getDatas();
        }
        // getDatas();
      })
      .catch(function (error) {
        // console.log("error", error.response.data.status);
        // setIsShowDetails(false);

        toast.error(`${error?.response?.data?.status?.message}`);
      });

    return deleteResult;
  };

  const uploadedFiles = [];
  for (let i = 1; i <= files.length; i++) {
    uploadedFiles.push(i);
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
        <form
          encType="multipart/form-data"
          method="post"
          onSubmit={storeItem}
          className=" "
        >
          <div className="flex items-start justify-center lg:flex-nowrap flex-wrap gap-4">
            <div className="w-full  lg:w-[60%] relative">
              <TitleCard
                isIcon={true}
                symbol={<PiPaintBrushLight className=" text-lg text-white" />}
                title={t("postWork")}
                topMargin="mt-2"
                boxClasses={`relative`}
              >
                {/* Invoice list in table format loaded constant */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
                  <div className="">
                    <h4 className="mb-2 text-sm">{t("chooseCategory")}</h4>

                    <CategoryDropDown
                      data={data}
                      category_id={category_id}
                      setCategory_id={setCategory_id}
                    />
                  </div>

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
                    <h4 className="mb-2 text-sm">{t("country")}</h4>
                    <input
                      type="text"
                      name="country"
                      // value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      placeholder={t("country")}
                      className="input  input-bordered w-full  text-sm"
                    />
                  </div>

                  <div className="">
                    <h4 className="mb-2 text-sm">{t("city")}</h4>
                    <input
                      type="text"
                      // value={city}
                      name="city"
                      onChange={(e) => setCity(e.target.value)}
                      placeholder={t("city")}
                      className="input  input-bordered w-full  text-sm"
                    />
                  </div>

                  <div className="col-span-1 md:col-span-2 lg:col-span-2">
                    <h4 className="mb-2 text-sm">{t("description")}</h4>
                    <textarea
                      type="text"
                      name="description"
                      // value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder={t("description")}
                      rows="4"
                      className="input h-28 input-bordered w-full text-sm py-3 py-3"
                    />
                  </div>

                  {previewArray?.length != 0 ? (
                    <>
                      <div className="col-span-1 md:col-span-2 lg:col-span-2">
                        <h4 className="mb-2 text-sm">{t("uploadedFiles")}</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                          {previewArray?.map((l, i) => (
                            <div
                              key={i}
                              className="border h-40 relative p-1 rounded-md bg-orange-400"
                            >
                              <button
                                onClick={() => deleteItem(l?.unique_key)}
                                type="button"
                                className={`btn btn-sm btn-circle   bg-red-600 hover:bg-red-700 text-white border-none flex items-center justify-center absolute -top-2 ${
                                  i18n.language == "en" ? "-right-2" : "-left-2"
                                } `}
                              >
                                {" "}
                                ✕{" "}
                              </button>
                              {l?.extension === "png" ||
                              l?.extension === "jpg" ||
                              l?.extension === "gif" ||
                              l?.extension === "jpeg" ? (
                                <img
                                  src={l?.path}
                                  className="w-full h-full object-cover"
                                  alt=""
                                />
                              ) : l?.extension === "mp4" ? (
                                <video controls>
                                  <source
                                    className="w-full h-full object-cover"
                                    src={`${l?.path}`}
                                    type="video/mp4"
                                  />
                                </video>
                              ) : (
                                <></>
                              )}
                            </div>
                          ))}
                          {/* {f.extension === "png" || f.extension === "jpg" ? (
                                  <img
                                    src={`${f.path}`}
                                    className="w-full h-full object-cover"
                                    alt=""
                                  />
                                ) : (
                                  f.extension === "mp4"?(<>
                                  <video width="750" height="500" controls >
                                        <source className="w-full h-full object-cover" src={`${f.path}`} type="video/mp4"/>
                                  </video>
                                  </>):(

                                    <>
                                      <DocViewer
                                        // documents={showDetails?.files.map((f, i) => ({
                                        //   uri:  require(f.path),
                                        //   fileType:f.extension,
                                        //   fileName: f.name,
                                        // }))}
                                        documents={showDetails?.files?.map((file) => ({
                                          uri: `https://secretariat.repal.ir/${file.path}`,
                                          fileType: file.extension,
                                          fileName: file.name,
                                        }))}
                                        // activeDocument={activeDocument}
                                        // onDocumentChange={handleDocumentChange}
                                        pluginRenderers={[
                                          DocViewerRenderers,
                                          PDFRenderer,
                                          PNGRenderer,
                                        ]}
                                        style={{ width: "300px" }}
                                      />
                                    </>
                                  )
                                )} */}
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </TitleCard>
              <div
                className={`absolute -bottom-10 ${
                  i18n.language == "en" ? "left-7" : "right-7"
                } flex justify-end my-5`}
              >
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
            </div>
            <div className="w-full mt-10 md:mt-5 lg:mt-0 lg:w-[40%]">
              <TitleCard
                isIcon={true}
                symbol={<PiPaintBrushLight className=" text-lg text-white" />}
                title={t("uploadFile")}
                topMargin="mt-2"
              >
                <div className="grid grid-cols-1 space-y-2">
                  {/* <label className="text-sm font-bold text-gray-500 tracking-wide">Attach Document</label> */}
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col rounded-lg border-4 border-dashed w-full h-60 p-10 group text-center">
                      <div className="h-full w-full text-center flex flex-col items-center justify-center items-center  ">
                        <div className="flex flex-auto max-h-48 w-2/5 mx-auto -mt-10">
                          <img
                            className="has-mask h-36 object-center"
                            src="https://img.freepik.com/free-vector/image-upload-concept-landing-page_52683-27130.jpg?size=338&ext=jpg"
                            alt="freepik image"
                          />
                        </div>
                        <p className="pointer-none text-gray-500 ">
                          {t("uploadroadmap")}
                          {/* <span className="text-sm">Drag and drop</span> files
                              here <br /> or{" "}
                              <span
                                className="text-blue-600 hover:underline"
                              >
                                select a file
                              </span>{" "}
                              from your computer */}
                        </p>
                      </div>
                      <input
                        name="file"
                        id="upload"
                        type="file"
                        onChange={handleFileInput}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
                <p className="text-sm text-gray-300 pt-1">
                  <span>
                    ppt,pptx,doc,docx,pdf,xls,xlsx,jpg,jpeg,gif,png,mp4
                  </span>
                </p>
                <div className=" flex justify-center  mt-2">
                  {isShowFiles ? (
                    <>
                      <div className="w-36 h-36 relative p-1 rounded-md bg-orange-400">
                        {/* <button type="button" className={`btn btn-sm btn-circle btn-ghost absolute -top-1 ${i18n.language == "en" ? "-right-1" : "-left-1"} `} >  ✕  </button> */}
                        {selectedFile?.type === "image/png" ||
                        selectedFile?.type === "image/jpg" ||
                        selectedFile?.type === "image/gif" ||
                        selectedFile?.type === "image/jpeg" ? (
                          <img
                            src={url}
                            className="w-full h-full object-cover"
                            alt=""
                          />
                        ) : selectedFile?.type === "video/mp4" ? (
                          <video width="750" height="500" controls>
                            <source
                              className="w-full h-full object-cover"
                              src={url}
                              type="video/mp4"
                            />
                          </video>
                        ) : (
                          <></>
                        )}
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                  {/* <DocViewer
                        documents={[
                          {
                            uri: `https://secretariat.repal.ir/${url}`,
                            // fileType:`${f.extension}`,
                            // fileName:`${f.name}`
                          },
                        ]}
                        // activeDocument={activeDocument}
                        // onDocumentChange={handleDocumentChange}
                        pluginRenderers={[
                          DocViewerRenderers
                        ]}
                        style={{ width: "300px" }}
                      /> */}
                </div>
                <div>
                  <button
                    onClick={handleSubmit}
                    type="submit"
                    className=" mt-5 w-full flex justify-center bg-green-600 text-gray-100 p-3  rounded-lg tracking-wide
                                          font-semibold  focus:outline-none focus:shadow-outline hover:bg-green-700 shadow-lg cursor-pointer transition ease-in duration-300"
                  >
                    {isUploadSubmited ? (
                      <span className="loading loading-dots loading-md"></span>
                    ) : (
                      <>{t("upload")}</>
                    )}
                  </button>
                </div>
              </TitleCard>
            </div>
          </div>
          {/* <div className=" flex justify-end my-5">
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
          </div> */}
        </form>
      )}
    </>
  );
}

export default PostNewWork;
