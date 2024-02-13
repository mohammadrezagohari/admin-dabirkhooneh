import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../../features/common/headerSlice";
// import Leads from "../../../features/leads";
import Leads from '../../../features/leads/index';
import JurorResult from "../../../features/users/assistance/juror-result";

function InternalPage() {
  const dispatch = useDispatch();
  // "UrsRgZvT"
  useEffect(() => {
    dispatch(setPageTitle({ title: "JurorResult" }));
  }, []);

  return <JurorResult />;
}

export default InternalPage;
