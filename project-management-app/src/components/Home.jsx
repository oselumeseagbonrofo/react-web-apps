import { useState } from "react";
import projectsImg from "../assets/no-projects.png";
import Button from "./Button";

const Home = ({ handleStartAddProject }) => {
  return (
    <div className="flex flex-col items-center justify-center w-1/2">
      <img src={projectsImg} className="w-16 h-16 object-contain mx-auto" />
      <h2 className="text-xl font-bold text-stone-500 my-4">
        No Project Selected
      </h2>
      <p className="text-stone-400 mb-4">
        Select a project or get started with a new one
      </p>
      <Button
        className="px-4 py-2 text-xs md:text-base rounded-md bg-stone-700 text-stone-400 hover:bg-stone-600 hover:text-stone-100"
        onClick={handleStartAddProject}
      >
        Create new project{" "}
      </Button>
    </div>
  );
};

export default Home;
