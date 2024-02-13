import { useContext, useEffect, useState } from "react";
// import TitleCard from "../../../../components/Cards/TitleCard";
import { useParams } from "react-router-dom";
import { MdOutlineCategory } from "react-icons/md";
import { FaRegCommentAlt, FaRegStar, FaRegFile, FaCity } from "react-icons/fa";
import { PiPaintBrushLight } from "react-icons/pi";
import { PiNoteLight } from "react-icons/pi";
import toast from "react-hot-toast";
import { postGuestCommentInternationalWork } from "../../../../core/api/servises/users";
import TitleCard from "../../../../components/Cards/TitleCard";
import { useTranslation } from "react-i18next";
import { AuthContext } from "../../../../gard/context/AuthContext";
import { getWorkDetails } from "../../../../core/api/servises/general";
import { MdInfoOutline } from "react-icons/md";

function PostGuestCommentInternationalWork() {
  const { t } = useTranslation();
  const { tracking_code, unique_key } = useParams();

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [score, setScore] = useState(10);
  const [isSendOtp, setIsSendOtp] = useState(false);
  const [isSubmited, setIsSubmited] = useState(false);
  const [phoneNum, setPhoneNum] = useState("");
  const [code, setCode] = useState("");

  const [showDetails, setShowDetails] = useState();
  const showItemInfo = async (tracking_code) => {
    const showResult = await getWorkDetails(tracking_code)
      .then(function (response) {
        setShowDetails(response?.data);
      })
      .catch(function (err) {
        // console.log("error", err);
      });
    return showResult;
  };

  useEffect(() => {
    showItemInfo(tracking_code);
  }, []);
  const storeItem = async (e) => {
    e.preventDefault();
    setIsSubmited(true);
    const formData = new FormData();
    // formData.append("title", title);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("description", description);
    formData.append("score", score);
    // formData.append("lang", lang);
    // for (let i = 0; i < image.length; i++) {
    //   formData.append("image[]", image[i]);
    // }
    // for (let i = 0; i < video.length; i++) {
    //   formData.append("video[]", video[i]);
    // }

    const createResult = await postGuestCommentInternationalWork(
      unique_key,
      formData
    )
      .then(function (response) {
        // console.log("response result : ", response);
        if (response.status) {
          toast.success(`${response.status.message}`);
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

  return (
    <>
      <div className=" p-5 pt-0 lg:p-12 lg:pt-5">
        <div className="flex items-start justify-center lg:flex-nowrap flex-wrap gap-4">
          <div className="w-full  lg:w-[35%]">
            <TitleCard
              isIcon={true}
              symbol={<MdInfoOutline className=" text-lg text-white" />}
              title="  اطلاعات اثر    "
              topMargin="mt-2"
            >
              {/* {unique_key} */}
              {/* {console.log("code", tracking_code)} */}
              {/* {tracking_code} */}

              <form
                method="post"
                onSubmit={storeItem}
                className="grid grid-cols-1  gap-5 "
              >
                <div className="">
                  <h4 className="mb-2 text-sm">{t("name")}</h4>
                  <input
                    type="text"
                    name="name"
                    // value={score}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t("name")}
                    className="input  input-bordered w-full text-sm "
                  />
                </div>

                <div className="">
                  <h4 className="mb-2 text-sm">{t("userEmail")}</h4>
                  <input
                    type="text"
                    name={t("userEmail")}
                    // value={description}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t("userEmail")}
                    className="input  input-bordered w-full"
                  />
                </div>

                <div className="col-span-1 ">
                  <h4 className="mb-2 text-sm">{t("description")}</h4>
                  <textarea
                    type="text"
                    name="description"
                    // value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder={t("description")}
                    rows="4"
                    className="input h-28 input-bordered w-full text-sm py-3"
                  />
                </div>

                <div className="">
                  <h4 className="mb-2 text-sm">{t("score")}</h4>
                  {score}
                  <input
                    onChange={(e) => {
                      setScore(e.target.value);
                      // console.log("score", score);
                    }}
                    type="range"
                    min={0}
                    max={10}
                    value={score}
                    className="rtl range range-primary"
                  />
                </div>

                <div className="col-span-1 ">
                  <button
                    type="submit"
                    className="btn btn-primary flex justify-center items-center"
                  >
                    {isSubmited ? (
                      <span className="loading loading-dots font-medium loading-md"></span>
                    ) : (
                      <>{t("send")}</>
                    )}
                  </button>
                </div>
              </form>
            </TitleCard>
          </div>
          <div className="w-full  lg:w-[65%]">
            <TitleCard
              isIcon={true}
              symbol={<MdInfoOutline className=" text-lg text-white" />}
              title="  اطلاعات اثر    "
              topMargin="mt-2"
            >
              {/* {unique_key} */}
              {/* {console.log("code", tracking_code)} */}
              {/* {tracking_code} */}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                <div className="  border rounded-lg p-4 pb-6  shadow-gray-300">
                  <div className="flex items-center justify-start gap-2 mb-5">
                    <div className="bg-orange-500 w-8 h-8 lg:w-10 lg:h-10  rounded-md flex items-center justify-center">
                      <PiPaintBrushLight className="text-white text-lg" />
                    </div>
                    <h3 className=" font-medium text-xl"> نام اثر </h3>
                  </div>
                  <span className="">{showDetails?.title}</span>
                </div>

                <div className="  border rounded-lg p-4 pb-6  shadow-gray-300">
                  <div className="flex items-center justify-start gap-2 mb-5">
                    <div className="bg-orange-500 w-8 h-8 lg:w-10 lg:h-10  rounded-md flex items-center justify-center">
                      <PiNoteLight className="text-white text-lg" />
                    </div>

                    <h3 className=" font-medium text-xl"> توضیحات اثر </h3>
                  </div>
                  <span className="">{showDetails?.description}</span>
                </div>

                <div className="  border rounded-lg p-4 pb-6  shadow-gray-300">
                  <div className="flex items-center justify-start gap-2 mb-5">
                    <div className="bg-orange-500 w-8 h-8 lg:w-10 lg:h-10  rounded-md flex items-center justify-center">
                      <MdOutlineCategory className="text-white text-lg" />
                    </div>

                    <h3 className=" font-medium text-xl"> نوع دسته بندی </h3>
                  </div>
                  <span className="">{showDetails?.category?.name}</span>
                </div>

                <div className="  border rounded-lg p-4 pb-6  shadow-gray-300">
                  <div className="flex items-center justify-start gap-2 mb-5">
                    <div className="bg-orange-500 w-8 h-8 lg:w-10 lg:h-10  rounded-md flex items-center justify-center">
                      <FaCity className="text-white text-lg" />
                    </div>

                    <h3 className=" font-medium text-xl"> شهر </h3>
                  </div>
                  <span className="">{showDetails?.city}</span>
                </div>

                <div className="  border rounded-lg p-4 pb-6  shadow-gray-300">
                  <div className="flex items-center justify-start gap-2 mb-5">
                    <div className="bg-orange-500 w-8 h-8 lg:w-10 lg:h-10  rounded-md flex items-center justify-center">
                      <FaRegStar className="text-white text-lg" />
                    </div>

                    <h3 className=" font-medium text-xl"> امتیاز </h3>
                  </div>
                  <progress
                    className="progress progress-primary w-full"
                    value={showDetails?.score ? showDetails?.score : 0}
                    max="100"
                  ></progress>
                  {/* <span className="">{showDetails?.score}</span> */}
                </div>

                <div className="  border rounded-lg p-4 pb-6  shadow-gray-300">
                  <div className="flex items-center justify-start gap-2 mb-5">
                    <div className="bg-orange-500 w-8 h-8 lg:w-10 lg:h-10  rounded-md flex items-center justify-center">
                      <FaRegCommentAlt className="text-white text-lg" />
                    </div>

                    <h3 className=" font-medium text-xl"> تعداد کامنت ها </h3>
                  </div>
                  <span className="">{showDetails?.comment}</span>
                </div>

                <div className=" col-span-1 md:col-span-2 lg:col-span-3 border rounded-lg p-4 pb-6  shadow-gray-300">
                  <div className="w-full flex items-center justify-start gap-2 mb-5">
                    <div className="bg-orange-500 w-8 h-8 lg:w-10 lg:h-10  rounded-md flex items-center justify-center">
                      <FaRegFile className="text-white text-lg" />
                    </div>

                    <h3 className=" font-medium text-xl"> فایل اپلود شده </h3>
                  </div>
                  <div className=" flex items-center justify-start gap-6">
                    {showDetails?.files?.map((f, i) => (
                      <div
                        key={i}
                        className="w-56 h-52  p-1 rounded-md bg-orange-400"
                      >
                        {/* {console.log("f---->", f)} */}
                        {/* <img
                      src={`https://secretariat.repal.ir/${f.path}`}
                      className="w-full h-full object-cover"
                      alt=""
                    /> */}

                        {f?.extension === "png" ||
                        f?.extension === "jpg" ||
                        f?.extension === "gif" ||
                        f?.extension === "jpeg" ? (
                          <img
                            src={f.path}
                            className="w-full h-full object-cover"
                            alt=""
                          />
                        ) : f.extension === "mp4" ? (
                          <>
                            <video width="750" height="500" controls>
                              <source
                                className="w-full h-full object-cover"
                                src={f.path}
                                type="video/mp4"
                              />
                            </video>
                          </>
                        ) : (
                          <>
                            {/* <DocViewer
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
                        /> */}
                          </>
                        )}
                      </div>
                    ))}
                    {/* {showDetails?.files?.map((f, i) => (
                      <div key={i} className="w-56 h-52">

                        <img
                          src={`${f.path}`}
                          className="w-full h-full object-cover"
                          alt=""
                        />

                        
                      </div>
                    ))} */}
                    {/* uri: window.URL.createObjectURL(f.path), */}

                    {/* <DocViewer
                      // documents={showDetails?.files.map((f, i) => ({
                      //   uri:  require(f.path),
                      //   fileType:f.extension,
                      //   fileName: f.name,
                      // }))}
                      documents={showDetails?.files.map((file) => ({
                        uri: `http://localhost:3000/${file.path}`,
                        fileName: file.name,
                        fileType: file.extension,
                      }))}
                      // activeDocument={activeDocument}
                      // onDocumentChange={handleDocumentChange}
                      pluginRenderers={[DocViewerRenderers, PDFRenderer, PNGRenderer]}
                      style={{ width: "300px" }}
                    /> */}

                    {/* <DocViewer
                        documents={showDetails?.files}
                        // activeDocument={activeDocument}
                        // onDocumentChange={handleDocumentChange}
                        pluginRenderers={DocViewerRenderers}
                        style={{width:'300px'}}
                      /> */}
                  </div>
                </div>
              </div>
            </TitleCard>
          </div>
        </div>
      </div>
    </>
  );
}

export default PostGuestCommentInternationalWork;
