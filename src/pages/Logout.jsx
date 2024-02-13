import {useState, useRef,useEffect,useContext} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import Login from '../features/user/Login'
import { useTranslation } from 'react-i18next'
import i18n from '../i18n'
import { logOutUser } from '../core/api/servises/register'
import { AuthContext } from '../gard/context/AuthContext'


function LogOut(){

  const { userToken,setUserToken,setIsLoggedIn ,isLoggedIn,logout,loginContext} = useContext(AuthContext);

    const navigate=useNavigate();

    const loggedOut = async () => {
        const ourToken =`Bearer ${userToken}`;    
        const createResult = await logOutUser(ourToken)
          .then(function (response) {
            if (response.status) {
                logout();
                navigate("/login");
            } else{
                if (response?.success == false) {
                    // console.log(response);
                }
            }
    })
    .catch(function (error) {
    console.log("error :", error);
  });
    return createResult;
  }
    useEffect( () => {
        loggedOut();   
    },[])
}

export default LogOut;