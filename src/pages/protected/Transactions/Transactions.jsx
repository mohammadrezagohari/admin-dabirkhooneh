import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../../features/common/headerSlice";
// import Transactions from "../../../features/transactions";
import Transactions from './../../../features/transactions/index';

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Transactions" }));
  }, []);

  return <Transactions />;
}

export default InternalPage;
