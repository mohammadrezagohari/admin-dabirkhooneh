import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdInfoOutline } from "react-icons/md";
import { useParams } from "react-router-dom";
import { MdOutlineCategory } from "react-icons/md";
import { FaRegCommentAlt, FaRegStar, FaRegFile, FaCity } from "react-icons/fa";
import { PiPaintBrushLight } from "react-icons/pi";
import { PiNoteLight } from "react-icons/pi";
import { FaRegUser } from "react-icons/fa";

import DocViewer, {
  DocViewerRenderers,
  PDFRenderer,
  PNGRenderer,
} from "@cyntler/react-doc-viewer";
import { useTranslation } from "react-i18next";
import TitleCard from "../../../components/Cards/TitleCard";
import { getWorkDetails } from "../../../core/api/servises/general";

function WorksInfo() {
  const { t } = useTranslation();

  const { tracking_code } = useParams();
  // const { userToken } = useContext(AuthContext);
  const [showDetails, setShowDetails] = useState();

  const showItemInfo = async (tracking_code) => {
    const showResult = await getWorkDetails(tracking_code)
      .then(function (response) {
        setShowDetails(response?.data);
      })
      .catch(function (err) {
        console.log("error", err);
      });
    return showResult;
  };

  useEffect(() => {
    showItemInfo(tracking_code);
  }, []);

  console.log(showDetails);

  return (
    <>
      <div className="flex flex-col gap-4">
        {showDetails?.description_rejection != null ? (
          <>
            <TitleCard
              isIcon={true}
              divider={false}
              symbol={<MdInfoOutline className=" text-lg text-white" />}
              classes="!bg-red-600"
              boxClasses="!bg-red-100"
              title={t("rejected")}
              topMargin="mt-2 bg-red-100"
            >
              <h2>{showDetails?.description_rejection}</h2>
            </TitleCard>
          </>
        ) : (
          <></>
        )}

        <TitleCard
          isIcon={true}
          symbol={<MdInfoOutline className=" text-lg text-white" />}
          title="   اطلاعات اثر     "
          topMargin="mt-2"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="  border rounded-lg p-4 pb-6  shadow-gray-300">
              <div className="flex items-center justify-start gap-2 mb-5">
                <div className="bg-orange-500 w-8 h-8 lg:w-10 lg:h-10  rounded-md flex items-center justify-center">
                  <PiPaintBrushLight className="text-white text-lg" />
                </div>
                <h3 className=" font-medium text-xl">{t("workName")}</h3>
              </div>
              <span className="">{showDetails?.title}</span>
            </div>

            <div className="  border rounded-lg p-4 pb-6  shadow-gray-300">
              <div className="flex items-center justify-start gap-2 mb-5">
                <div className="bg-orange-500 w-8 h-8 lg:w-10 lg:h-10  rounded-md flex items-center justify-center">
                  <FaRegUser className="text-white text-lg" />
                </div>

                <h3 className=" font-medium text-xl">{t("nameOfTheAuthor")}</h3>
              </div>
              <span className="">{showDetails?.user?.name}</span>
            </div>

            <div className="  border rounded-lg p-4 pb-6  shadow-gray-300">
              <div className="flex items-center justify-start gap-2 mb-5">
                <div className="bg-orange-500 w-8 h-8 lg:w-10 lg:h-10  rounded-md flex items-center justify-center">
                  <MdOutlineCategory className="text-white text-lg" />
                </div>

                <h3 className=" font-medium text-xl">
                  {showDetails?.user?.lang == "fa" ? (
                    <>{t("mobile")}</>
                  ) : (
                    <>{t("email")}</>
                  )}
                </h3>
              </div>
              <span className="">
                {showDetails?.user?.lang == "fa" ? (
                  <>{showDetails?.user?.mobile}</>
                ) : (
                  <>{showDetails?.user?.email}</>
                )}
              </span>
            </div>

            <div className="  border rounded-lg p-4 pb-6  shadow-gray-300">
              <div className="flex items-center justify-start gap-2 mb-5">
                <div className="bg-orange-500 w-8 h-8 lg:w-10 lg:h-10  rounded-md flex items-center justify-center">
                  <MdOutlineCategory className="text-white text-lg" />
                </div>

                <h3 className=" font-medium text-xl">{t("category")}</h3>
              </div>
              <span className="">{showDetails?.category?.name}</span>
            </div>

            <div className="  border rounded-lg p-4 pb-6  shadow-gray-300">
              <div className="flex items-center justify-start gap-2 mb-5">
                <div className="bg-orange-500 w-8 h-8 lg:w-10 lg:h-10  rounded-md flex items-center justify-center">
                  <FaCity className="text-white text-lg" />
                </div>

                <h3 className=" font-medium text-xl">{t("city")}</h3>
              </div>
              <span className="">{showDetails?.city}</span>
            </div>

            <div className="  border rounded-lg p-4 pb-6  shadow-gray-300">
              <div className="flex items-center justify-start gap-2 mb-5">
                <div className="bg-orange-500 w-8 h-8 lg:w-10 lg:h-10  rounded-md flex items-center justify-center">
                  <FaRegStar className="text-white text-lg" />
                </div>

                <h3 className=" font-medium text-xl"> {t("score")} </h3>
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

                <h3 className=" font-medium text-xl">
                  {t("numberOfComments")}
                </h3>
              </div>
              <span className="">{showDetails?.comment}</span>
            </div>

            <div className=" col-span-1 md:col-span-2 lg:col-span-3 border rounded-lg p-4 pb-6  shadow-gray-300">
              <div className="flex items-center justify-start gap-2 mb-5">
                <div className="bg-orange-500 w-8 h-8 lg:w-10 lg:h-10  rounded-md flex items-center justify-center">
                  <PiNoteLight className="text-white text-lg" />
                </div>

                <h3 className=" font-medium text-xl">{t("description")}</h3>
              </div>
              <span className="">{showDetails?.description}</span>
            </div>

            <div className=" col-span-1 md:col-span-2 lg:col-span-3 border rounded-lg p-4 pb-6  shadow-gray-300">
              <div className="w-full flex items-center justify-start gap-2 mb-5">
                <div className="bg-orange-500 w-8 h-8 lg:w-10 lg:h-10  rounded-md flex items-center justify-center">
                  <FaRegFile className="text-white text-lg" />
                </div>

                <h3 className=" font-medium text-xl">{t("uploadedFiles")}</h3>
              </div>
              <div className=" flex items-center justify-start gap-6">
                {showDetails?.files?.map((f, i) => (
                  <div key={i} className="w-56 h-52">
                    {console.log("f---->", f)}
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
                        src={`${f.path}`}
                        className="w-full h-full object-cover"
                        alt=""
                      />
                    ) : f.extension === "mp4" ? (
                      <>
                        <video width="750" height="500" controls>
                          <source
                            className="w-full h-full object-cover"
                            src={`${f.path}`}
                            type="video/mp4"
                          />
                        </video>
                      </>
                    ) : (
                      <>
                        <DocViewer
                          // documents={showDetails?.files.map((f, i) => ({
                          //   uri:  require(f.path),
                          //   fileType:f.extension,
                          //   fileName: f.name,
                          // }))}
                          documents={showDetails?.files?.map((file) => ({
                            uri: `${file.path}`,
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
                    )}
                  </div>
                ))}
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
          {/* Invoice list in table format loaded constant */}
          {/* <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th>ID</th>
                <th>Description</th>
               
              </tr>
            </thead>
            <tbody>
              {showDetails?.data.map((l, k) => {
                return (
                  <tr key={k}>
                    <td>{l?.id}</td>
                    <td>{l?.description}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div> */}
        </TitleCard>
      </div>
    </>
  );
}

export default WorksInfo;
