import React, { Suspense } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import ReactDOM from "react-dom/client";
import "./index.css";
import './styles/toast.css'
import './styles/slider.css'
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import store from "./app/store";
import { Provider } from "react-redux";
import SuspenseContent from "./containers/SuspenseContent";
import { AuthProvider } from "./gard/context/AuthContext";
import { BrowserRouter } from "react-router-dom";
import { LangProvider } from "./gard/context/LangContext";
import { Toaster } from "react-hot-toast";
import { OtpProvider } from "./gard/context/OtpContext";
import i18n  from 'i18next';
import { PublicLangProvider } from "./gard/context/PublicLangContext";
// import i18n from './i18n/index';


const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById("root"));
const currentLang = localStorage.getItem("changeLanguage");
const currentPublicLang = localStorage.getItem("changePublicLanguage");
root.render(
  // <React.StrictMode>
  // <BrowserRouter>
//   <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <OtpProvider>
        <AuthProvider>
          <Suspense fallback={<SuspenseContent />}>
            <LangProvider changeLanguage={currentLang? currentLang : "ar"}>
              <PublicLangProvider changePublicLanguage={currentPublicLang? currentPublicLang : "fa"}>
                <Provider store={store}>
                  <BrowserRouter>
                    <App />
                    <Toaster 
                    toastOptions={{
                      className: `font-dana text-sm ${i18n.language=="en"?"ltr text-left":"rtl text-right"}`,
                      style: {
                        direction: `${i18n.language=="en"?"ltr text-left":"rtl text-right"}`,
                      }
                  }}
                  containerStyle={{
                    direction: `${i18n.language=="en"?"ltr text-left":"rtl text-right"}`,
                  }}
                    position="top-center" />
                  </BrowserRouter>
                </Provider>
              </PublicLangProvider>
            </LangProvider>
          </Suspense>
        </AuthProvider>
      </OtpProvider>
    </QueryClientProvider>
//   </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
