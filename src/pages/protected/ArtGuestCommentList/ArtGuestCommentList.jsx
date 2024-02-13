import { useEffect } from "react";
import { useDispatch } from "react-redux";
// import { setPageTitle } from '../../features/common/headerSlice'
// import Transactions from '../../features/transactions'
// import ArtList from '../../features/general/art-list'
import { setPageTitle } from "../../../features/common/headerSlice";
// import ArtGuestCommentList from "../../../features/general/art-guest-comment-list";
import ArtGuestCommentList from './../../../features/general/art-guest-comment-list/index';

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "" }));
  }, []);

  return (
    <>
      <ArtGuestCommentList />
    </>
  );
}

export default InternalPage;
