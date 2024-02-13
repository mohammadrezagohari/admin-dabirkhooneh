import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../../features/common/headerSlice";
// import Transactions from '../../features/transactions'
// import ArtList from "../../../features/general/art-list";
import ArtList from './../../../features/general/art-list/index';

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title:"" }));
  }, []);

  return (
    <>
      <ArtList />
    </>
  );
}

export default InternalPage;
