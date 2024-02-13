import { themeChange } from "theme-change";
import React, { useContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import BellIcon from "@heroicons/react/24/outline/BellIcon";
import Bars3Icon from "@heroicons/react/24/outline/Bars3Icon";
import MoonIcon from "@heroicons/react/24/outline/MoonIcon";
import SunIcon from "@heroicons/react/24/outline/SunIcon";
import { openRightDrawer } from "../features/common/rightDrawerSlice";
import { RIGHT_DRAWER_TYPES } from "../utils/globalConstantUtil";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";
import {
  NavLink,
  Routes,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import ChangeLanguageDropDown from "../components/DropDowns/ChangeLanguageDropDown";
import ArrowRightOnRectangleIcon from "@heroicons/react/24/outline/ArrowRightOnRectangleIcon";
import { AuthContext } from "../gard/context/AuthContext";
import { logOutUser } from "../core/api/servises/register";
// import {Link,useNavigate} from 'react-router-dom'

function Header({ sideController }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { noOfNotifications, pageTitle } = useSelector((state) => state.header);
  const [currentTheme, setCurrentTheme] = useState(null);
  const names = window.localStorage.getItem("name");

  useEffect(() => {
    let theme = localStorage.getItem("theme") ?? "light";
    setCurrentTheme(theme);
    themeChange(false);
    if (currentTheme === null) {
      if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ) {
        setCurrentTheme("dark");
      } else {
        setCurrentTheme("light");
      }
    }
    // 👆 false parameter is required for react project
  }, []);

  // Opening right sidebar for notification
  const openNotification = () => {
    dispatch(
      openRightDrawer({
        header: "Notifications",
        bodyType: RIGHT_DRAWER_TYPES.NOTIFICATION,
      })
    );
  };
  const iconClasses = `h-6 w-6`;

  const {
    userToken,
    setUserToken,
    setIsLoggedIn,
    isLoggedIn,
    logout,
    loginContext,
  } = useContext(AuthContext);
  const navigate = useNavigate();

  const userT= window.localStorage.getItem("_token")
  // console.log('userT', userT);
  
  let new_string;
  if(userT) {
     new_string = userT.replace(/"/g, '');
  }
  // console.log('tttttt', new_string);

  const loggedOut = async () => {
    // const ourToken = `Bearer ${userToken}`;
    const createResult = await logOutUser(new_string)
      .then(function (response) {
        if (response.status) {
          // logout();
          // navigate("/login");
          // console.log(response?.status);
          window.localStorage.clear();
          window.location.href = "/";
        } else {
          if (response?.success == false) {
            // console.log(response);
          }
        }
      })
      .catch(function (error) {
        //console.log("error :", error);
      });
    return createResult;
  };
  function logoutUser() {
    localStorage.clear();
    loggedOut();
    window.location.href = "/";
  }



  return (
    // navbar fixed  flex-none justify-between bg-base-300  z-10 shadow-md

    <>
      <div className="navbar sticky top-0 bg-base-100  z-10 shadow-md ">
        {/* Menu toogle for mobile view or small screen */}
        {
          <div className="flex-1">
            <label
              htmlFor="left-sidebar-drawer"
              className="btn w-12 h-12 rounded-full btn-primary   drawer-button lg:hidden"
            >
              <Bars3Icon className="h-5 inline-block w-5" />
            </label>
          </div>
        }

        <div className="flex-none bg ">

          {/* Light and dark theme selection toogle **/}
          <label className="swap w-12 h-10 rounded-full btn btn-ghost">
            <input type="checkbox" />
            <SunIcon
              data-set-theme="light"
              data-act-class="ACTIVECLASS"
              className={
                "fill-current w-6 h-6 " +
                (currentTheme === "dark" ? "swap-on" : "swap-off")
              }
            />
            <MoonIcon
              data-set-theme="dark"
              data-act-class="ACTIVECLASS"
              className={
                "fill-current w-6 h-6 " +
                (currentTheme === "light" ? "swap-on" : "swap-off")
              }
            />
          </label>

   

          {/* Profile icon, opening menu on click */}

          <div className="dropdown dropdown-end ml-4">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src="/assets/imgs/users.png" alt="profile" />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 z-50"
            >
              <li className="z-50 pt-2 px-2">{names}</li>
              <div className="divider mt-0 mb-0 z-50"></div>
              <li className="justify-between">
                <Link to={"/app/settings-profile"}>{t("profile")}</Link>
              </li>
              <li className="z-50">
                <Link onClick={loggedOut}>{t("logout")}</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
