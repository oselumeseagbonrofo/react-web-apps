import { useState, useRef } from "react";
import Modal from "./Modal";

const NewTask = ({onAdd}) =>{
    const [enteredTask, setEnteredTask] = useState("")

    const dialog = useRef();

    const handleChange = (e) =>{
        setEnteredTask(e.target.value);
    }

    const handleClick = () =>{
        if (enteredTask.trim()){
        onAdd(enteredTask);
        }else{
           dialog.current.open();
           return;
        }
        setEnteredTask('');
    }

    return(
        <>
         <Modal ref={dialog} buttonCaption="Close"> <h2 className="text-2xl font-bold text-stone-700 mb-4">Invalid Task Name</h2>
        <p className="text-stone-800 my-4">Task Name must not be blank</p></Modal>
        <div className="flex items-center gap-4">
            <input className="w-64 px-2 py-1 rounded-sm bg-stone-200" onChange={handleChange} type="text" value={enteredTask} />
            <button className="text-stone-700 hover:text-stone-950" onClick={handleClick}>Add Task</button>
        </div>
        </>
    )
}

export default NewTask;