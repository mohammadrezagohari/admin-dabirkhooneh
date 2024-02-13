import { useEffect } from "react";
import { useDispatch } from "react-redux";
// import { setPageTitle } from '../../features/common/headerSlice'
// import Transactions from '../../features/transactions'
// import ArtList from '../../features/general/art-list'
import { setPageTitle } from "../../../features/common/headerSlice";
// import MyRefereeList from "../../../features/users/assistance/my-referee-list";
import MyRefereeList from './../../../features/users/assistance/my-referee-list/index';

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "" }));
  }, []);

  return (
    <>
      <MyRefereeList />
    </>
  );
}

export default InternalPage;
