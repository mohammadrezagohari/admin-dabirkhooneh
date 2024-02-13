import { useEffect } from "react";
import { useDispatch } from "react-redux";
// import { setPageTitle } from '../../features/common/headerSlice'
// import Transactions from '../../features/transactions'
// import ArtList from '../../features/general/art-list'
// import { setPageTitle } from "../../../features/common/headerSlice";
// import AdminAssistanceList from "../../../features/users/admin/admin-assistance-list";
// import AdminAssistanceList from '../../../features/users/admin/admin-assistance-list/index';
import { setPageTitle } from "../../../features/common/headerSlice";
import AdminAssistanceList from './../../../features/users/admin/admin-assistance-list/index';

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "" }));
  }, []);

  return (
    <>
      <AdminAssistanceList />
    </>
  );
}

export default InternalPage;
