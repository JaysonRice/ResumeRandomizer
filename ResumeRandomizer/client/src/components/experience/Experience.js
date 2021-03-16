import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Modal } from "semantic-ui-react";
import { ExperienceContext } from "../../providers/ExperienceProvider";
import { FormatDate } from "../helpers/FormatDate";

export default ({ experience }) => {
  //   const [showDeleteModal, setDeleteShowModal] = useState(false);
  //   const toggleDelete = () => setDeleteShowModal(!showDeleteModal);
  //   const [editingExperience, setEditingExperience] = useState(false);

  const { deleteExperience } = useContext(ExperienceContext);

  //   let formatedDate;
  //   if (experience.dateGraduated != null) {
  //     formatedDate = formatDate(experience.dateGraduated);
  //   }

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
            <ul>
              {experience.experienceBullets.map((b) => {
                return <li>{b.content}</li>;
              })}
            </ul>

            {/* {formatedDate ? <h5>Date Graduated: {formatedDate}</h5> : ""}
            <Button onClick={() => setEditingExperience(true)}>Edit</Button>
            <Button onClick={toggleDelete}>Remove</Button> */}
          </div>
        </Card>
      </div>
    </>
  );
};
