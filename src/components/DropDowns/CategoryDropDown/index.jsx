import React from "react";
import { useTranslation } from "react-i18next";

export const CategoryDropDown = ({ category_id, setCategory_id, data }) => {
  const { t } = useTranslation();
    // const {data,isLoading,isError} = useQuery(["list_categories"],()=> )


  return (
    <>
      <select
        className="select select-bordered w-full "
        value={category_id}
        onChange={(e) => setCategory_id(e.target.value)}
      >
        <option value="default"> {t("chooseCategory")} </option>
        {data?.data?.data?.map((cat, i) => (
          <option key={i} value={cat.unique_key}>
            {cat.name}
          </option>
        ))}
      </select>
    </>
  );
};
