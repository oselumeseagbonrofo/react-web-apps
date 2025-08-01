import { useEffect } from "react";
import { useRef } from "react";
import { createPortal } from "react-dom";

const Modal = ({ children, open, onClose, className='' }) => {
const dialog = useRef();
    useEffect(()=>{
        const modal = dialog.current
        if(open){
            modal.showModal();
        }
        
        return ()=> modal.close()
    },[open])

  return createPortal(
    <dialog className={`modal ${className}`} onClose={onClose} ref={dialog}>{children}</dialog>,
    document.getElementById("modal")
  );
};

export default Modal;
