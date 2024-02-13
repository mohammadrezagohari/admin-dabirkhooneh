import { useEffect } from "react";
import { useDispatch } from "react-redux";
// import { setPageTitle } from '../../features/common/headerSlice'
// import Transactions from '../../features/transactions'
// import ArtList from '../../features/general/art-list'
import { setPageTitle } from "../../../features/common/headerSlice";
// import GeneralGategoryList from "../../../features/general/general-gategory-list";
import GeneralGategoryList from './../../../features/general/general-gategory-list/index';

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "" }));
  }, []);

  return (
    <>
      <GeneralGategoryList />
    </>
  );
}

export default InternalPage;
