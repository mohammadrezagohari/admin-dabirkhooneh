import { useEffect } from "react";
import { useDispatch } from "react-redux";
// import Charts from "../../../features/charts";
import { setPageTitle } from "../../../features/common/headerSlice";
import Charts from './../../../features/charts/index';

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Analytics" }));
  }, []);

  return <Charts />;
}

export default InternalPage;
