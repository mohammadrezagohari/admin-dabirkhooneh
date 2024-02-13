import { useEffect } from "react";
import { useDispatch } from "react-redux";
// import { setPageTitle } from '../../features/common/headerSlice'
// import Transactions from '../../features/transactions'
// import ArtList from '../../features/general/art-list'
import { setPageTitle } from "../../../features/common/headerSlice";
// import AdminPostNewInternalAssistance from "../../../features/users/admin/admin-post-new-internal-assistance";
import AdminPostNewInternalAssistance from './../../../features/users/admin/admin-post-new-internal-assistance/index';

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title:"" }));
  }, []);

  return (
    <>
      <AdminPostNewInternalAssistance />
    </>
  );
}

export default InternalPage;
