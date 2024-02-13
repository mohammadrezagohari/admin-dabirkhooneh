import { useEffect } from "react";
import { useDispatch } from "react-redux";
// import { setPageTitle } from '../../features/common/headerSlice'
// import Transactions from '../../features/transactions'
// import ArtList from '../../features/general/art-list'
import { setPageTitle } from "../../../features/common/headerSlice";

import PostNewInternalReferee from "../../../features/users/assistance/post-new-internal-referee";
// import PostNewReferee from "../../../features/users/assistance/post-new-referee-in-new-category";
// import PostNewReferee from "../../../features/users/assistance/post-new-referee";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "  ثبت نام داور جدید (ایرانی)   " }));
  }, []);

  return (
    <>
      <PostNewInternalReferee />
    </>
  );
}

export default InternalPage;
