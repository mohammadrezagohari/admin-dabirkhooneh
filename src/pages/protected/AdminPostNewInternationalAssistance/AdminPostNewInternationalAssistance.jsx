import { useEffect } from "react";
import { useDispatch } from "react-redux";
// import { setPageTitle } from '../../features/common/headerSlice'
// import Transactions from '../../features/transactions'
// import ArtList from '../../features/general/art-list'
import { setPageTitle } from "../../../features/common/headerSlice";
// import AdminPostNewInternationalAssistance from "../../../features/users/admin/admin-post-new-international-assistance";
import AdminPostNewInternationalAssistance from './../../../features/users/admin/admin-post-new-international-assistance/index';
import { useTransition } from "react";
function InternalPage() {
  const dispatch = useDispatch();
const {t} = useTransition();
  useEffect(() => {
    dispatch(setPageTitle({ title:''}));
  }, []);

  return (
    <>
      <AdminPostNewInternationalAssistance />
    </>
  );
}

export default InternalPage;
