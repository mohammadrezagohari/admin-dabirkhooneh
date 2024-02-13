import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../../features/common/headerSlice";

import RefereeCommentList from "../../../features/users/referee/referee-comment-list";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "" }));
  }, []);

  return (
    <>
      <RefereeCommentList />
    </>
  );
}

export default InternalPage;