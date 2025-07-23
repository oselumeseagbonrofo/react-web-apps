import { useRef, useState } from "react";
import Input from "./Input";
import Button from "./Button";
import Modal from "./Modal";

const NewProject = ({ handleAddNewProject, onCancel }) => {
  // For directly setting the project data
  const titleRef = useRef();
  const descriptionRef = useRef();
  const dueDateRef = useRef();

  const dialogRef = useRef();

  // Handle save
  const handleSave = () => {
    const enteredTitle = titleRef.current.value;
    const enteredDescription = descriptionRef.current.value;
    const enteredDueDate = dueDateRef.current.value;

    if (
      enteredTitle.trim() &&
      enteredDescription.trim() &&
      enteredDueDate.trim()
    ) {
      handleAddNewProject({
        title: enteredTitle,
        description: enteredDescription,
        dueDate: enteredDueDate,
      });
    } else {
      dialogRef.current.open();
      return;
    }
  };

  // Handle clear project data
  const clearProjectData = () => {
    titleRef.current.value = "";
    descriptionRef.current.value = "";
    dueDateRef.current.value = "";

    onCancel();
  };

  return (
    <>
      <Modal ref={dialogRef} buttonCaption="Close then try again">
        <h2 className="text-2xl font-bold text-stone-700 mb-4">Invalid Input</h2>
        <p className="text-stone-800 my-4">Please enter all required values</p>
        </Modal>
      <div className="flex flex-col items-center justify-center min-h-screen w-1/2">
        <div className="flex gap-4 items-center justify-end w-3/5">
          <Button
            className="text-stone-800 hover:text-stone-950"
            onClick={clearProjectData}
            type="button"
          >
            Cancel
          </Button>
          <Button
            className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950"
            onClick={handleSave}
            type="button"
          >
            Create Project
          </Button>
        </div>
        <form className="w-full max-w-md">
          <Input type="text" placeholder="Enter Title" ref={titleRef}>
            Title
          </Input>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="projectName"
            >
              Description
            </label>
            <textarea
              id="projectName"
              placeholder="Enter description"
              ref={descriptionRef}
              rows="4"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <Input type="date" ref={dueDateRef}>
            Due Date
          </Input>
        </form>
      </div>
    </>
  );
};

export default NewProject;
