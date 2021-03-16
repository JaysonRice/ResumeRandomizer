import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Modal } from "semantic-ui-react";
import { ExperienceContext } from "../../providers/ExperienceProvider";
import { FormatDate } from "../helpers/FormatDate";

export default ({ experience }) => {
  //   const [showDeleteModal, setDeleteShowModal] = useState(false);
  //   const toggleDelete = () => setDeleteShowModal(!showDeleteModal);
  //   const [editingExperience, setEditingExperience] = useState(false);

  const { deleteExperience } = useContext(ExperienceContext);

  let formattedStarted;
  let formattedFinished;

  if (experience.dateStarted != null) {
    formattedStarted = FormatDate(experience.dateStarted);
  }

  experience.dateFinished != null
    ? (formattedFinished = FormatDate(experience.dateFinished))
    : (formattedFinished = "Current");

  const removeExperience = (e) => {
    e.preventDefault();
    deleteExperience(experience.id);
  };

  return (
    <>
      <div className="experienceOverview">
        <Card>
          <div className="experienceInfo">
            <h3>{experience.jobTitle}</h3>
            <h5>Company: {experience.company}</h5>
            <h5>
              {formattedStarted} - {formattedFinished}
            </h5>
            <ul>
              {experience.experienceBullets.map((b) => {
                return <li>{b.content}</li>;
              })}
            </ul>
          </div>
        </Card>
      </div>
    </>
  );
};
