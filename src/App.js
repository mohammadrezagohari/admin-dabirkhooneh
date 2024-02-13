import "./App.css";
// import "react-toastify/dist/ReactToastify.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { themeChange } from "theme-change";
// import checkAuth from './app/auth';
import initializeApp from "./app/init";
import i18n from "./i18n";
// import i18n from './i18n';
import React, { lazy, useEffect, useContext } from "react";
import { AuthContext } from "./gard/context/AuthContext";
import OTPInputs from "./components/OTP/otp";
import LogOut from "./pages/Logout";
import { checkAuth } from "./core/api/servises/register";

const Layout = lazy(() => import("./containers/Layout"));
const Login = lazy(() => import("./pages/Login"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const Register = lazy(() => import("./pages/Register"));
const Documentation = lazy(() => import("./pages/Documentation"));
const WorksListQR = lazy(() => import("./pages/WorksListQR/WorksListQR"));
const OtpPage = lazy(() => import("./pages/OtpPage/OtpPage"));
const PostGuestCommentInternationalWork = lazy(() =>
  import(
    "./pages/PostGuestCommentInternationalWork/PostGuestCommentInternationalWork"
  )
);
const PostGuestCommentIRWork = lazy(() =>
  import("./pages/PostGuestCommentIRWork/PostGuestCommentIRWork")
);

// Initializing different libraries
initializeApp();

// Check for login and initialize axios
// const token = checkAuth();

function App() {
  const navigate = useNavigate();

  const { isLoggedIn, loginContext, setUserToken, userToken, logout } =
    useContext(AuthContext);
  if (isLoggedIn) {
    window.localStorage.setItem("isLoggedIn", isLoggedIn);
  }
  useEffect(() => {
    themeChange(false);
  }, []);

  const valid = window.localStorage.getItem('validation');
  const v = JSON.parse(valid);

  return (
    <div
      className={`${i18n.language === "en" ? "font-yekanReg" : "font-dana"} ${
        i18n.language === "en" ? "ltr" : "rtl"
      }`}
    >
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<LogOut />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/work/:unique_key/informatin/:tracking_code"
          element={<PostGuestCommentIRWork />}
        />
        <Route
          path="/post-guest-comment-international-work/:unique_key/:tracking_code"
          element={<PostGuestCommentInternationalWork />}
        />
        <Route path="/works-list-qr" element={<WorksListQR />} />
        <Route path="/verifyaccountotp" element={<OtpPage />} />
        <Route path="/documentation" element={<Documentation />} />
        {/* <Route path="/verifyaccount" element={<OTPInput />} /> */}
        <Route path="/verfiy" element={<OTPInputs />} />
        <Route path="/userpanel" element={<OTPInputs />} />
        {/* Place new routes over this */}
        {
            v == null  ?(
              <Route path="/app/*" element={
                <Navigate to={"/login"} replace />}
               />
            ):(
              <Route path="/app/*" element={<Layout />} />
            )
          }
        {/* <Route path="/app/*" element={<Layout />} /> */}

        <Route
          path="*"
          element={
            <Navigate to={isLoggedIn ? "/app/dashboard" : "/login"} replace />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
