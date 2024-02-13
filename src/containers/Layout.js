import PageContent from "./PageContent";
import LeftSidebar from "./LeftSidebar";
import { useSelector, useDispatch } from "react-redux";
import RightSidebar from "./RightSidebar";
import { useEffect, useState } from "react";
import { removeNotificationMessage } from "../features/common/headerSlice";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import ModalLayout from "./ModalLayout";
import i18n from "../i18n";
import { useTranslation } from "react-i18next";

function Layout() {
    
  const dispatch = useDispatch();
  const { newNotificationMessage, newNotificationStatus } = useSelector(
    (state) => state.header
  );




  let currentLanguage = i18n.language;
  if (currentLanguage === "fa" || currentLanguage === "ar") {
    require("../rtl.css");
  }


  useEffect(() => {
    const mainLang = window.localStorage.getItem('current_Language');
    // console.log("i18n ::::",mainLang);
    i18n.changeLanguage(mainLang);
  
    if (newNotificationMessage !== "") {
      if (newNotificationStatus === 1)
        NotificationManager.success(newNotificationMessage, "Success");
      if (newNotificationStatus === 0)
        NotificationManager.error(newNotificationMessage, "Error");
      dispatch(removeNotificationMessage());
    }
  }, [newNotificationMessage]);

  function useWindowSize() {
    const [size, setSize] = useState({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    useEffect(() => {
      const handleResize = () => {
        setSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []); // Empty dependency array ensures the effect runs only once after the initial render

    return size;
  }

  const size = useWindowSize();
  // console.log('sizeeee',size.width);
  const checkWidh = size.width;
  // console.log("i18n ::::",i18n.language);

  return (
    <div className={`${i18n.language === "en" ? "ltr" : "rtl"} `}>
      {/* Left drawer - containing page content and side bar (always open) */}
      <div className="drawer  lg:drawer-open">
        <input
          id="left-sidebar-drawer"
          type="checkbox"
          className="drawer-toggle "
        />
        {/* <input onClick={panelHandler} type="checkbox" className="drawer-toggle bg-red-600 z-50" /> */}

        <PageContent />
        {/* {
              i18n.language ==='en'?(   */}
        <LeftSidebar />

        {/* //  ):(
            //      checkWidh > 375 ? ( <LeftSidebar />):(
            //      <RightSidebar/>
            //      )
            //   )
            // }  */}
      </div>

      {/* Right drawer - containing secondary content like notifications list etc.. */}
      {/* <RightSidebar /> */}

      {/** Notification layout container */}
      <NotificationContainer />

      {/* Modal layout container */}
      <ModalLayout />
    </div>
  );
}

export default Layout;
