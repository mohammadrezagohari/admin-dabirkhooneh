import React from "react";
import { useTranslation } from "react-i18next";

export const StatusDropDown = ({ stat, setStat }) => {
  // const { isLoading, data } = useQuery("categories-dropdown",getAdminCategoryList );
  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }
  const { t } = useTranslation();
  // console.log("lang",stat);
  return (
    <>
      <select 
        className="select select-bordered w-full "
        value={stat}
        onChange={(e) => {
            setStat(parseInt(e.target.value));
        }}
      >
        {/* {
            data?.data?.data.map((cat,i)=>(
                <option key={i} >{cat.name}</option>
            ))
        } */}
        <option value="default"> {t("status")} </option>
        <option value="0">{t("deactive")}</option>
        <option value="1">{t("accesseptStatus")}</option>
        <option value="2">{t("pending")}</option>
        <option value="4">{t("reject")}</option>
      </select>
    </>
  );
};
