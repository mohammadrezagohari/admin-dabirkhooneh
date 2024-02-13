import React, { Children } from 'react'
// import { i18n } from 'i18next';
import i18n from "i18next";

function Modal({id,key,title,children,setIsShowModal}) {
  return (
    <dialog id={id} key={key} className="modal">
        <div className="modal-box">
            <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button onClick={()=>setIsShowModal(false)} className={`btn btn-sm btn-circle btn-ghost absolute ${i18n.language=="en"?"right-2":"left-2"}  top-2`}>✕</button>
            </form>
            <h3 className={`font-bold text-lg ${i18n.language=="en"?"text-left":"text-right"} `}>{title}</h3>
            <div className="">
                {children}
            </div>
            {/* <p className="py-4">Press ESC key or click on ✕ button to close</p> */}
        </div>
    </dialog>
  )
}

export default Modal