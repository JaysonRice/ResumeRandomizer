import React, { useContext, useState } from "react";
import { Accordion, Button, Card, Grid, Icon, Modal } from "semantic-ui-react";
import { ProjectContext } from "../../providers/ProjectProvider";
import { FormatDate } from "../helpers/FormatDate";
// import EditProjectForm from "./EditProjectForm";

export default ({ project }) => {
  const userProfileId = JSON.parse(sessionStorage.getItem("userProfile")).id;
  const [showDeleteModal, setDeleteShowModal] = useState(false);
  const toggleDelete = () => setDeleteShowModal(!showDeleteModal);
  const [editingProject, setEditingProject] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const { getUserProject, deleteProject } = useContext(ProjectContext);

  const projectDates = () => {
    if (project.dateStarted === null && project.dateFinished === null) {
      return "";
    }
    // TODO: Logic to display "started" vs "finished" depending on what's given. Maybe just axe started.
  };

  const handleClick = () => {
    if (activeIndex === 0) {
      setActiveIndex(1);
    } else {
      setActiveIndex(0);
    }
  };

  const removeProject = (e) => {
    e.preventDefault();
    deleteProject(project.id)
      .then(() => getUserProject(userProfileId))
      .then(toggleDelete);
  };

  return (
    <>
      <Card color="teal" fluid>
        <div className="projectCard">
          {!editingProject ? (
            <div className="expGrid">
              <Grid stackable>
                <Grid.Column width={5}>
                  <h2>{project.company}</h2>
                </Grid.Column>
                <Grid.Column width={7}>
                  <h3>
                    {project.projectName} {projectDates()}
                  </h3>
                </Grid.Column>
                <Grid.Column floated="right" width={3}>
                  <Button color="teal" onClick={() => setEditingProject(true)}>
                    Edit
                  </Button>
                  <Button color="red" onClick={toggleDelete}>
                    Remove
                  </Button>
                </Grid.Column>
              </Grid>
            </div>
          ) : (
            <p>Edit form here</p>
            // <EditProjectForm
            //   project={project}
            //   setEditingProject={setEditingProject}
            // />
          )}

          <Accordion styled fluid>
            <Accordion.Title
              active={activeIndex === 1}
              index={1}
              onClick={() => handleClick()}
            >
              <Icon name="dropdown" />
              Bullet Points
            </Accordion.Title>
            <Accordion.Content active={activeIndex === 1}>
              <ul>
                {project.projectBullets.map((b) => {
                  return <li key={b.id}>{b.content}</li>;
                })}
              </ul>
              {!project.projectBullets.length ? (
                <p>
                  <em> You don't have any bullet points yet </em>
                </p>
              ) : (
                ""
              )}
            </Accordion.Content>
          </Accordion>

          <Modal open={showDeleteModal} toggle={toggleDelete}>
            <Modal.Header toggle={toggleDelete}>
              Delete {project.jobTitle} Project at {project.company}?
            </Modal.Header>
            <Modal.Content>
              <div className="buttonContainer">
                <Button onClick={toggleDelete}>Cancel</Button>
                <Button negative type="submit" onClick={removeProject}>
                  Delete
                </Button>
              </div>
            </Modal.Content>
          </Modal>
        </div>
      </Card>
    </>
  );
};
