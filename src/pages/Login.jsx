import {useState, useRef} from 'react'
import {Link} from 'react-router-dom'
import Login from '../features/user/Login'
import { useTranslation } from 'react-i18next'
import i18n from '../i18n'
// import PersianForm from '../components/Register/registerForm'
import RegisterForm from '../components/Register/registerForm'
import OTPInputs from '../components/OTP/otp'
import ChangeLanguageDropDown from '../components/DropDowns/ChangeLanguageDropDown'
import MoonIcon from '@heroicons/react/24/outline/MoonIcon'
import SunIcon from '@heroicons/react/24/outline/SunIcon'
import { themeChange } from 'theme-change'
import { useEffect } from 'react'


function ExternalPage(){
    const {t}=useTranslation()
    const [lang,setlang]= useState('en');
    const [currentTheme, setCurrentTheme] = useState(localStorage.getItem("theme"))

    const changeLanguage = (event) => {
        i18n.changeLanguage(event.target.value)
        setlang(event.target.value);
        // console.log("i18n ::::", i18n.language);
    }

    useEffect(() => {
        themeChange(false)
        if(currentTheme === null){
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ) {
                setCurrentTheme("dark")
            }else{
                setCurrentTheme("light")
            }
        }
        // 👆 false parameter is required for react project
      }, [])

    return(
        <div className="!h-screen flex flex-col items-center px-8 pb-8 mb-4 overflow-hidden">
                <nav className='w-full flex justify-end lg:px-10 md:px-10  p-2  bg-base-20 md:bg-transparent lg:bg-transparent'>
                    {/* <label className="swap w-12 h-10 rounded-full btn btn-ghost">
                        <input type="checkbox"/>
                        <SunIcon data-set-theme="light" data-act-class="ACTIVECLASS" className={"fill-current w-6 h-6 "+(currentTheme === "dark" ? "swap-on" : "swap-off")}/>
                        <MoonIcon data-set-theme="dark" data-act-class="ACTIVECLASS" className={"fill-current w-6 h-6 "+(currentTheme === "light" ? "swap-on" : "swap-off")} />
                    </label> */}
                    <div className='mt-2'>
                        <ChangeLanguageDropDown/>
                    </div>
                </nav>
              {/* <RegisterForm changeLanguage={changeLanguage}/> */}
              <Login/>
        </div>
    )
}

export default ExternalPage