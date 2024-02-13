import { useState, useRef, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import OTPInput from "../OTP/otp";
import { useTranslation } from "react-i18next";
import {
  regContext,
  logByEmailAndOTP,
  logByPassAndEmail,
  logByEmailAndOTPAr,
  logByPassAndEmailAr,
  regByEmailAr,
  logByMobileAndOTP,
  logByPassAndMobile,
  regByMobile,
  regByEmail,
  checkAuth,
  logOutUser,
} from "../../core/api/servises/register";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../gard/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import i18n from "i18next";
import { themeChange } from "theme-change";
import SunIcon from "@heroicons/react/24/outline/SunIcon";
import MoonIcon from "@heroicons/react/24/outline/MoonIcon";
import LandingIntro from "../../features/user/LandingIntro";
import { getPublicInfo } from "../../core/api/servises/lists";

function RegisterForm({ changeLanguage }) {
  
    const [loading, setLoading] = useState(true);

  const [publicInfo, setPublicInfo] = useState();
  const [baseUrl, setBaseUrl] = useState();
  const [text, setText] = useState();
  const [projectName, setProjectName] = useState();
  const [logo, setLogo] = useState();

  const navigate = useNavigate();

  const [buttonColor, setButtonColor] = useState("#4a00ff");

  const {
    timeLefts,
    timeLeft,
    userToken,
    setUserToken,
    setIsLoggedIn,
    userData,
    isLoggedIn,
    loginContext,
    UniqueKeyContext,
  } = useContext(AuthContext);

  const {
    loginInitialDataEn,
    loginInitialDataFa,
    setRegFaFlag,
    setRegEnFlag,
    setLogFaFlag,
    setLogEnFlag,
  } = useContext(AuthContext);

  const [regFlag, setRegFlag] = useState(false);
  const [passFlag, setPassFlag] = useState(false);
  const { t } = useTranslation();

  const sendRef = useRef(null);
  const sendRef1 = useRef(null);

  const messageRef = useRef();
  const messageRef1 = useRef();
  const passeRef = useRef();
  const nameRef = useRef();
  const mobileRef = useRef();
  const emailRef = useRef();
  const passeRegRef = useRef();
  const nameRegRef = useRef();
  const mobileRegRef = useRef();
  const emailRegRef = useRef();
  const otpStatusRef = useRef();

  const getPublic = async () => {
    const result = await getPublicInfo()
      .then(function (response) {
        setPublicInfo(response);
        setBaseUrl(response.data?.base_url);
        setText(response.data?.text);
        setLogo(response.data?.logo);
        setProjectName(response.data?.project_name);
        // console.log('public res',response);
      })
      .catch(function (error) {
        // console.log(error.message);
      });
    return result;
  };


 
const login = window.localStorage.getItem('isLoggedIn');

const tokenValidity = window.localStorage.getItem('_token');
//  console.log('token in js : ',typeof tokenValidity);

 let new_string;
if(tokenValidity) {
  new_string = tokenValidity.replace(/"/g, '');
}
 


const [validityFlag,setValidityFlag]= useState(false);
  const checkValidity = async () => {
    const result = await checkAuth(new_string)
      .then(function (response) {
        // console.log('responseee',response);
        if (response?.status?.code == 200) {
          setValidityFlag(true);
          navigate('/app/dashboard')
        }
        if( response?.status?.code === 403) {
          localStorage.clear();
          setValidityFlag(false);
        }
     
      })
      .catch(function (error) {
       
        if( (error?.response?.status === 403)) {
          localStorage.clear();
          setValidityFlag(false);
        }
      
      });
    return result;
  }; 

  const handleImageLoaded = () => {
    const allImagesLoaded = Array.from(document.images).every(img => img.complete  && img.naturalHeight !== 0);
    // alert(allImagesLoaded)
    if (allImagesLoaded) {
        // alert();
        setTimeout(()=>{
          setLoading(false);
        },1000);
    }
  };

   const valid = window.localStorage.getItem('validation');
   const validate = JSON.parse(valid);
  
  useEffect(() => {
  
    if(tokenValidity != 'null' && login == 'true' && validate ){
      checkValidity();
      setLoading(true);
    }else{
      getPublic();
      window.addEventListener('load',handleImageLoaded())
    }
  }, []);



  useEffect(() => {
    const timer = setTimeout(() => {
      setButtonColor("#4a00ff");
    }, 2000);
    return () => clearTimeout(timer);
  }, [buttonColor]);

  const [name, setName] = useState("");
  const [nameReg, setNameReg] = useState("");

  const [mobile, setMobile] = useState("");
  const [mobileReg, setMobileReg] = useState("");

  const [email, setEmail] = useState("");
  const [emailReg, setEmailReg] = useState("");

  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  const [passwordReg, setPasswordReg] = useState("");

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [buttonDisabled2, setButtonDisabled2] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmited, setIsSubmited] = useState(false);
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handlePasswordChange2 = (e) => {
    setPassword(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const regFlagStatus = () => {
    setButtonDisabled(false);
    setButtonDisabled2(false);
    regFlag ? setRegFlag(false) : setRegFlag(true);
    if (regFlag) {
      setName("");
      setMobile("");
      setEmail("");
      setPassword("");
      setRegFlag(false);
    } else {
      setNameReg("");
      setMobileReg("");
      setEmailReg("");
      setPasswordReg("");
      setRegFlag(true);
    }
  };

  const passFlagStatus = () => {
    if (passFlag) {
      setPassFlag(false);
    } else {
      setPassFlag(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setButtonDisabled2(true);
    setIsSubmited(true);

    if (i18n.language === "fa") {
      const createResult = await regByMobile({
        name: nameReg,
        mobile: mobileReg,
        password: passwordReg,
      })
        .then(function (response) {
         
       
          if (response.status) {
          
            timeLefts(response?.data?.time_left);
        
            UniqueKeyContext(response?.data?.unique_key);
          
            window.localStorage.setItem("logFaFlag", true);
            window.localStorage.setItem("regMobile", mobileReg);
            window.localStorage.setItem("validation", true);
            // loginInitialDataFa(mobile);
            toast.success(response.status.message);
      
            sendRef1.current.style.backgroundColor = "rgba(145,199,20,.9)";
            setTimeout(() => {
              setButtonDisabled2(false);
            }, 1000);

            setTimeout(() => {
              setIsSubmited(false);
        
            }, 2000);
            setTimeout(() => {
              navigate("/verfiy");
            }, 1000);
          }
          else {
            sendRef1.current.style.backgroundColor = "rgba(211, 41, 41,.9)";
            setTimeout(() => {
              setIsSubmited(false);
              setButtonDisabled2(false);
              sendRef1.current.style.backgroundColor = "rgb(74, 0, 255)";
            }, 2000);
            toast.error(response.status.message);
          }
          // console.log(response);
        })
        .catch(function (error) {
          sendRef1.current.style.backgroundColor = "rgba(211, 41, 41,.9)";
          setTimeout(() => {
            setIsSubmited(false);
            setButtonDisabled2(false);
            sendRef1.current.style.backgroundColor = "rgb(74, 0, 255)";
          }, 2000);
          toast.error(error.response.data.status.message);
        });
      return createResult;
    } else if (i18n.language === "en") {
      const createResult = await regByEmail({
        name: nameReg,
        email: emailReg,
        password: passwordReg,
      })
        .then(function (response) {
          // console.log("data result", response);
          // const flag = true;
          // registerInitialDataEn(name,email,password,flag);

          // loginInitialDataEn(email);

          // Reset the button color back to the default after 1 second
          window.localStorage.setItem("logEnFlag", true);
          window.localStorage.setItem("regEmail", emailReg);
          window.localStorage.setItem("regFlag", true);
          window.localStorage.setItem("validation", true);
          if (response.status.code == 200) {
            setIsSubmited(true);
            sendRef1.current.style.backgroundColor = "rgba(145,199,20,.9)";
            setTimeout(() => {
              setButtonDisabled2(false);
            }, 1000);

            // setButtonColor("green");
            timeLefts(response?.data?.time_left);
            UniqueKeyContext(response?.data?.unique_key);
            toast.success(response.status.message);
            // setIsSubmited(true);
            // setButtonColor('green');
            // window.localStorage.setItem('logEnFlag', true);
            // window.localStorage.setItem('email', email);
           
            // sendRef1.current.style.backgroundColor = "rgba(145,199,20,.9)";
            setTimeout(() => {
              setIsSubmited(false);
              sendRef1.current.style.backgroundColor = "rgb(74, 0, 255)";
            }, 2000);

            setTimeout(() => {
              navigate("/verfiy");
            }, 2000);
          } else {
            sendRef.current.style.backgroundColor = "rgba(211, 41, 41,.9)";
            setTimeout(() => {
              setIsSubmited(false);
              setButtonDisabled2(false);
              sendRef1.current.style.backgroundColor = "rgb(74, 0, 255)";
            }, 2000);
            toast.error(response.status.message);
          }
          // console.log(response);
        })
        .catch(function (error) {
          sendRef1.current.style.backgroundColor = "rgba(211, 41, 41,.9)";
          setTimeout(() => {
            setIsSubmited(false);
            setButtonDisabled2(false);
            sendRef1.current.style.backgroundColor = "rgb(74, 0, 255)";
          }, 2000);
          toast.error(error.response.data.status.message);
        });
      return createResult;
    } else {
      const createResult = await regByEmailAr({
        name: nameReg,
        email: emailReg,
        password: passwordReg,
      })
        .then(function (response) {

          // Reset the button color back to the default after 1 second
          window.localStorage.setItem("logArFlag", true);
          window.localStorage.setItem("regEmail", emailReg);
          window.localStorage.setItem("regFlag", true);

          if (response.status.code == 200) {
            setTimeout(() => {
              setButtonDisabled2(false);
            }, 1000);

            // setButtonColor("green");
            timeLefts(response?.data?.time_left);
            UniqueKeyContext(response?.data?.unique_key);

            window.localStorage.setItem("validation", true);
            // sendRef1.current.style.backgroundColor = "rgba(145,199,20,.9)";
            toast.success(response.status.message);
            // setIsSubmited(true);
            // setButtonColor('green');
            // window.localStorage.setItem('logEnFlag', true);
            // window.localStorage.setItem('email', email);
            
            sendRef1.current.style.backgroundColor = "rgba(145,199,20,.9)";
            setTimeout(() => {
              setIsSubmited(false);
              sendRef1.current.style.backgroundColor = "rgb(74, 0, 255)";
            }, 2000);

            setTimeout(() => {
              navigate("/verfiy");
            }, 2000);
          } else {
            sendRef1.current.style.backgroundColor = "rgba(211, 41, 41,.9)";
            setTimeout(() => {
              setIsSubmited(false);
              setButtonDisabled2(false);
              sendRef1.current.style.backgroundColor = "rgb(74, 0, 255)";
            }, 2000);
            toast.error(response.status.message);
          }
          // console.log(response);
        })
        .catch(function (error) {
          sendRef1.current.style.backgroundColor = "rgba(211, 41, 41,.9)";
          setTimeout(() => {
            setIsSubmited(false);
            setButtonDisabled2(false);
            sendRef1.current.style.backgroundColor = "rgb(74, 0, 255)";
          }, 2000);
          toast.error(error.response.data.status.message);
        });
      return createResult;
    }
  };

  const loginSubmit = async (e) => {
    e.preventDefault();
    setButtonDisabled(true);
    setIsSubmited(true);
    if (i18n.language === "fa") {
      // console.log(passFlag);
      if (passFlag) {
        if (!mobile || !password) {
          toast.error(t("fillData"));
          sendRef.current.style.backgroundColor = "rgba(211, 41, 41,.9)";
          setTimeout(() => {
            setIsSubmited(false);
            setButtonDisabled(false);
            sendRef.current.style.backgroundColor = "rgb(74, 0, 255)";
          }, 2000);
        } else {
          const createResult = await logByPassAndMobile({
            mobile,
            password,
          })
            .then(function (response) {
              // console.log("data result", response);
            
              if (response.status) {
             
                setTimeout(() => {
                  setButtonDisabled(false);
                }, 1000);

                userData(
                  response?.data?.user?.name,
                  response?.data?.user?.email,
                  response?.data?.user?.level,
                  response?.data?.user?.lang,
                  response?.data?.user?.status,
                  response?.data?.user?.mobile
                );
                UniqueKeyContext(response?.data?.unique_key);
                loginContext(response?.data?.access_token);
                window.localStorage.setItem("validation", true);

                sendRef.current.style.backgroundColor = "rgba(145,199,20,.9)";
                setTimeout(() => {
                  // sendRef.current.style.backgroundColor = "rgb(74, 0, 255)";
                  setIsSubmited(false);
                }, 2000);
                toast.success(response.status.message);
                setTimeout(() => {
                  navigate("/app/dashboard");
                }, 1000);
              } else {
                if (response.status === false) {
                  sendRef.current.style.backgroundColor =
                    "rgba(211, 41, 41,.9)";
                  setTimeout(() => {
                    setIsSubmited(false);
                    setButtonDisabled(false);
                    sendRef.current.style.backgroundColor = "rgb(74, 0, 255)";
                  }, 2000);
                  toast.error(response.status.message);
                }
              }
            })
            .catch(function (error) {
              if (error.response?.status === 400) {
                sendRef.current.style.backgroundColor = "rgba(211, 41, 41,.9)";
                setTimeout(() => {
                  setIsSubmited(false);
                  setButtonDisabled(false);
                  sendRef.current.style.backgroundColor = "rgb(74, 0, 255)";
                }, 2000);
                toast.error(error.response.data.status.message);
              }
              if (error.response?.status === 401) {
                sendRef.current.style.backgroundColor = "rgba(211, 41, 41,.9)";
                setTimeout(() => {
                  setIsSubmited(false);
                  setButtonDisabled(false);
                  sendRef.current.style.backgroundColor = "rgb(74, 0, 255)";
                }, 2000);
                toast.error(error.response.data.status.message);
              }
            });
          return createResult;
        }
      } else {
        const createResult = await logByMobileAndOTP({
          mobile,
        })
          .then(function (response) {
            // setIsSubmited(true);
            if (response.status) {
              // setButtonColor('green');
              // sendRef.current.style.backgroundColor= 'green';
              setTimeout(() => {
                setButtonDisabled(false);
              }, 1000);

            
              sendRef.current.style.backgroundColor = "rgba(145,199,20,.9)";
              // sendRef.current.style.backgroundColor = "rgb(74, 0, 255)";
              setTimeout(() => {
                setIsSubmited(false);
              }, 1000);

              UniqueKeyContext(response?.data?.unique_key);
              // loginInitialDataFa(mobile);
              window.localStorage.setItem("logFaFlag", true);
              window.localStorage.setItem("regMobile", mobile);
              timeLefts(response?.data?.time_left);

              userData(
                response?.data?.user?.name,
                response?.data?.user?.email,
                response?.data?.user?.level,
                response?.data?.user?.lang,
                response?.data?.user?.status,
                response?.data?.user?.mobile
              );
              loginContext(response?.data?.access_token);
              localStorage.setItem("_token", response?.data?.access_token);
              setTimeout(() => {
                toast.success(response.status.message);
              }, 3000);
             
              setTimeout(() => {
                navigate("/verfiy");
              }, 2000);
           
            } else {
              // console.log("response",response);
              if (response?.status == false) {
                sendRef.current.style.backgroundColor = "rgba(211, 41, 41,.9)";
                setTimeout(() => {
                  setIsSubmited(false);
                  setButtonDisabled(false);
                  sendRef.current.style.backgroundColor = "rgb(74, 0, 255)";
                }, 2000);
                toast.error(response.data.status.message);
              }
            }
          })
          .catch(function (error) {
            sendRef.current.style.backgroundColor = "rgba(211, 41, 41,.9)";
            setTimeout(() => {
              setIsSubmited(false);
              setButtonDisabled(false);
              sendRef.current.style.backgroundColor = "rgb(74, 0, 255)";
            }, 2000);

            toast.error(error.response.data.status.message);

            // toast.error("خطا !! مجددا تلاش نمایید");
          });
        return createResult;
      }
    } else if (i18n.language === "en") {
      if (passFlag == true) {
        if (!email || !password) {
          toast.error(t("fillData"));
          sendRef.current.style.backgroundColor = "rgba(211, 41, 41,.9)";
          setTimeout(() => {
            setIsSubmited(false);
            setButtonDisabled(false);
            sendRef.current.style.backgroundColor = "rgb(74, 0, 255)";
          }, 2000);
        } else {
          const createResult = await logByPassAndEmail({
            email,
            password,
          })
            .then(function (response) {
              // setIsSubmited(true);

              if (response.status.code == 200) {

                // setIsSubmited(true);
                setTimeout(() => {
                  setButtonDisabled(false);
                }, 1000);
               
                UniqueKeyContext(response?.data?.unique_key);
                // setButtonColor('green'); // Reset the button color back to the default after 1 second
                userData(
                  response?.data?.user?.name,
                  response?.data?.user?.email,
                  response?.data?.user?.level,
                  response?.data?.user?.lang,
                  response?.data?.user?.status,
                  response?.data?.user?.mobile
                );
                loginContext(response?.data?.access_token);
                localStorage.setItem("_token", response?.data?.access_token);
                toast.success(response.status.message);
                window.localStorage.setItem("validation", true);
               
                sendRef.current.style.backgroundColor = "rgba(145,199,20,.9)";
                setTimeout(() => {
                  setIsSubmited(false);
                  sendRef.current.style.backgroundColor = "rgb(74, 0, 255)";
                }, 2000);
                setTimeout(() => {
                  navigate("/app/dashboard");
                }, 2000);
              } else {
                if (response?.status === false) {
                  sendRef.current.style.backgroundColor =
                    "rgba(211, 41, 41,.9)";
                  setTimeout(() => {
                    setIsSubmited(false);
                    setButtonDisabled(false);
                    sendRef.current.style.backgroundColor = "rgb(74, 0, 255)";
                  }, 2000);
                  toast.error(response.status.message);
                }
              }
            })
            .catch(function (error) {
              if (
                error.response?.status === 404 ||
                error.response?.status === 401 ||
                error.response?.status === 400 ||
                error.response?.status === 403
              ) {
                sendRef.current.style.backgroundColor = "rgba(211, 41, 41,.9)";
                setTimeout(() => {
                  setIsSubmited(false);
                  setButtonDisabled(false);
                  sendRef.current.style.backgroundColor = "rgb(74, 0, 255)";
                }, 2000);
                toast.error(error.response.data.status.message);
              }
            });
          return createResult;
        }
      } else {
        const createResult = await logByEmailAndOTP({
          email,
        })
          .then(function (response) {
            // setIsSubmited(true);

            if (response.status.code == 200) {
              // sendRef.current.style.backgroundColor= 'green';
              // setButtonColor('green');
              // loginInitialDataEn(email);
              window.localStorage.setItem("logEnFlag", true);
              window.localStorage.setItem("regEmail", email);
              // setIsSubmited(true);
              setTimeout(() => {
                setButtonDisabled(false);
              }, 1000);
              // setIsSubmited(true);
              // setButtonColor('green');
             
              sendRef.current.style.backgroundColor = "rgba(145,199,20,.9)";
              setTimeout(() => {
                setIsSubmited(false);
                sendRef.current.style.backgroundColor = "rgb(74, 0, 255)";
              }, 2000);
              setTimeout(() => {
                navigate("/verfiy");
              }, 2000);
              timeLefts(response?.data?.time_left);
              UniqueKeyContext(response?.data?.unique_key);
              userData(
                response?.data?.user?.name,
                response?.data?.user?.email,
                response?.data?.user?.level,
                response?.data?.user?.lang,
                response?.data?.user?.status,
                response?.data?.user?.mobile
              );
              loginContext(response?.data?.access_token);
              localStorage.setItem("_token", response?.data?.access_token);
              setTimeout(() => {
                toast.success(response.status.message);
              }, 3000);
            } else {
              if (response?.status === false)
                sendRef.current.style.backgroundColor = "rgba(211, 41, 41,.9)";
              setTimeout(() => {
                setIsSubmited(false);
                setButtonDisabled(false);
                sendRef.current.style.backgroundColor = "rgb(74, 0, 255)";
              }, 2000);
              toast.error(response.status.message);
            }
          })
          .catch(function (error) {
            if (
              error.response?.status === 404 ||
              error.response?.status === 401 ||
              error.response?.status === 400 ||
              error.response?.status === 403
            ) {
              toast.error(error.response.data.status.message);
              sendRef.current.style.backgroundColor = "rgba(211, 41, 41,.9)";
              setTimeout(() => {
                setIsSubmited(false);
                setButtonDisabled(false);
                sendRef.current.style.backgroundColor = "rgb(74, 0, 255)";
              }, 2000);
            }
          });
        return createResult;
      }
    } else {
      if (passFlag) {
        if (!email || !password) {
          toast.error(t("fillData"));
          sendRef.current.style.backgroundColor = "rgba(211, 41, 41,.9)";
          setTimeout(() => {
            setIsSubmited(false);
            setButtonDisabled(false);
            sendRef.current.style.backgroundColor = "rgb(74, 0, 255)";
          }, 2000);
        } else {
          const createResult = await logByPassAndEmailAr({
            email,
            password,
          })
            .then(function (response) {
              // setIsSubmited(true);

              if (response.status.code == 200) {

                setTimeout(() => {
                  setButtonDisabled(false);
                }, 1000);
                sendRef.current.style.backgroundColor = "rgba(145,199,20,.9)";
                UniqueKeyContext(response?.data?.unique_key);
               
                userData(
                  response?.data?.user?.name,
                  response?.data?.user?.email,
                  response?.data?.user?.level,
                  response?.data?.user?.lang,
                  response?.data?.user?.status,
                  response?.data?.user?.mobile
                );
                loginContext(response?.data?.access_token);
                localStorage.setItem("_token", response?.data?.access_token);
                toast.success(response.status.message);
                window.localStorage.setItem("validation", true);
                
                setTimeout(() => {
                  setIsSubmited(false);
                  sendRef.current.style.backgroundColor = "rgb(74, 0, 255)";
                }, 2000);
                setTimeout(() => {
                  navigate("/app/dashboard");
                }, 2000);
              } else {
                if (response?.status === false) {
                  sendRef.current.style.backgroundColor =
                    "rgba(211, 41, 41,.9)";
                  setTimeout(() => {
                    setIsSubmited(false);
                    setButtonDisabled(false);
                    sendRef.current.style.backgroundColor = "rgb(74, 0, 255)";
                  }, 2000);
                  toast.error(response.status.message);
                }
              }
            })
            .catch(function (error) {
              if (
                error.response?.status === 404 ||
                error.response?.status === 401 ||
                error.response?.status === 400 ||
                error.response?.status === 403
              ) {
                sendRef.current.style.backgroundColor = "rgba(211, 41, 41,.9)";
                setTimeout(() => {
                  setIsSubmited(false);
                  setButtonDisabled(false);
                  sendRef.current.style.backgroundColor = "rgb(74, 0, 255)";
                }, 2000);
                setButtonColor("red");
                toast.error(error.response.data.status.message);
              }
            });
          return createResult;
        }
      } else {
        const createResult = await logByEmailAndOTPAr({
          email,
        })
          .then(function (response) {
            // setIsSubmited(true);

            if (response.status.code == 200) {

              window.localStorage.setItem("logArFlag", true);
              window.localStorage.setItem("regEmail", email);

              sendRef.current.style.backgroundColor = "rgba(145,199,20,.9)";
              setTimeout(() => {
                setIsSubmited(false);
                setButtonDisabled(false);
              }, 2000);
              setTimeout(() => {
                navigate("/verfiy");
              }, 2000);
              timeLefts(response?.data?.time_left);
              UniqueKeyContext(response?.data?.unique_key);
              userData(
                response?.data?.user?.name,
                response?.data?.user?.email,
                response?.data?.user?.level,
                response?.data?.user?.lang,
                response?.data?.user?.status,
                response?.data?.user?.mobile
              );
              loginContext(response?.data?.access_token);
              localStorage.setItem("_token", response?.data?.access_token);
              setTimeout(() => {
                toast.success(response.status.message);
              }, 3000);
            } else {
              if (response?.status === false)
                sendRef.current.style.backgroundColor = "rgba(211, 41, 41,.9)";
              setTimeout(() => {
                setIsSubmited(false);
                setButtonDisabled(false);
                sendRef.current.style.backgroundColor = "rgb(74, 0, 255)";
              }, 2000);
              toast.error(response.status.message);
            }
          })
          .catch(function (error) {
            if (
              error.response?.status === 404 ||
              error.response?.status === 401 ||
              error.response?.status === 400 ||
              error.response?.status === 403
            ) {
              sendRef.current.style.backgroundColor = "rgba(211, 41, 41,.9)";
              setTimeout(() => {
                setIsSubmited(false);
                setButtonDisabled(false);
                // sendRef.current.style.backgroundColor = "rgb(74, 0, 255)";
              }, 2000);
              toast.error(error.response.data.status.message);
            }
          });
        return createResult;
      }
    }
  };
  const handleKeyDown = (e) => {
    if (regFlag) {
      if (e.key === "Enter") {
        handleSubmit(e);
      }
    } else {
      if (e.key === "Enter") {
        loginSubmit(e);
      }
    }
  };
  const [currentTheme, setCurrentTheme] = useState(
    localStorage.getItem("theme")
  );
  useEffect(() => {
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
  }, []);
  return (
    <>
        {loading ? (
        <div className="flex items-center justify-center py-60">
          <ThreeDots
            height="80"
            width="80"
            radius="9"
            color="#4fa94d"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
          />
        </div>
        ) : (
        <div
            className={`${
            i18n.language === "en" ? "text-left" : "text-right"
            } flex  flex-col justify-center items-center w-screen lg:-mt-3 h-screen     `}
        >
            {regFlag === true ? (
            <div className="flex flex-col justify-center items-center lg:h-max lg:-mt-4 md:-mt-4 md:h-max h-screen  w-screen md:w-max lg:w-max shadow-xl bg-base-200 rounded-md  ">
                <div className="mt-6 ">
                <img
                    onLoad={handleImageLoaded}
                    src={`${baseUrl}${logo}`}
                    className="logos w-14 inline-block mr-2 mask mask-circle"
                    alt="dabirkhone-logo"
                />
                </div>
                <div className=" flex flex-col px-10 py-8  w-full h-screen lg:w-[24rem] lg:h-full md:w-[24rem] md:h-max   gap-5 card mx-auto  max-w-5xl bg-transparent -mt-4 ">
                {/* --------title of the form------------ */}
                <label
                    className={`w-full h-max font-semibold label-text text-base-content text-center  text-2xl`}
                >
                    {t("regTitle")}
                </label>
                {/* --------------name Input--------------- */}
                <label
                    htmlFor=""
                    className={`w-full  text-md label-text text-base-content`}
                >
                    {t("name")}
                </label>
                <input
                    type="text"
                    name="name"
                    ref={nameRegRef}
                    value={nameReg}
                    onKeyDown={handleKeyDown}
                    onChange={(e) => setNameReg(e.target.value)}
                    placeholder={t("name")}
                    className={`text-center shadow-sm input bg-white input-bordered  w-full h-8 border-none outline-none py-5 px-3 text-slate-900 rounded-md`}
                />
                {/* -------------mobile or email inputs gonna render here------------- */}
                {i18n.language == "fa" ? (
                    <>
                    <label
                        htmlFor=""
                        className={`w-full text-right label-text text-base-content text-md`}
                    >
                        شماره همراه
                    </label>
                    <input
                        type="text"
                        name="mobile"
                        autoComplete="false"
                        ref={mobileRegRef}
                        value={mobileReg}
                        maxLength={11}
                        onKeyDown={handleKeyDown}
                        onSubmit={handleSubmit}
                        onChange={(e) => setMobileReg(e.target.value)}
                        placeholder="---- --- --09"
                        className={`text-center shadow-sm input bg-white input-bordered  w-full h-8  border-none outline-none py-5 px-3 text-slate-900 rounded-md`}
                    />
                    </>
                ) : (
                    <>
                    <label
                        htmlFor=""
                        className={`w-full  label-text text-base-content text-md`}
                    >
                        {t("email")}{" "}
                    </label>
                    <input
                        type="email"
                        name="email"
                        autoComplete="false"
                        ref={emailRegRef}
                        onKeyDown={handleKeyDown}
                        value={emailReg}
                        onChange={(e) => setEmailReg(e.target.value)}
                        placeholder={t("email")}
                        className={`text-center shadow-sm input  bg-white input-bordered  w-full h-8  border-none outline-none py-5 px-3 text-slate-900 rounded-md`}
                    />
                    </>
                )}
                {/* -------------password input---------------- */}
                <label
                    htmlFor=""
                    className={`w-full  label-text text-base-content  text-md`}
                >
                    {t("passwordOptional")}
                </label>
                <label className="shadow-sm input bg-white  input-bordered  relative outline-0 border-none w-full h-8 flex items-center  outline-none  text-slate-900 rounded-md py-5 px-3">
                    <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    ref={passeRegRef}
                    value={passwordReg}
                    onKeyDown={handleKeyDown}
                    onChange={(e) => setPasswordReg(e.target.value)}
                    placeholder={t("password")}
                    className={`text-center  w-full bg-transparent h-9 border-none outline-none  text-slate-900 rounded-md`}
                    />
                    <span
                    className={`  ${
                        i18n.language === "en" ? "right-[1rem]" : "left-[.1rem]"
                    } absolute h-full z-50 w-10  flex items-center cursor-pointer`}
                    onClick={togglePasswordVisibility}
                    >
                    <img
                        src="../../../../assets/imgs/eye.png"
                        className="w-5 "
                        alt=""
                    />
                    </span>
                </label>

                {/* ----------------err message place----------------------- */}
                <input
                    ref={messageRef}
                    type="text"
                    disabled
                    className={` ${
                    i18n.language === "en" ? "text-left" : "text-right"
                    } text-[.7em] text-orange-500 bg-transparent`}
                />
                {/* --------login or register ? choose one!------------- */}

                {/* --------submit button-------------------------- */}
                <button
                    type="submit"
                    disabled={buttonDisabled2}
                    onClick={handleSubmit}
                    ref={sendRef1}
                    className="font-normal btn hover:bg-blue-600   bg-[#4a00ff] w-full border-none outline-none   flex items-center justify-center   transition-all text-slate-200 rounded-md  -mt-6"
                >
                    {isSubmited ? (
                    <span className="loading loading-dots loading-md"></span>
                    ) : (
                    <>{t("register")}</>
                    )}
                </button>
                <div
                    className=" text-success flex w-full  cursor-pointer  text-sm"
                    onClick={regFlagStatus}
                >
                    <span
                    className={`text-succuss w-full ${
                        i18n.language === "en" ? "text-left" : "text-right"
                    } `}
                    >
                    {t("isLogin")}
                    </span>
                </div>
                </div>
            </div>
            ) : (
            <>
                <div className="flex justify-center items-center  lg:h-max  md:h-max flex-col h-full w-screen md:w-max lg:w-max shadow-xl bg-base-200 rounded-md   ">
                <div className="mt-6">
                    <img
                    onLoad={handleImageLoaded}
                    src={`${baseUrl}${logo}`}
                    className="logos w-14 mask mask-circle"
                    alt="dabirkhone-logo"
                    />
                </div>
                <div className="-mt-4 flex flex-col px-10 py-8  w-full h-full lg:w-[24rem] lg:h-max md:w-[24rem] md:h-max bg-base-200  rounded-md gap-5 ">
                    {/* --------title of the form------------ */}
                    <label
                    className={`w-full h-max font-semibold label-text text-base-content text-center ${
                        i18n.language === "ar" ? "text-xl" : ""
                    } text-2xl -mt-2`}
                    >
                    {t("login")}
                    </label>

                    {/* -------------mobile or email inputs gonna render here------------- */}
                    {i18n.language == "fa" ? (
                    <>
                        <label
                        htmlFor=""
                        className={`w-full text-right label-text text-base-content  text-md -mt-2`}
                        >
                        شماره همراه
                        </label>
                        <input
                        type="text"
                        name="mobile"
                        autoComplete="false"
                        // ref={mobileRef}
                        maxLength={11}
                        value={mobile}
                        onKeyDown={handleKeyDown}
                        onSubmit={handleSubmit}
                        onChange={(e) => setMobile(e.target.value)}
                        placeholder="---- --- --09"
                        className={`text-center shadow-sm input bg-white  input-bordered  w-full h-8  border-none outline-none py-5 px-3 text-slate-900 rounded-md`}
                        />
                        {passFlag === true ? (
                        <>
                            {/* -------------password input---------------- */}
                            <label
                            htmlFor=""
                            className={`w-full  label-text text-base-content  text-md`}
                            >
                            {t("password")}
                            </label>
                            <label className="shadow-sm input bg-white  input-bordered relative outline-0 border-none w-full h-8 flex items-center   outline-none  text-slate-900 rounded-md py-5 px-3">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={password}
                                onKeyDown={handleKeyDown}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder={t("password")}
                                className={`text-center  w-full bg-transparent h-9 border-none outline-none  text-slate-900 rounded-md`}
                            />
                            <span
                                className={`  ${
                                i18n.language === "en"
                                    ? "right-[1rem]"
                                    : "left-[.1rem]"
                                } absolute h-full z-50 w-10  flex items-center cursor-pointer`}
                                onClick={togglePasswordVisibility}
                            >
                                <img
                                src="../../../../assets/imgs/eye.png"
                                className="w-5 "
                                alt=""
                                />
                            </span>
                            </label>
                        </>
                        ) : (
                        <></>
                        )}
                    </>
                    ) : (
                    <>
                        <label
                        htmlFor=""
                        className={`w-full  label-text text-base-content  text-md`}
                        >
                        {t("email")}{" "}
                        </label>
                        <input
                        type="email"
                        name="email"
                        autoComplete="false"
                        // ref={emailRef}
                        onKeyDown={handleKeyDown}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={t("email")}
                        className={`text-center shadow-sm marker:input bg-white input-bordered    w-full h-8  border-none outline-none py-5 px-3 text-slate-900 rounded-md`}
                        />
                        {passFlag === true ? (
                        <>
                            {/* -------------password input---------------- */}
                            <label className="shadow-sm input   input-bordered relative outline-0 border-none w-full h-8 flex items-center bg-white  outline-none  text-slate-900 rounded-md py-5 px-3">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                ref={passeRef}
                                value={password}
                                onKeyDown={handleKeyDown}
                                onChange={handlePasswordChange2}
                                placeholder={t("password")}
                                className={` text-center   w-full bg-transparent h-9 border-none outline-none  text-slate-900 rounded-md`}
                            />
                            <span
                                className={`text-center  ${
                                i18n.language === "en"
                                    ? "right-[1rem]"
                                    : "left-[1rem]"
                                } absolute h-full z-50 w-10  flex items-center cursor-pointer`}
                                onClick={togglePasswordVisibility}
                            >
                                <img
                                src="../../../../assets/imgs/eye.png"
                                className="w-5 "
                                alt=""
                                />
                            </span>
                            </label>
                        </>
                        ) : (
                        <></>
                        )}
                    </>
                    )}
                    <div
                    className="flex w-full cursor-pointer  text-sm"
                    onClick={passFlagStatus}
                    >
                    <label
                        ref={otpStatusRef}
                        className={` cursor-pointer text-success w-full ${
                        i18n.language === "en" ? "text-left" : "text-right"
                        }`}
                    >
                        {passFlag !== true ? t("loginByPass") : t("logByOtp")}
                    </label>
                    </div>

                    {/* ----------------err message place----------------------- */}
                    <input
                    ref={messageRef1}
                    type="text"
                    disabled
                    className={` ${
                        i18n.language === "en" ? "text-left" : "text-right"
                    } text-[.7em] text-orange-500 bg-transparent`}
                    />

                    {/* --------submit button-------------------------- */}
                    <button
                    type="submit"
                    onClick={loginSubmit}
                    ref={sendRef}
                    disabled={buttonDisabled}
                    className="font-normal -mt-10 btn hover:bg-blue-600   bg-[#4a00ff] w-full border-none outline-none   flex items-center justify-center  0 transition-all text-slate-200 rounded-md "
                    >
                    {isSubmited ? (
                        <span className="loading loading-dots loading-md"></span>
                    ) : (
                        <>{passFlag ? t("send") : t("sendOtp")}</>
                    )}
                    </button>

                    {/* --------login or register ? choose one!------------- */}
                    <div
                    className="w-full  text-sm cursor-pointer text-success"
                    onClick={regFlagStatus}
                    >
                    <span
                        className={` w-full ${
                        i18n.language === "en" ? "text-left" : "text-right"
                        }`}
                    >
                        {t("isReg")}
                    </span>
                    </div>
                </div>
                </div>
            </>
            )}
        </div>
        )
        }
    </>
  );
}

export default RegisterForm;
