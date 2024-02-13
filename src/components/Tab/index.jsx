'use client'
import React, { useState } from 'react' 

const Tab = ({item,setInView,inView,cssClass=""}) => {
    // flex flex-wrap justify-center
    return (
        <>
            <div className='tabs tabs-boxed flex flex-wrap justify-center w-full'>
                {item.map((it , i)=>(
                    <div key={i} onClick={() => setInView(it.id)} 
                    className={`tab w-full lg:w-[50%] !pb-0 ${inView === it.id ? "  !bg-[#5fe179] !text-white tab-active":""} ${cssClass}`}>
                        {it.title}
                    </div>
                ))}
            </div>
            {/* <div className='relative w-[300px] h-[300px]'>
                {item.map((it , i)=>(
                    <div key={i} className={`border p-3 transition duration-500 border-ab0 h-full ${inView === it.id ? "block" : "hidden"}`}>
                        {it.content}
                    </div>
                ))}
            </div> */}
        </>
    )
}
export default Tab;