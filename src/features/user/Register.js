import {Link} from 'react-router-dom'
import LandingIntro from './LandingIntro'
import ErrorText from  '../../components/Typography/ErrorText'
import InputText from '../../components/Input/InputText'
import ChangeLanguageDropDown from '../../components/DropDowns/ChangeLanguageDropDown'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import i18n from '../../i18n'
import { themeChange } from 'theme-change'
import React, {  useContext, useEffect, useState,useRef } from 'react'
import SunIcon from '@heroicons/react/24/outline/SunIcon'
import MoonIcon from '@heroicons/react/24/outline/MoonIcon'
function Register(){
    const [regFlag, setRegFlag] = useState(false);
    const [passFlag, setPassFlag] = useState(false);
    const INITIAL_REGISTER_OBJ = {
        name : "",
        password : "",
        emailId : "",
        mobile:"",
    }
    const {t}=useTranslation()
    const dispatch = useDispatch()
    const {noOfNotifications, pageTitle} = useSelector(state => state.header)
    const [currentTheme, setCurrentTheme] = useState(localStorage.getItem("theme"))

    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [registerObj, setRegisterObj] = useState(INITIAL_REGISTER_OBJ)

    const submitForm = (e) =>{
        e.preventDefault()
        setErrorMessage("")
        if(registerObj.name.trim() === "")return setErrorMessage("Name is required! (use any value)")
        if(registerObj.emailId.trim() === "")return setErrorMessage("Email Id is required! (use any value)")
        if(registerObj.password.trim() === "")return setErrorMessage("Password is required! (use any value)")
        if(i18n.language === 'fa'){
            if(registerObj.mobile.trim() === "")return setErrorMessage("Mobile is required! (use any value)")
        }
        else{
            setLoading(true)
            // Call API to check user credentials and save token in localstorage
            localStorage.setItem("token", "DumyTokenHere")
            setLoading(false)
            window.location.href = '/app/welcome'
        }
    }

    const updateFormValue = ({updateType, value}) => {
        setErrorMessage("")
        setRegisterObj({...registerObj, [updateType] : value})
    }
        //console.log(registerObj);
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
        <>
       {regFlag == true ?(
        <>
            <header className='flex justify-end px-4 bg-base-200'>
                <ChangeLanguageDropDown/>
                <label className="swap w-12 h-10 rounded-full btn btn-ghost">
                <input type="checkbox"/>
                <SunIcon data-set-theme="light" data-act-class="ACTIVECLASS" className={"fill-current w-6 h-6 "+(currentTheme === "dark" ? "swap-on" : "swap-off")}/>
                <MoonIcon data-set-theme="dark" data-act-class="ACTIVECLASS" className={"fill-current w-6 h-6 "+(currentTheme === "light" ? "swap-on" : "swap-off")} />
            </label>
            </header>
            <div className="min-h-screen bg-base-200 flex items-center">
            <div className="card mx-auto w-full max-w-5xl  shadow-xl">
                <div className="grid  md:grid-cols-2 grid-cols-1  bg-base-100 rounded-xl">
                <div className=''>
                        <LandingIntro />
                </div>
                <div className='py-24 px-10'>
                    <h2 className='text-2xl font-semibold mb-2 text-center'>Register</h2>
                    <form onSubmit={(e) => submitForm(e)}>

                        <div className="mb-4">

                            <InputText defaultValue={registerObj.name} updateType="name" containerStyle="mt-4" labelTitle="Name" updateFormValue={updateFormValue} />

                            <InputText defaultValue={registerObj.emailId} updateType="emailId" containerStyle="mt-4" labelTitle="Email Id" updateFormValue={updateFormValue}/>

                            <InputText defaultValue={registerObj.password} type="password" updateType="password" containerStyle="mt-4" labelTitle="Password" updateFormValue={updateFormValue}/>

                        </div>

                        <ErrorText styleClass="mt-8">{errorMessage}</ErrorText>
                        <button type="submit" className={"btn mt-2 w-full btn-primary" + (loading ? " loading" : "")}>Register</button>

                        <div className='text-center mt-4' onClick={()=>setRegFlag(false)}>Already have an account? <span className="  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">Login</span></div>
                    </form>
                </div>
            </div>
            </div>
        </div>
        </>
       ):(
        <>
        <header className='flex justify-end px-4 bg-base-200'>
            <ChangeLanguageDropDown/>
            <label className="swap w-12 h-10 rounded-full btn btn-ghost">
            <input type="checkbox"/>
            <SunIcon data-set-theme="light" data-act-class="ACTIVECLASS" className={"fill-current w-6 h-6 "+(currentTheme === "dark" ? "swap-on" : "swap-off")}/>
            <MoonIcon data-set-theme="dark" data-act-class="ACTIVECLASS" className={"fill-current w-6 h-6 "+(currentTheme === "light" ? "swap-on" : "swap-off")} />
        </label>
        </header>
        <div className="min-h-screen bg-base-200 flex items-center">
        <div className="card mx-auto w-full max-w-5xl  shadow-xl">
            <div className="grid  md:grid-cols-2 grid-cols-1  bg-base-100 rounded-xl">
            <div className=''>
                    <LandingIntro />
            </div>
            <div className='py-24 px-10'>
                <h2 className='text-2xl font-semibold mb-2 text-center'>Register</h2>
                <form onSubmit={(e) => submitForm(e)}>

                    <div className="mb-4">

                        <InputText defaultValue={registerObj.name} updateType="name" containerStyle="mt-4" labelTitle="Name" updateFormValue={updateFormValue} />

                        {/* <InputText defaultValue={registerObj.emailId} updateType="emailId" containerStyle="mt-4" labelTitle="Email Id" updateFormValue={updateFormValue}/> */}

                        <InputText defaultValue={registerObj.password} type="password" updateType="password" containerStyle="mt-4" labelTitle="Password" updateFormValue={updateFormValue}/>

                    </div>

                    <ErrorText styleClass="mt-8">{errorMessage}</ErrorText>
                    <button type="submit" className={"btn mt-2 w-full btn-primary" + (loading ? " loading" : "")}>Register</button>

                    <div className='text-center mt-4' onClick={()=>setRegFlag(true)}>  account? <span className="  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">Login</span></div>
                </form>
            </div>
        </div>
        </div>
    </div>
    </>
       )}
     </>   
    )
}

export default Register