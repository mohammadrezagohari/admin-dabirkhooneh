import { useEffect } from "react";
import { useDispatch } from "react-redux";
// import { setPageTitle } from '../../features/common/headerSlice'
// import Transactions from '../../features/transactions'
// import ArtList from '../../features/general/art-list'
import { setPageTitle } from "../../../features/common/headerSlice";
import AdminParticipantsList from "../../../features/users/admin/admin-participants-list";
// import AdminParticipantsList from "../../../features/users/admin/admin-participants-list";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "" }));
  }, []);

  return (
    <>
      <AdminParticipantsList />
    </>
  );
}

export default InternalPage;
