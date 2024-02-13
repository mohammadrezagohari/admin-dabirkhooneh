import { useEffect } from "react";
import { useDispatch } from "react-redux";
// import { setPageTitle } from '../../features/common/headerSlice'
// import Transactions from '../../features/transactions'
// import ArtList from '../../features/general/art-list'
import { setPageTitle } from "../../../features/common/headerSlice";

// import ParticipantMyInfoWork from "../../../features/users/participant/my-work-info";
import ParticipantMyInfoWork from './../../../features/users/participant/my-work-info/index';

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "" }));
  }, []);

  return (
    <>
      <ParticipantMyInfoWork />
    </>
  );
}

export default InternalPage;
