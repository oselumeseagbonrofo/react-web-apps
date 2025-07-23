import { useState } from "react";
import SideBar from "./components/SideBar";
import Home from "./components/Home";
import NewProject from "./components/NewProject";
import SelectedProject from "./components/SelectedProject";

function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: [],
  });

  // Used for selecting a project
  const handleSelectProject = (id) => {
    setProjectsState((prevState) => ({
      ...prevState,
      selectedProjectId: id,
    }));
  };

  // Used for deleting a project
  const handleDeleteProject = () => {
    setProjectsState((prevState) => ({
      ...prevState,
      selectedProjectId: undefined,
      projects: prevState.projects.filter(
        (project) => project.id !== prevState.selectedProjectId
      ),
    }));
  };

  // used to render new page for creating a project
  const handleStartAddProject = (projectId) => {
    setProjectsState((prevState) => ({
      ...prevState,
      selectedProjectId: null,
    }));
  };

  // Handles Cancel action in NewProject
  const handleCancelAddProject = (projectId) => {
    setProjectsState((prevState) => ({
      ...prevState,
      selectedProjectId: undefined,
    }));
  };

  // Handles add new project in NewProject
  const handleAddNewProject = (projectData) => {
    const newProject = {
      ...projectData,
      id: Math.random(),
    };
    setProjectsState((prevState) => ({
      ...prevState,
      projects: [...prevState.projects, newProject],
      selectedProjectId: undefined,
    }));
  };

  const handleAddTask = (text) => {
    setProjectsState((prevState) => {
      const taskId = Math.random();
      const newTask = {
        text: text,
        projectId: prevState.selectedProjectId,
        id: taskId,
      };
      return {
        ...prevState,
        tasks: [...prevState.tasks, newTask],
      };
    });
  };

  const handleDeleteTask = (id) =>{
    setProjectsState((prevState) => ({
      ...prevState,
      tasks: prevState.tasks.filter((task) => task.id !== id),
    }));
  }

  const selectedProject = projectsState.projects.find(
    (project) => project.id === projectsState.selectedProjectId
  );

  let content = (
    <SelectedProject
      onAddTask={handleAddTask}
      onDeleteTask={handleDeleteTask}
      onDelete={handleDeleteProject}
      project={selectedProject}
      tasks={projectsState.tasks}
    />
  );
  if (projectsState.selectedProjectId === null) {
    content = (
      <NewProject
        handleAddNewProject={handleAddNewProject}
        onCancel={handleCancelAddProject}
      />
    );
  } else if (projectsState.selectedProjectId === undefined) {
    content = <Home handleStartAddProject={handleStartAddProject} />;
  }

  return (
    <main className="h-screen w-screen my-8 flex gap-8">
      <SideBar
        handleStartAddProject={handleStartAddProject}
        projects={projectsState.projects}
        onSelectProject={handleSelectProject}
        selectedProjectId={projectsState.selectedProjectId}
      />
      {content}
      {/* {console.log(projectsState)} */}
    </main>
  );
}

export default App;
