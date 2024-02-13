import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { setPageTitle } from "../../../features/common/headerSlice";

import WorkInfo from "../../../features/users/referee/work-info";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "" }));
  }, []);

  return (
    <>
      <WorkInfo />
    </>
  );
}

export default InternalPage;
