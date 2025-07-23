import { useRef, useImperativeHandle } from "react";
import {createPortal} from "react-dom"

export default function ResultModal({ remainingTime, targetTime, onReset, ref }) {
    const accessDialog = useRef();    

    const userLost = remainingTime <= 0;
    const formattedRemainingTime = (remainingTime / 1000).toFixed(2);

    // USER SCORE
    const score = Math.round((1 - remainingTime/ (targetTime * 1000)) * 100);

    useImperativeHandle(ref, () => {
        return{
            open () {
                accessDialog.current.showModal(); // Show the dialog when the method is called
            }
                
        }
    });
    
    return createPortal(
    // Note: The dialog element should have open attribute for the modal to be visible.
    //Dialog by default is invisible until the open attribute is set. 
    // open attribute no longer needed here as we control visibility through the ref method.
    <dialog ref={accessDialog} className="result-modal" onClose={onReset}>
        {userLost ? <h2>You Lost</h2> : <h2>You Score: {score}</h2>}
        <p>The target time was <strong>{targetTime} seconds.</strong></p>
        <p>You stopped the timer with <strong>{formattedRemainingTime} seconds left.</strong></p>
        <form method="dialog" onSubmit={onReset}>
            <button>Close</button>
        </form>
    </dialog>,
    document.getElementById("modal")
  );
}
