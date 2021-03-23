import React, { useContext, useEffect, useState } from "react";
import { Accordion, Button, Card, Grid, Icon, Modal } from "semantic-ui-react";
import { ExperienceContext } from "../../providers/ExperienceProvider";
import { FormatDate } from "../helpers/FormatDate";
import EditExperienceForm from "./EditExperienceForm";

export default ({ experience }) => {
  const userProfileId = JSON.parse(sessionStorage.getItem("userProfile")).id;
  const [showDeleteModal, setDeleteShowModal] = useState(false);
  const toggleDelete = () => setDeleteShowModal(!showDeleteModal);
  const [editingExperience, setEditingExperience] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const { getUserExperience, deleteExperience } = useContext(ExperienceContext);

  let formattedStarted;
  let formattedFinished;

  if (experience.dateStarted != null) {
    formattedStarted = FormatDate(experience.dateStarted);
  }

  experience.dateFinished != null
    ? (formattedFinished = FormatDate(experience.dateFinished))
    : (formattedFinished = "Current");

  const handleClick = () => {
    if (activeIndex === 0) {
      setActiveIndex(1);
    } else {
      setActiveIndex(0);
    }
  };

  const removeExperience = (e) => {
    e.preventDefault();
    deleteExperience(experience.id)
      .then(() => getUserExperience(userProfileId))
      .then(toggleDelete);
  };

  return (
    <>
      <Card color="teal" fluid>
        <div className="experienceCard">
          {!editingExperience ? (
            <div className="expGrid">
              <Grid stackable>
                <Grid.Column width={5}>
                  <h2>{experience.company}</h2>
                </Grid.Column>
                <Grid.Column width={7}>
                  <h3>
                    {experience.jobTitle} / {formattedStarted} -{" "}
                    {formattedFinished}
                  </h3>
                </Grid.Column>
                <Grid.Column floated="right" width={3}>
                  <Button
                    color="teal"
                    onClick={() => setEditingExperience(true)}
                  >
                    Edit
                  </Button>
                  <Button color="red" onClick={toggleDelete}>
                    Remove
                  </Button>
                </Grid.Column>
              </Grid>
            </div>
          ) : (
            <EditExperienceForm
              experience={experience}
              setEditingExperience={setEditingExperience}
            />
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
                {experience.experienceBullets.map((b) => {
                  return <li key={b.id}>{b.content}</li>;
                })}
              </ul>
              {!experience.experienceBullets.length ? (
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
              Delete {experience.jobTitle} experience at {experience.company}?
            </Modal.Header>
            <Modal.Content>
              <div className="buttonContainer">
                <Button onClick={toggleDelete}>Cancel</Button>
                <Button negative type="submit" onClick={removeExperience}>
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
