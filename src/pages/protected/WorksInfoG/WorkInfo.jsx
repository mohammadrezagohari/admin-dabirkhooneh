import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { setPageTitle } from "../../../features/common/headerSlice";

import WorksInfo from "../../../features/work/works-info";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "" }));
  }, []);

  return (
    <>
      <WorksInfo />
    </>
  );
}

export default InternalPage;
