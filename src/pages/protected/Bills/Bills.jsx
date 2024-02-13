import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../../features/common/headerSlice";
// import Billing from "../../../features/settings/billing";
import Billing from './../../../features/settings/billing/index';

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Bills" }));
  }, []);

  return <Billing />;
}

export default InternalPage;
