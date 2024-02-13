
import { useEffect,useContext ,useRef} from "react";
import { useDispatch } from "react-redux";
// import { setPageTitle } from '../../features/common/headerSlice'
// import Transactions from '../../features/transactions'
// import ArtList from '../../features/general/art-list'
import { setPageTitle } from "../../../features/common/headerSlice";
import { useState } from "react";
// import CategoryList from '../../features/general/general-gategory-list'
import i18n from "../../../i18n";
import { useTranslation } from "react-i18next";
import { AuthContext } from "../../../gard/context/AuthContext";
import { logOutUser, updateProfile } from "../../../core/api/servises/register";
import { toast } from "react-hot-toast";
import { ThreeDots } from 'react-loader-spinner';


function ProfileSettings() {

    const [loading, setLoading] = useState(true);

  const {setNameContext,userToken,userData, nameContext,emailContext,mobileContext,lang,level,statusContext,logout,updateName} = useContext(AuthContext);
  const passAlert = useRef();
  const mobileAlert = useRef();
  const emailAlert = useRef();
  const levelAlert = useRef();

  const [buttonColor, setButtonColor] = useState('#4a00ff');
  
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [name,setName]= useState();
  const [email,setEmail]= useState();
  const [mobile,setMobile]= useState();
  const [password,setPassword]= useState();
  // const [status,setStatus]= useState();
  const [currentTheme, setCurrentTheme] = useState(localStorage.getItem("theme"))
   const updateBtnRef =useRef();
  const defaultName= window.localStorage.getItem("name");
  const defaultEamil= window.localStorage.getItem("email");
  const defaultRegEamil= window.localStorage.getItem("regEmail");
  const defaultMobileReg= window.localStorage.getItem("mobileReg");
  const defaultMobile= window.localStorage.getItem("mobile");
  const regFlags= window.localStorage.getItem("regFlag");
  const defaultLevel= window.localStorage.getItem("level");


  let levelLabel= '';
  switch (defaultLevel) {
    case "5":
      levelLabel=t('secretary');
      break;
      case "2":
        levelLabel=t('assistant');
        break;
      case "3":
        levelLabel=t('juror')
        break;
      case "1":
          levelLabel=t('participant')
          break;
    default:
      levelLabel=t('people')
      break;
  }

  
  const loggedOut = async () => {
    const ourToken =`Bearer ${userToken}`;    
    const createResult = await logOutUser(ourToken)
      .then(function (response) {
        if (response.status) {
            // logout();
            // navigate("/login");
            // console.log(response?.status);
        } else{
            if (response?.success == false) {
                // console.log(response);
            }
        }
    })
    .catch(function (error) {
    // console.log("error :", error);
    });
    return createResult;
    }


    function logoutUser(){
      localStorage.clear();
      loggedOut();
      window.location.href = '/'
      
  }
  const [isSubmited,setIsSubmited] = useState(false) ;
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    passAlert.current.textContent = t('updatePassAlert'); 
};
const togglePasswordVisibility = () => {
  setShowPassword(!showPassword);
};
const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
        handleSubmit(e);
    }
};
  useEffect(() => {
    dispatch(setPageTitle({ title: t('profile') }));
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setButtonColor('#4a00ff'); // Reset the button color back to the default after 1 second
    }, 1000);
    return () => clearTimeout(timer);
  }, [buttonColor]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(name ==  null || name == '' || name == undefined){
      updateBtnRef.current.style.backgroundColor= 'rgba(145,199,20,.9)'
      setTimeout(()=>{
        setIsSubmited(false);
        updateBtnRef.current.style.backgroundColor= '#4a00ff'
      },1000)
      toast.success(t('updateInfoMsg'))
    }
    else{
      const createResult = await updateProfile({
        name,
        password,
       },userToken)
        .then(function (response) {
          // console.log("data result", response);
          if (response.status) {
  
            updateBtnRef.current.style.backgroundColor= 'rgba(145,199,20,.9)'
            setTimeout(()=>{
              setIsSubmited(false);
              updateBtnRef.current.style.backgroundColor= '#4a00ff'
            },1000)
            setIsSubmited(true);
            
            if(name ==  null || name == '' || name == undefined){
              setName(nameContext);
            }else{
              updateName(name);
            }
            
            // window.localStorage.setItem("name",name);
         
            toast.success(response.status.message)
            // console.log("token validity",response.data.token_validity);
            let token_validity = response.data.token_validity;
            if (token_validity === 0){
              setTimeout(()=>{
                toast.success(t('autoLogout'))
                setTimeout(()=>{
                  logoutUser();
                },3000)
              },3000)
            }
          } else {
           if (response?.success == false) {
            
                  setButtonColor('red'); // Reset the button color back to the default after 1 second
              
            // console.log("res",response);
            toast.error(response.status.message)
  
          }}
            // console.log(response);
          })
          .catch(function (error) {
            toast.error(error.message)
            // console.log("error :", error);
          });
          return createResult;
    }
 }




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
    
    <div className="flex flex-col items-center justify-center">
    <header className="w-full h-[11rem] bg-blue-600 rounded-lg flex flex-col gap-2 items-center  text-blue-300 ">
        <div className="w-[6rem] rounded-full mt-3 ">
            <img className='w-full ' src="/assets/imgs/users.png" alt="profile" />
        </div>
        <label className="mx-2 text-slate-100 text-xl">{defaultName}</label>
    </header>
    <form className={`grid p-8 grid-cols-1 lg:grid-cols-2 md:grid-cols-2  w-[90%] rounded-lg gap-5 $`} onSubmit={handleSubmit}>
      <div className="w-full flex flex-col justify-start  gap-2 md:justify-start lg:justify-start ">
        <label className="mx-2 w-full">{t('name')} </label>
          <input
                onKeyDown={handleKeyDown}
                type="text"
                name="name"
                value={name}
                defaultValue={defaultName}
                onChange={(e)=> setName(e.target.value) }
                placeholder={t('name')}  
                minLength={3}
                className="input text-center text-slate-800 bg-white input-bordered w-full  "
            />
      </div>
      <div className="w-full flex flex-col justify-start gap-2  md:justify-start lg:justify-start ">
        <label className="mx-2 ">{t('password')} </label>
          <label className=" input bg-white  input-bordered  relative  w-full   flex items-center  outline-none  text-slate-900 rounded-md py-5 px-3">
          <input
          type={showPassword ? 'text' : 'password'}
          name="password"
          value={password}
          onKeyDown={handleKeyDown}
          onChange={handlePasswordChange}
        placeholder={t('password')}
        className={`text-center input ${i18n.language == 'fa' ? "font-yekanReg" : "font-yekanRegEn"} w-full bg-transparent  border-none outline-none  text-slate-900 rounded-md`}
        />
        <span className={`  ${(i18n.language === "en") ? "right-[.5rem]" : "left-[.5rem]"} absolute h-full  w-10  flex items-center cursor-pointer`} onClick={togglePasswordVisibility}><img src="../../../../assets/imgs/eye.png" className='w-5  ' alt="" /></span>
      </label>
         <label ref={passAlert} className="text-[.7em] text-orange-500"></label> 

      </div>
      {(i18n.language === "fa")?(
        //  <div className=" flex  cols-span-2 md:cols-span-1 lg:cols-span-1 justify-center md:justify-start lg:justify-start  gap-x-5">
        //   <span>{t('mobile')}:</span><span className={'text-xl'}>{defaultMobile}</span>
        // </div>
        <div className="w-full  flex flex-col justify-start gap-2  md:justify-start lg:justify-start ">
            <label className="mx-2 ">{t('mobile')} </label>
            <input
            type="text"
            name=""
            placeholder={defaultMobileReg ? defaultMobileReg : defaultMobile }
            value={defaultMobileReg ? defaultMobileReg : defaultMobile }
            onChange={()=> mobileAlert.current.textContent=t('mobilePolicy')}
            className="text-center input bg-white input-bordered w-full "
            contentEditable="false"
        />
        <label ref={mobileAlert} className="text-[.7em] text-orange-500"></label> 

       </div>
      ):(
        <div className="w-full flex flex-col justify-start gap-2  md:justify-start lg:justify-start ">
        <label className="mx-2 ">{t('email')} </label>
        <input
        type="text"
        name=""
        placeholder={(defaultRegEamil) ?  defaultRegEamil : defaultEamil }
        value={(defaultRegEamil) ?  defaultRegEamil : defaultEamil }
        onChange={()=> emailAlert.current.textContent=t('mobilePolicy')}
        className="input text-center bg-white text-slate-800 input-bordered w-full"
        contentEditable="false"
    />
   <label ref={emailAlert} className="text-[.7em] text-orange-500"></label> 

   </div>
      )}
       
       <div className="w-full flex flex-col justify-start gap-2  md:justify-start lg:justify-start ">
        <label className="mx-2 ">{t('level')} </label>
        <input
            type="text"
            name=""
            value={levelLabel}
            placeholder={levelLabel}
            className="input text-center bg-white text-slate-800 input-bordered w-full "
            contentEditable="false"
            onChange={()=> levelAlert.current.textContent=t('levelPolicy')}
        />
        <label ref={levelAlert} className="text-[.7em] text-orange-500"></label> 

        </div>
        {/* <div className="w-full"></div> */}
        <div className=" flex flex-col w-full  justify-center md:justify-start lg:justify-start ">
          <button ref={updateBtnRef}   onClick={()=>setIsSubmited(true)} className={`hover:bg-blue-600  btn bg-[#4a00ff] min-w-[14rem] border-none outline-none text-white  w-full  transition-all`}>
          {isSubmited ? ( 
            <span className="loading loading-dots loading-md"></span> 
             ) : ( 
            <> {t('update')}</> 
           )}  
          </button>
        </div>
    </form>
    </div>)}
    </>
  );
}

export default ProfileSettings;