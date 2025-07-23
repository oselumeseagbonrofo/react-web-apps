import { useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";
import Button from "./Button";

const Modal = ({ ref, children, buttonCaption }) => {
  const dialogRef = useRef();

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialogRef.current.showModal();
      },
    };
  });

  return createPortal(
    <dialog
      className="backdrop:bg-stone-900/70 p-4 rounded-2xl shadow-2xl"
      ref={dialogRef}
    >
      {children}
      <form className="mt-4 text-right" method="dialog">
        <Button className="px-4 py-2 text-xs md:text-base rounded-md bg-stone-700 text-stone-400 hover:bg-stone-600 hover:text-stone-100">
          {buttonCaption}
        </Button>
      </form>
    </dialog>,
    document.getElementById("modal-root")
  );
};

export default Modal;
