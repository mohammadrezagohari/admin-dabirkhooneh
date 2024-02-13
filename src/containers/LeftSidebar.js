import { NavLink, Routes, Link, useLocation } from "react-router-dom";
import SidebarSubmenu from "./SidebarSubmenu";
import XMarkIcon from "@heroicons/react/24/outline/XMarkIcon";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import routes, {
  routes2,
  adminRoutes,
  assistantRoutes,
  jurorRoutes,
  participantRoutes,
  peopleRoutes,
} from "../routes/sidebar";
import i18n from "../i18n";
import { useRef } from "react";

function LeftSidebar() {
  const { t } = useTranslation();
  const location = useLocation();

  const dispatch = useDispatch();
  const levels = window.localStorage.getItem("level");
  // console.log('levelssssss',levels);

  const close = (e) => {
    document.getElementById("left-sidebar-drawer").click();
  };
  const panelRef = useRef();

  let currentLanguage = i18n.language;
  let styleLeft = null;

  if (currentLanguage === "fa" || currentLanguage === "ar") {
    styleLeft = true;
  }

  if (levels === "5") {
    return (
      <>
        <div ref={panelRef} className={`drawer-side  z-30 `}>
          <label htmlFor="" className="hidden"></label>
          <ul className="menu  pt-2 w-80 bg-base-100 min-h-full   text-base-content">
            <button
              className={`btn btn-ghost bg-base-300  rounded-full z-50 top-0 ${
                styleLeft ? "left-0" : "right-0"
              } ${
                currentLanguage === "en" ? "right-[1rem]" : "left-[1rem]"
              } mt-4 mr-2 absolute lg:hidden`}
              onClick={() => close()}
            >
              <XMarkIcon className="h-5 inline-block w-5" />
            </button>

            <li className="mb-2 font-semibold text-xl">
              <Link to={"/app/dashboard"}>
                <img
                  className="mask mask-squircle w-10"
                  src="/assets/imgs/office.png"
                  alt="DashWind Logo"
                />
                {t("secretariat")}
              </Link>{" "}
            </li>
            {adminRoutes.map((route, k) => {
              return (
                <li className="" key={k}>
                  {route.submenu ? (
                    <SidebarSubmenu {...route} />
                  ) : (
                    <NavLink
                      end
                      to={route.path}
                      className={({ isActive }) =>
                        `${
                          isActive
                            ? "font-semibold  bg-base-200 "
                            : "font-normal"
                        }`
                      }
                    >
                      {route.icon} {route.name}
                      {location.pathname === route.path ? (
                        <span
                          className={`  ${
                            i18n.language == "en" ? "left-0" : "right-0"
                          } absolute inset-y-0  w-1 rounded-tr-md rounded-br-md bg-primary `}
                          aria-hidden="true"
                        ></span>
                      ) : null}
                    </NavLink>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </>
    );
  } else if (levels == "2") {
    return (
      <div className="drawer-side  z-30  ">
        <label htmlFor="left-sidebar-drawer" className="drawer-overlay"></label>
        <ul className="menu  pt-2 w-80 bg-base-100 min-h-full   text-base-content">
          <button
            className={`btn btn-ghost bg-base-300  rounded-full z-50 top-0 ${
              styleLeft ? "left-0" : "right-0"
            } ${
              currentLanguage === "en" ? "right-[1rem]" : "left-[1rem]"
            } mt-4 mr-2 absolute lg:hidden`}
            onClick={() => close()}
          >
            <XMarkIcon className="h-5 inline-block w-5" />
          </button>

          <li className="mb-2 font-semibold text-xl">
            <Link to={"/app/dashboard"}>
              <img
                className="mask mask-squircle w-10"
                src="/assets/imgs/office.png"
                alt="DashWind Logo"
              />
              {t("secretariat")}
            </Link>{" "}
          </li>
          {assistantRoutes.map((route, k) => {
            return (
              <li className="" key={k}>
                {route.submenu ? (
                  <SidebarSubmenu {...route} />
                ) : (
                  <NavLink
                    end
                    to={route.path}
                    className={({ isActive }) =>
                      `${
                        isActive ? "font-semibold  bg-base-200 " : "font-normal"
                      }`
                    }
                  >
                    {route.icon} {route.name}
                    {location.pathname === route.path ? (
                      <span
                        className={` ${
                          i18n.language == "en" ? "left-0" : "right-0"
                        } absolute inset-y-0  w-1 rounded-tr-md rounded-br-md bg-primary `}
                        aria-hidden="true"
                      ></span>
                    ) : null}
                  </NavLink>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    );
  } else if (levels == "3") {
    return (
      <div
        className={`drawer-side  z-30  ${
          i18n === "fa" ? "hidden" : "inline-flex"
        }`}
      >
        <label htmlFor="left-sidebar-drawer" className="drawer-overlay"></label>
        <ul className="menu  pt-2 w-80 bg-base-100 min-h-full   text-base-content">
          <button
            className={`btn btn-ghost bg-base-300  rounded-full z-50 top-0 ${
              styleLeft ? "left-0" : "right-0"
            } ${
              currentLanguage === "en" ? "right-[1rem]" : "left-[1rem]"
            } mt-4 mr-2 absolute lg:hidden`}
            onClick={() => close()}
          >
            <XMarkIcon className="h-5 inline-block w-5" />
          </button>

          <li className="mb-2 font-semibold text-xl">
            <Link to={"/app/dashboard"}>
              <img
                className="mask mask-squircle w-10"
                src="/assets/imgs/office.png"
                alt="DashWind Logo"
              />
              {t("secretariat")}
            </Link>{" "}
          </li>
          {jurorRoutes.map((route, k) => {
            return (
              <li className="" key={k}>
                {route.submenu ? (
                  <SidebarSubmenu {...route} />
                ) : (
                  <NavLink
                    end
                    to={route.path}
                    className={({ isActive }) =>
                      `${
                        isActive ? "font-semibold  bg-base-200 " : "font-normal"
                      }`
                    }
                  >
                    {route.icon} {route.name}
                    {location.pathname === route.path ? (
                      <span
                        className={` ${
                          i18n.language == "en" ? "left-0" : "right-0"
                        } absolute inset-y-0  w-1 rounded-tr-md rounded-br-md bg-primary `}
                        aria-hidden="true"
                      ></span>
                    ) : null}
                  </NavLink>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    );
  } else {
    return (
      <div className="drawer-side  z-30  ">
        <label htmlFor="left-sidebar-drawer"></label>
        <ul className="menu  pt-2 w-80 bg-base-100 min-h-full   text-base-content">
          <button
            className={`btn btn-ghost bg-base-300  rounded-full z-50 top-0 ${
              styleLeft ? "left-0" : "right-0"
            } ${
              currentLanguage === "en" ? "right-[1rem]" : "left-[1rem]"
            } mt-4 mr-2 absolute lg:hidden`}
            onClick={() => close()}
          >
            <XMarkIcon className="h-5 inline-block w-5" />
          </button>

          <li className="mb-2 font-semibold text-xl">
            <Link to={"/app/dashboard"}>
              <img
                className="mask mask-squircle w-10"
                src="/assets/imgs/office.png"
                alt="DashWind Logo"
              />
              {t("secretariat")}
            </Link>{" "}
          </li>
          {participantRoutes.map((route, k) => {
            return (
              <li className="" key={k}>
                {route.submenu ? (
                  <SidebarSubmenu {...route} />
                ) : (
                  <NavLink
                    end
                    to={route.path}
                    className={({ isActive }) =>
                      `${
                        isActive ? "font-semibold  bg-base-200 " : "font-normal"
                      }`
                    }
                  >
                    {route.icon} {route.name}
                    {location.pathname === route.path ? (
                      <span
                        className={` ${
                          i18n.language == "en" ? "left-0" : "right-0"
                        } absolute inset-y-0  w-1 rounded-tr-md rounded-br-md bg-primary `}
                        aria-hidden="true"
                      ></span>
                    ) : null}
                  </NavLink>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default LeftSidebar;
