import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../../features/common/headerSlice";
// import Calendar from '../../features/calendar'
// import Work from "../../../features/work";
import Work from './../../../features/work/index';

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "" }));
  }, []);

  return <Work />;
}

export default InternalPage;
