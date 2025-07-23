import Button from "./Button";

const SideBar = ({ handleStartAddProject, projects, onSelectProject, selectedProjectId }) => {
  return (
    <aside className="bg-gray-800 text-white w-2xl p-10 mt-11 mr-11 rounded-r-3xl">
      <p className="text-2xl font-bold mb-4 capitalize">Your Projects</p>
      <Button
        className="px-4 py-2 text-xs md:text-base rounded-md bg-stone-700 text-stone-400 hover:bg-stone-600 hover:text-stone-100"
        onClick={handleStartAddProject}
      >
        + Add Project
      </Button>
      <ul className="mt-8">
        {projects.map((project) => {
          let cssClasses = "w-full text-left px-2 py-1 rounded-sm my-1 hover:text-stone-200 hover:bg-stone-800"

          if (project.id === selectedProjectId){
            cssClasses += ' bg-stone-800 text-stone-200'
          } else{
            cssClasses += ' text-stone-400'
          }

          return (
             <li className="flex justify-between my-4" key={project.id}>
            <button className={cssClasses}
            onClick={ () => onSelectProject(project.id)}>
              {project.title}
            </button>
          </li>
          );
         
})}
      </ul>
    </aside>
  );
};

export default SideBar;
