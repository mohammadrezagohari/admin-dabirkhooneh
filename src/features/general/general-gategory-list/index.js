import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import TitleCard from "../../../components/Cards/TitleCard"
// import { showNotification } from '../../common/headerSlice'
import TitleCard from "../../../components/Cards/TitleCard";
import { getGeneralGategoryList } from "./../../../core/api/servises/general";
import { ThreeDots } from "react-loader-spinner";
import { useQuery } from "react-query";

function GeneralGategoryList() {
  const { isLoading, data } = useQuery(
    "general-gategory-list",
    getGeneralGategoryList
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
  // const [fields, setFields] = useState([]);
  // const getDatas = async () => {
  //     const result = await getGeneralGategoryList()
  //       .then(function (response) {
  //         console.log("response", response);
  //         setFields(response?.data?.data);
  //         console.log("fields :::",fields);
  //       })
  //       .catch(function (err) {
  //         console.log("error", err);
  //       });
  //     // setLoading(false);
  //     return result;
  //   };

  //   useEffect(() => {
  //     getDatas();
  //     // setTimeout(() => {
  //     //   getDatas();
  //     // }, 3000);
  //   }, []);

  return (
    <>
      <TitleCard title="Billing History" topMargin="mt-2">
        {/* Invoice list in table format loaded constant */}
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th> Name </th>
                <th> Deleted At </th>
                <th> Description</th>
                {/* <th>Amount</th>
                        <th>Status</th>
                        <th>Invoice Paid On</th> */}
              </tr>
            </thead>
            <tbody>
              {data?.data?.data.map((l, k) => {
                return (
                  <tr key={k}>
                    <td>{l?.name}</td>
                    <td>{l?.deleted_at ? l.deleted_at : ""}</td>
                    <td>{l?.description ? l.description : ""}</td>
                    {/* <td>${l?.amount}</td>
                                            <td>{getPaymentStatus(l.status)}</td>
                                            <td>{l?.paidOn}</td> */}
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

export default GeneralGategoryList;
