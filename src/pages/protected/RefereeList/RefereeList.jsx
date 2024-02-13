import { useEffect } from "react";
import { useDispatch } from "react-redux";
// import { setPageTitle } from '../../features/common/headerSlice'
// import Transactions from '../../features/transactions'
// import ArtList from '../../features/general/art-list'
import { setPageTitle } from "../../../features/common/headerSlice";

// import GategoryList from "../../features/gategory/gategory-list";
// import RefereeList from "../../../features/users/referee/referee-list";
import RefereeList from './../../../features/users/referee/referee-list/index';

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "" }));
  }, []);

  return (
    <>
      <RefereeList />
    </>
  );
}

export default InternalPage;
