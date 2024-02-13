import { useEffect } from "react";
import { useDispatch } from "react-redux";
// import { setPageTitle } from '../../features/common/headerSlice'
// import Transactions from '../../features/transactions'
// import ArtList from '../../features/general/art-list'
import { setPageTitle } from "../../features/common/headerSlice";
import PostGuestCommentIRWork from "../../features/users/normal-user/post-guest-comment-ir-work";
// http://localhost:3000/post-guest-comment-ir-work/loQ1buOh/784625319
function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "" }));
  }, []);

  return (
    <>
      <PostGuestCommentIRWork />
    </>
  );
}

export default InternalPage;
