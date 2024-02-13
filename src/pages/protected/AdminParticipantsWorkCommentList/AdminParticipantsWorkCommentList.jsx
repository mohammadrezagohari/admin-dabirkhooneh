import { useEffect } from "react";
import { useDispatch } from "react-redux";
// import { setPageTitle } from '../../features/common/headerSlice'
// import Transactions from '../../features/transactions'
// import ArtList from '../../features/general/art-list'
import { setPageTitle } from "../../../features/common/headerSlice";
import AdminParticipantsWorkCommentList from "../../../features/users/admin/admin-participants-work-comment-list";
// import AdminParticipantsWorkCommentList from "../../../features/users/admin/admin-participants-work-comment-list";
// import AdminParticipantsWorkCommentList from "./../../../features/users/admin/admin-participants-work-comment-list";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "" }));
  }, []);

  return (
    <>
      <AdminParticipantsWorkCommentList />
    </>
  );
}

export default InternalPage;
