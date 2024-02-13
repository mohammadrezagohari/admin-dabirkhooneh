
import React, {createContext, useState } from 'react'

export const OtpContext = createContext();

export const OtpProvider = ({ children }) => {
    const [isSendOtp, setIsSendOtp] = useState(true);
    

  return (
    <OtpContext.Provider
        value={{ isSendOtp, setIsSendOtp}}
    >{children}</OtpContext.Provider>
  )
}



  