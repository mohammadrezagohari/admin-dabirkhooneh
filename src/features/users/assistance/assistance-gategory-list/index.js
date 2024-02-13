import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TitleCard from "../../../../components/Cards/TitleCard";
import { getAssistanceCategoryList } from "../../../../core/api/servises/users";
import { ThreeDots } from "react-loader-spinner";
import { useQuery } from "react-query";
import { AuthContext } from "../../../../gard/context/AuthContext";

function AssistanceGategoryList() {
  const { userToken } = useContext(AuthContext);
  const { isLoading, data } = useQuery(
    ["assistance-gategory-list", userToken],
    () => getAssistanceCategoryList(userToken)
  );
  if (isLoading) {
    return   <div className="flex items-center justify-center py-60">
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
        </div>;
  }

  return (
    <>
      <TitleCard title="Billing History" topMargin="mt-2">
        {/* Invoice list in table format loaded constant */}

        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th> Name </th>
                <th> Description</th>
              </tr>
            </thead>
            <tbody>
              {data?.data?.data.map((l, k) => {
                return (
                  <tr key={k}>
                    <td>{l?.name}</td>
                    <td>{l?.description ? l.description : ""}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </TitleCard>
    </>
  );
}

export default AssistanceGategoryList;
