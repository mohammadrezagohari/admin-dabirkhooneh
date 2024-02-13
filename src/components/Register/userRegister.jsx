import {useState, useRef} from 'react'
import {Link} from 'react-router-dom'
import RegisterForm from './registerForm';
import i18n from 'i18next';


function UserRegister(){

 const lang ="fa"
 
    return(
        <> 
            <RegisterForm/>
        </>
    );
}

export default UserRegister