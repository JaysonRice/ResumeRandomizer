import React, { useContext, useEffect, useState } from "react";
import { Accordion, Button, Card, Grid, Icon, Modal } from "semantic-ui-react";
import { ExperienceContext } from "../../providers/ExperienceProvider";
import { FormatDate } from "../helpers/FormatDate";

export default ({ experience }) => {
  //   const [showDeleteModal, setDeleteShowModal] = useState(false);
  //   const toggleDelete = () => setDeleteShowModal(!showDeleteModal);
  //   const [editingExperience, setEditingExperience] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const { deleteExperience } = useContext(ExperienceContext);

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
    deleteExperience(experience.id);
  };

  return (
    <>
      <Card color="teal" fluid>
        <div className="experienceCard">
          <div className="expGrid">
            <Grid stackable>
              <Grid.Column width={8}>
                <h2>{experience.company}</h2>
              </Grid.Column>
              <Grid.Column width={5}>
                <h3>{experience.jobTitle}</h3>
              </Grid.Column>
              <Grid.Column width={3}>
                <h3>
                  {formattedStarted} - {formattedFinished}
                </h3>
              </Grid.Column>
            </Grid>
          </div>

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
            </Accordion.Content>
          </Accordion>
        </div>
      </Card>
    </>
  );
};
