// Example component structure for a 4-digit OTP
import React, { useState, useEffect, useRef, useContext } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { logByEmailAndOTP, logByMobileAndOTP, regByEmail, regByMobile, verifyUser, verifyUserFa, verifyUserAr, logByEmailAndOTPAr } from "../../core/api/servises/register";
// import { logByEmailAndOTP, logByMobileAndOTP, verifyUser } from "../../core/api/servises/register";
// import { logByEmailAndOTP, logByMobileAndOTP, regByEmail, regByMobile, verifyUser } from "../../core/api/servises/register";
import { AuthContext } from "../../gard/context/AuthContext";
import i18n from 'i18next';
import Cookies from "js-cookie";
import { ThreeDots } from 'react-loader-spinner';
import { getPublicInfo } from "../../core/api/servises/lists";

const OTPInputs = ({ mobile, setMobile }) => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const { timeLefts, timeLeft, userToken, userData, isLoggedIn, loginContext, UniqueKeyContext } = useContext(AuthContext);
    const { t } = useTranslation();
    const sendRef = useRef(null);
    const sendRef2 = useRef(null);

    const [counter, setCounter] = useState(timeLeft);

    const [otp, setOtp] = useState("");

    const otpRef = useRef(null);
    const [counterStatus, setCounterStatus] = useState(false);

    const [buttonColor, setButtonColor] = useState('#4a00ff');
    // const [buttonColor2, setButtonColor2] = useState('rgba(211, 41, 41,.9)');


    const [publicInfo, setPublicInfo] = useState();
    const [baseUrl, setBaseUrl] = useState();
    const [text, setText] = useState();
    const [projectName, setProjectName] = useState();
    const [logo, setLogo] = useState();

    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [buttonDisabled2, setButtonDisabled2] = useState(false);
    const [isSubmited2,setIsSubmited2]= useState(false);


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

    useEffect(() => {
        const timer =
            counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
        return () => clearInterval(timer);
    }, [counter]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setButtonColor('#4a00ff'); // Reset the button color back to the default after 1 second
        }, 2000);
        return () => clearTimeout(timer);
    }, [buttonColor]);

    useEffect(() => {
        getPublic();
    }, []);


    const regMobile = window.localStorage.getItem('regMobile');
    const regEmail = window.localStorage.getItem('regEmail');


    const logFaFlag = window.localStorage.getItem('logFaFlag');
    const logEnFlag = window.localStorage.getItem('logEnFlag');
    const logArFlag = window.localStorage.getItem('logArFlag');

    const handleReSubmit = async (event) => {
        event.preventDefault();

        setIsSubmited2(true)
        setButtonDisabled2(true);
        if (logFaFlag == "true") {
            const createResult = await logByMobileAndOTP({
                mobile: regMobile,
            })
                .then(function (response) {
                    // console.log("data result", response);
                    if (response.status) {
                        sendRef2.current.style.backgroundColor = "rgba(145,199,20,.9)";
                        setTimeout(() => {
                            setIsSubmited2(false)
                            setButtonDisabled2(false);
                            sendRef2.current.style.backgroundColor = "rgba(211, 41, 41,.9)";
                        }, 2000); // Reset the button color back to the default after 1 second
                        setCounter(response?.data?.time_left);
                        timeLefts(response?.data?.time_left);
                        UniqueKeyContext(response?.data?.unique_key)
                        toast.success(response?.status?.message)
                        setButtonDisabled2(false);

                    } else {
                        toast.error(response.status.message);
                        sendRef2.current.style.backgroundColor = "rgba(211, 41, 41,.9)";
                        setTimeout(() => {
                            setIsSubmited2(false)
                        setButtonDisabled2(false);
                        }, 2000);
                    }
                })
                .catch(function (error) {
                    // toast.error(error.message);
                    // sendRef.current.style.backgroundColor = "rgba(211, 41, 41,.9)";
                    sendRef2.current.style.backgroundColor = "rgba(211, 41, 41,.9)";
                        setTimeout(() => {
                            setIsSubmited2(false)
                        setButtonDisabled2(false);
                        }, 2000);
                });
            return createResult;
        }
        if (logEnFlag == "true") {
            const createResult = await logByEmailAndOTP({
                email: regEmail,
            })
                .then(function (response) {
                    // console.log("data result", response);
                    if (response.status) {
                        sendRef2.current.style.backgroundColor = "rgba(145,199,20,.9)";
                        setTimeout(() => {
                            setIsSubmited2(false)
                            setButtonDisabled2(false);
                            sendRef2.current.style.backgroundColor = "rgba(211, 41, 41,.9)";
                        }, 2000); // Reset the button color back to the default after 1 second
                        setCounter(response?.data?.time_left);
                        timeLefts(response?.data?.time_left);
                        UniqueKeyContext(response?.data?.unique_key)
                        toast.success(response?.status?.message)
                        setButtonDisabled2(false);
                    } else {
                        toast.error(response.status.message);
                        sendRef2.current.style.backgroundColor = "rgba(211, 41, 41,.9)";
                        setTimeout(() => {
                            setIsSubmited2(false)
                        setButtonDisabled2(false);

                        sendRef2.current.style.backgroundColor = "rgba(211, 41, 41,.9)";

                        }, 2000);
                    }
                    // console.log(response);
                })
                .catch(function (error) {
                    toast.error(error.response.data.status.message);
                    sendRef2.current.style.backgroundColor = "rgba(211, 41, 41,.9)";
                    setTimeout(() => {
                        setIsSubmited2(false)
                        setButtonDisabled2(false);

                        sendRef2.current.style.backgroundColor = "rgb(74, 0, 255)";
                    }, 2000);
                });
            return createResult;
        }
        if (logArFlag == "true") {
            const createResult = await logByEmailAndOTPAr({
                email: regEmail,
            })
                .then(function (response) {
                    // console.log("data result", response);
                    if (response.status) {
                        sendRef2.current.style.backgroundColor = "rgba(145,199,20,.9)";
                        setTimeout(() => {
                            setIsSubmited2(false)
                            setButtonDisabled2(false);
                            sendRef2.current.style.backgroundColor = "rgba(211, 41, 41,.9)";
                        }, 2000);  // Reset the button color back to the default after 1 second
                        setCounter(response?.data?.time_left);
                        timeLefts(response?.data?.time_left);
                        UniqueKeyContext(response?.data?.unique_key)
                        toast.success(response?.status?.message)
                        setButtonDisabled2(false);
                    } else {
                        toast.error(response.status.message);
                        sendRef2.current.style.backgroundColor = "rgba(211, 41, 41,.9)";
                        setTimeout(() => {
                            setIsSubmited2(false)
                            setButtonDisabled2(false);
                            sendRef2.current.style.backgroundColor = "rgba(211, 41, 41,.9)";
                        }, 2000);
                    }
                    // console.log(response);
                })
                .catch(function (error) {
                    toast.error(error.response.data.status.message);
                    sendRef2.current.style.backgroundColor = "rgba(211, 41, 41,.9)";
                    setTimeout(() => {
                        setIsSubmited2(false)
                        setButtonDisabled2(false);
                        sendRef2.current.style.backgroundColor = "rgba(211, 41, 41,.9)";
                    }, 2000);
                });
            return createResult;
        }
    }

    const unique_key = localStorage.getItem('unique_key');

    // console.log('ereeeee',counter);

    const formatTime = () => {
        const minutes = Math.floor(counter / 60);
        const seconds = counter % 60;
        return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    };

    const handleChange = (element, index) => {
        if (isNaN(element.value)) return false;
        setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);
        if (element.nextSibling) {
            element.nextSibling.focus();
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            verifyOTP(e);
        }
    };

    const verifyOTP = async (e) => {
        // e.preventDefault();
        // const ourToken =userToken;
        const ourToken = `Bearer ${userToken}`;

        const strOtpJoin = otp;
        if (i18n.language === 'fa') {
            const createResult = await verifyUserFa({
                unique_key: unique_key,
                code: strOtpJoin,
            }, ourToken)
                .then(function (response) {
                   

                    if (response.status.code) {
                        // Reset the button color back to the default after 1 second
                        setIsSubmited(false)
                        userData(
                            response?.data?.user?.name,
                            response?.data?.user?.eamil,
                            response?.data?.user?.level,
                            response?.data?.user?.lang,
                            response?.data?.user?.status,
                            response?.data?.user?.mobile,
                        );

                        loginContext(response?.data?.access_token);
                        window.localStorage.setItem("validation", true);
                        sendRef.current.style.backgroundColor = 'rgba(145,199,20,.9)';
                        // sendRef.current.style.backgroundColor = "rgb(74, 0, 255)";
                        setTimeout(() => {
                            setIsSubmited(false)
                        }, 1000);
                        localStorage.setItem("_token", response?.data?.access_token)

                        navigate("/app/dashboard");
                        // navigate("/app/dashboard");
                    } else {
                        if (response?.success == false) {
                            toast(
                                `${response?.data?.unique_key != undefined ? response?.data?.unique_key
                                    : ""
                                }\n
                ${response?.data?.code != undefined ? response?.data?.code : ""}`,
                                {
                                    duration: 2000,
                                }
                            );
                            setTimeout(() => {
                                sendRef.current.style.backgroundColor = "red";
                            }, 2000);
                        }
                        toast.error(response.status.message);
                        sendRef.current.style.backgroundColor = "rgba(211, 41, 41,.9)";
                        setTimeout(() => {
                            setIsSubmited(false)
                            sendRef.current.style.backgroundColor = "rgb(74, 0, 255)";
                        }, 2000);
                    }
                })
                .catch(function (error) {
                    toast.error(error.response.data.status.message);
                    sendRef.current.style.backgroundColor = "rgba(211, 41, 41,.9)";
                    setTimeout(() => {
                        setIsSubmited(false)
                        sendRef.current.style.backgroundColor = "rgb(74, 0, 255)";
                    }, 2000);
                    // console.log("error :", error);
                });

            return createResult;

        } else if (i18n.language === 'en') {
            const createResult = await verifyUser({
                unique_key: unique_key,
                code: strOtpJoin,
            }, ourToken)
                .then(function (response) {
                   
                    if (response.status.code) {
                      
                        setIsSubmited(false)
                        userData(
                            response?.data?.user?.name,
                            response?.data?.user?.eamil,
                            response?.data?.user?.level,
                            response?.data?.user?.lang,
                            response?.data?.user?.status,
                            response?.data?.user?.mobile,
                        );
                       
                        loginContext(response?.data?.access_token);
                        window.localStorage.setItem("validation", true);
                        localStorage.setItem("_token", response?.data?.access_token)
                        navigate("/app/dashboard");
                       
                    } else {
                        if (response?.success == false) {
                            toast(
                                `${response?.data?.unique_key != undefined ? response?.data?.unique_key
                                    : ""
                                }\n
                ${response?.data?.code != undefined ? response?.data?.code : ""}`,
                                {
                                    duration: 2000,
                                }
                            );
                            setTimeout(() => {
                                sendRef.current.style.backgroundColor = "red";
                            }, 2000);
                        }
                        sendRef.current.style.backgroundColor = "rgba(211, 41, 41,.9)";
                        setTimeout(() => {
                            setIsSubmited(false)
                            sendRef.current.style.backgroundColor = "rgb(74, 0, 255)";
                        }, 2000);
                        toast.error(response.status.message);
                    }
                })
                .catch(function (error) {
                    toast.error(error.response.data.status.message);
                    sendRef.current.style.backgroundColor = "rgba(211, 41, 41,.9)";
                    setTimeout(() => {
                        setIsSubmited(false)
                        sendRef.current.style.backgroundColor = "rgb(74, 0, 255)";
                    }, 2000);
                });

            return createResult;

        } else {
            const createResult = await verifyUserAr({
                unique_key: unique_key,
                code: strOtpJoin,
            }, ourToken)
                .then(function (response) {

                    if (response.status.code) {
                     
                        setIsSubmited(false)
                        userData(
                            response?.data?.user?.name,
                            response?.data?.user?.eamil,
                            response?.data?.user?.level,
                            response?.data?.user?.lang,
                            response?.data?.user?.status,
                            response?.data?.user?.mobile,
                        );
                        sendRef.current.style.backgroundColor = 'rgba(145,199,20,.9)';
                        window.localStorage.setItem("validation", true);
                        setIsSubmited(true);
                        setTimeout(() => {
                            setIsSubmited(false)
                            sendRef.current.style.backgroundColor = "rgb(74, 0, 255)";
                        }, 2000);

                        setTimeout(() => {
                            navigate("/app/dashboard");
                        }, 3000)
                       
                        loginContext(response?.data?.access_token);
                    
                        localStorage.setItem("_token", response?.data?.access_token)

                    } else {
                        if (response?.success == false) {
                            toast(
                                `${response?.data?.unique_key != undefined ? response?.data?.unique_key
                                    : ""
                                }\n
                ${response?.data?.code != undefined ? response?.data?.code : ""}`,
                                {
                                    duration: 2000,
                                }
                            );
                            sendRef.current.style.backgroundColor = "rgba(211, 41, 41,.9)";
                            setTimeout(() => {
                                setIsSubmited(false)
                                sendRef.current.style.backgroundColor = "rgb(74, 0, 255)";
                            }, 2000);
                        }
                        toast.error(response.status.message);
                    }
                    // console.log(response);
                })
                .catch(function (error) {
                    toast.error(error.response.data.status.message);
                    sendRef.current.style.backgroundColor = "rgba(211, 41, 41,.9)";
                    setTimeout(() => {
                        setIsSubmited(false)
                        sendRef.current.style.backgroundColor = "rgb(74, 0, 255)";
                    }, 2000);
                });

            return createResult;
        }

    };

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);



    const [verificationStatus, setVerificationStatus] = useState('Not Verified');
    const [verificationInProgress, setVerificationInProgress] = useState(false);

    const [isSubmited, setIsSubmited] = useState(false)
    useEffect(() => {
        if (otp.length === 5) {
            // Simulate API call to verify OTP
            setIsSubmited(true)
            setTimeout(() => {
                verifyOTP();
            }, 300);
        }
    }, [otp]);
   
    const handleOTPChange = event => {
        const inputOTP = event.target.value;
        if (inputOTP.length <= 5) {
            setOtp(inputOTP);
        }
    };

    const handleVerifyOTP = () => {
        if (otp.length === 5) {
            setIsSubmited('true');
           
            setTimeout(() => {
                verifyOTP();
            }, 1000)
            setVerificationInProgress(true);
        }
    };

    return (
        <>
            
            <div className={`${(i18n.language === "en") ? "text-left" : "text-right"} flex flex-col justify-center items-center w-full h-screen`}>
                <form onSubmit={verifyOTP} className="py-6 px-9 w-full shadow-xl h-screen  flex flex-col justify-center items-center  lg:w-[24rem] lg:h-max md:w-[24rem] md:h-max bg-base-200 rounded-md gap-5">
                    <div className=' '><img src={`${baseUrl}${logo}`} className="w-14 mask mask-circle" alt="dabirkhone-logo" /></div>
                    <label className={`w-full h-max font-semibold text-gray-400 text-center  text-xl`}>{t('verifyOTP')}</label>
                    <div className="flex gap-2 w-full ">
                        <input
                            type="text"
                            name="otp"
                            className="w-full  bg-white text-gray-900 text-center input input-bordered text-lg"
                            value={otp}
                            // onChange={(e) => setOtp(e.target.value)}
                            onChange={handleOTPChange}
                            onFocus={(e) => e.target.select()}
                            onKeyDown={handleKeyDown}
                        />
                    </div>
                    {counter > 0 ? (
                        <>
                            <div className="flex gap-2 w-full">
                                <button
                                    ref={sendRef}
                                    type="submit"
                                    onClick={handleVerifyOTP}
                                    onMouseOut={() => sendRef.current.style.backgroundColor = buttonColor}
                                    onMouseOver={() => sendRef.current.style.backgroundColor = "#1D5D9B"}
                                    style={{ backgroundColor: buttonColor }}
                                    className={`font-normal btn btn-primary border-none outline-none flex justify-center items-center w-[67%]   transition-all  text-slate-200 `}
                                >

                                    {isSubmited ? (
                                        <span className="loading loading-dots loading-md"></span>
                                    ) : (
                                        <>{t("verifyOTP")}</>
                                    )}
                                </button>
                                <button
                                    // ref={sendRef}
                                    onClick={() => {
                                        setOtp("")
                                        setIsSubmited(false)
                                    }
                                    }
                                    type="button"
                                    className={`font-normal w-[30%] hover:bg-red-600 btn bg-red-500 border-none outline-none  transition-all  text-slate-200 rounded-md`}
                                >
                                    {t('clear')}
                                </button>
                            </div>
                            <p className={`w-full text-center  text-sm text-orange-500`}>
                                {t('reVerify')}  {formatTime()}
                            </p>
                        </>
                    ) : (
                        <button
                            ref={sendRef2}
                            type="submit"
                            onClick={handleReSubmit}
                            disabled={buttonDisabled2}
                            className={`font-normal w-full h-12 bg-orange-700 border-none outline-none  transition-all  focus:bg-green-600  text-slate-200 rounded-md`}
                        >
                             {isSubmited2 ? (
                                        <span className="loading loading-dots loading-md"></span>
                                    ) : (
                                        <> {t('resend')}</>
                                    )}
                        </button>
                    )}
                </form>
            </div>
        </>

    );
};

export default OTPInputs;