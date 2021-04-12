import React, { useContext, useEffect, useState } from "react";
import { Button, Modal } from "semantic-ui-react";
import { ProjectContext } from "../../providers/ProjectProvider";
// import AddProjectForm from "./AddProjectsForm";
import Project from "./Project";

const ProjectList = () => {
  const { projects, getUserProjects } = useContext(ProjectContext);
  const userProfile = JSON.parse(sessionStorage.userProfile);

  const [addingProject, setAddingProject] = useState(false);

  useEffect(() => {
    getUserProjects(userProfile.id);
  }, []);

  if (!projects) {
    return null;
  }

  return (
    <>
      <h3>{userProfile.firstName}'s Projects</h3>

      {addingProject ? (
        // <AddProjectForm setAddingProject={setAddingProject} />
        <p>Form here</p>
      ) : (
        <Button onClick={() => setAddingProject(true)}>Add Projects</Button>
      )}

      <div className="projectList">
        {projects.map((project) => {
          return <Project key={project.id} project={project} />;
        })}
      </div>
    </>
  );
};

export default ProjectList;
