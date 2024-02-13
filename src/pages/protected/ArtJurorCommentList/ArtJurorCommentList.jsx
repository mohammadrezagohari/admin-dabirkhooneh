import { useEffect } from "react";
import { useDispatch } from "react-redux";
// import { setPageTitle } from '../../features/common/headerSlice'
// import Transactions from '../../features/transactions'
// import ArtList from '../../features/general/art-list'
import { setPageTitle } from "../../../features/common/headerSlice";
// import ArtJurorCommentList from "../../../features/general/art-juror-comment-list";
import ArtJurorCommentList from './../../../features/general/art-juror-comment-list/index';

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "" }));
  }, []);

  return (
    <>
      <ArtJurorCommentList />
    </>
  );
}

export default InternalPage;
