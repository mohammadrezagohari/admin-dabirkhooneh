import {useState, useRef,useContext} from 'react'
import { useTranslation } from 'react-i18next'
import { completeUserInfo } from '../../../core/api/servises/register';
import { toast } from "react-hot-toast";
import { AuthContext } from '../../../gard/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import i18n from 'i18next';

function CompleteUserInfo(){
    const navigate = useNavigate();
    const { userToken } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);

    const {t}=useTranslation()
    const  otpRef = useRef(null);
    const  sendRef = useRef(null);
    const  errRef=useRef(null);
    const  [name,setName]=useState('');
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const createResult = await completeUserInfo(
          {
            name:name,
          },
           userToken)
          .then(function (response) {
            // console.log('data result', response)
            if (response.status) {
              navigate("/app/welcome");
            } else {
              if (response?.success == false) {
                toast(
                  `${response?.data?.name != undefined ? response?.data?.name : ""}`,
                  {
                    duration: 2000,
                  },
                );
                setTimeout(()=>{
                    sendRef.current.style.backgroundColor ="red";
                },2000);
              }
              toast.error("خطایی رخ داده است");
            }
            // console.log(response);
          })
          .catch(function (error) {
            toast.error("خطا !! مجددا تلاش نمایید");
            console.log("error :", error);
          });
    
        return createResult;
      };

      const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
          handleSubmit(e);
        }
      };
      
    return(
        <> 
            <div className=' bg-gray-800 flex justify-center items-center w-[27rem] h-max p-5 rounded-md'>
                <div method='post'  className="flex flex-col p-5 w-full h-full gap-5">
                    <label htmlFor="" className={`w-full text-center  ${i18n.language === "en" ? 'text-left' : 'text-right'} text-slate-200 font-yekanReg text-lg`}>{t('enterName')}</label>
                    <input 
                    type="text" 
                    onKeyDown={handleKeyDown}
                    onChange={e=>setName(e.target.value)}
                    placeholder={t('name')} 
                    className={`w-full h-12 bg-slate-200 border-none outline-none  ${i18n.language === "en" ? 'text-left' : 'text-right'} p-5 text-slate-900 rounded-md`}
                    />
                    <button type="submit" onClick={handleSubmit} ref={sendRef} className="w-full h-12 bg-primary text-slate-200 rounded-md font-yekanReg" >{t("save")}</button>
                </div>
            </div>
        </>
    );
}

export default CompleteUserInfo;