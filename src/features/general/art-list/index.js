import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQuery, useMutation } from "react-query";
// import TitleCard from "../../../components/Cards/TitleCard"
// import { showNotification } from '../../common/headerSlice'
import TitleCard from "./../../../components/Cards/TitleCard";
import {
  getGeneralArtList,
  getListGuestCommentsWork,
} from "./../../../core/api/servises/general";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ThreeDots } from "react-loader-spinner";

function ArtList() {
  // const mutation = useMutation((newPost) => getListGuestCommentsWork, newPost));
  // const deleteData = () => {
  //   mutation.mutate();
  // };
  const { t } = useTranslation();
  const { isLoading, data } = useQuery("art-list", getGeneralArtList);
  if (isLoading) {
    return (
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
    );
  }

  // console.log("data-----> ::::", data);

  return (
    <>
      <TitleCard title="Billing History" topMargin="mt-2">
        {/* Invoice list in table format loaded constant */}
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Name </th>
                <th>Email </th>
                <th>Mobile </th>
                <th>Title</th>
                <th>Description</th>
                <th>Description Rejection</th>
                <th>Country </th>
                <th>City </th>
                <th>Category </th>
                <th>Tracking Code</th>
              </tr>
            </thead>
            <tbody>
              {data?.data?.data?.length <= 0 ? (
                <div className="ml-20   w-max py-6 text-center flex justify-center text-md font-yekanReg  text-red-400">
                  {t("emptyMsg")}
                </div>
              ) : (
                data?.data?.data.map((l, k) => {
                  return (
                    <tr key={k}>
                      <td>{l?.user?.name}</td>
                      <td>{l?.user?.email ? l?.user?.email : ""}</td>
                      <td>{l?.user?.mobile ? l?.user?.mobile : ""}</td>
                      <td>{l?.title}</td>
                      <td>{l?.description ? l?.description : ""}</td>
                      <td>
                        {l?.description_rejection
                          ? l?.description_rejection
                          : ""}
                      </td>
                      <td>{l?.country}</td>
                      <td>{l?.city}</td>
                      <td>{l?.category?.name}</td>
                      <td>{l?.tracking_code}</td>
                      <td className="flex items-center gap-3">
                        <Link
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
                        </Link>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </TitleCard>
    </>
  );
}

export default ArtList;
