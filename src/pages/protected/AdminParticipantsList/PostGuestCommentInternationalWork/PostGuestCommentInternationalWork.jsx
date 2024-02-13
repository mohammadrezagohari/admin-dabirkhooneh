import { useEffect } from "react";
import { useDispatch } from "react-redux";
// import { setPageTitle } from '../../features/common/headerSlice'
// import Transactions from '../../features/transactions'
// import ArtList from '../../features/general/art-list'
import { setPageTitle } from "../../../features/common/headerSlice";
import PostGuestCommentInternationalWork from "../../../features/users/normal-user/post-guest-comment-international-work";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "" }));
  }, []);

  return (
    <>
      <PostGuestCommentInternationalWork />
    </>
  );
}

export default InternalPage;
