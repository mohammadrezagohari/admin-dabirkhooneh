import { createContext, useState } from "react";
// import { useLocalStorage } from "../storage/useLocalStorage";
import { useLocalStorage } from "../storage/useLocalStorage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userToken, setUserToken] = useLocalStorage("_token", null);
  const [validation, setValidation] = useLocalStorage("validation", null);
  const [unique_key, setUniqueKey] = useState(null);
  const [nameContext,setNameContext] = useState(null);
  const [emailContext,setEmailContext] = useState(null);
  const [level,setLevel] = useState(null);
  const [mobileContext,setMobileContext] = useState(null);
  const [lang,setLang] = useState(null);
  const [statusContext,setStatus]= useState(null);
  const [jurorLists,setJurorLists] = useState(null);
  const [participantLists,setParticipantList]= useState(null);
  const [timeLeft,setTimeLeft]=useState();

 



const timeLefts= (time)=>{
  setTimeLeft(time);

}

const [regName,setRegName]=useState(null);
const [regMobile,setRegMobile]=useState(null);
const [regPass,setRegPass]=useState(null);
const [regEmail,setRegEmail]=useState(null);

const [regFaFlag,setRegFaFlag]=useState(false);
const [regEnFlag,setRegEnFlag]=useState(false);
const [logFaFlag,setLogFaFlag]=useState(false);
const [logEnFlag,setLogEnFlag]=useState(false);


const userData = (nameContext,emailContext,level,lang,statusContext,mobileContext)=>{
  setNameContext(nameContext); 
  setEmailContext(emailContext);
  setLang(level);
  setLevel(lang);
  setStatus(statusContext);
  setMobileContext(mobileContext);

  window.localStorage.setItem('name',nameContext);
  window.localStorage.setItem('email',emailContext);
  window.localStorage.setItem('level',level);
  window.localStorage.setItem('status',statusContext);
  window.localStorage.setItem('mobile',mobileContext);


}



const regContext= (name,email,mobile,)=>{
  setRegName(name);
  setEmailContext(email);
  setMobileContext(mobile);
  window.localStorage.setItem('name',nameContext);
  window.localStorage.setItem('email',emailContext);
  window.localStorage.setItem('mobile',mobileContext);
}


const updateName= (name)=>{
  setNameContext(name);
  window.localStorage.setItem('name',name);
}

const registerInitialDataFa = (mobile)=>{

  setRegMobile(mobile);
  setRegFaFlag(true);
  window.localStorage.setItem('regMobile',regMobile);
  window.localStorage.setItem('regFaFlag',regFaFlag);

  // console.log("mobile regggg context",regMobile);
}
const registerInitialDataEn = (email)=>{
  setRegEmail(email);
  window.localStorage.setItem('regEmail',regEmail);
  // console.log("email reg",regEmail);
}
const loginInitialDataFa = (mobile)=>{
  setRegMobile(mobile);
  window.localStorage.setItem('logMobile',regMobile);
  // console.log("mobile log",regMobile)
}

const loginInitialDataEn = (email)=>{
  setRegEmail(email);
  window.localStorage.setItem('regEmail',regEmail);
  // console.log("email log",regEmail);
}

  const loginContext = (token) => {
    setUserToken(`Bearer ${token}`);
    window.localStorage.setItem('_token',`Bearer ${userToken}`);
    setIsLoggedIn(true); 
    window.localStorage.setItem('isLoggedIn',isLoggedIn);
    // console.log("isLoggedInnnnnn",isLoggedIn);
  };
  const UniqueKeyContext = (unique_key) => {
    setUniqueKey(unique_key);
    window.localStorage.setItem('unique_key',unique_key);
  };

  const logout = () => {
    localStorage.removeItem("_token");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
    value={{
      regContext,
      updateName,
      timeLefts,
      timeLeft,
      isLoggedIn,
      regMobile,
      regEmail,
      loginContext,
      setUserToken,
      userToken,
      UniqueKeyContext,
      unique_key,
      setUniqueKey,
      logout,
      userData,
      nameContext,
      emailContext,
      mobileContext,
      lang,
      level,
      statusContext,
      loginInitialDataEn,
      loginInitialDataFa,
      registerInitialDataEn,
      registerInitialDataFa,
      logEnFlag,
      setParticipantList,
      setJurorLists,
      participantLists,
      jurorLists,
      setNameContext,
  }}
    >
      {children}
    </AuthContext.Provider>
  );
};
