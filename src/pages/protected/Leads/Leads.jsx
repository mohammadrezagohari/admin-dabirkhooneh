import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../../features/common/headerSlice";
// import Leads from "../../../features/leads";
import Leads from './../../../features/leads/index';

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Leads" }));
  }, []);

  return <Leads />;
}

export default InternalPage;
