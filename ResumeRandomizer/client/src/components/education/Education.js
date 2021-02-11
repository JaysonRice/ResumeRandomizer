import React, { useContext, useState } from "react";
import { Button, Card, Modal } from "semantic-ui-react";
import { EducationContext } from "../../providers/EducationProvider";
import { FormatDate } from "../helpers/FormatDate";

export default ({ education }) => {
  const [showDeleteModal, setDeleteShowModal] = useState(false);
  const toggleDelete = () => setDeleteShowModal(!showDeleteModal);

  const { deleteEducation } = useContext(EducationContext);

  let formatedDate;
  if (education.dateGraduated != null) {
    formatedDate = FormatDate(education.dateGraduated);
  }

  const removeEducation = (e) => {
    e.preventDefault();
    deleteEducation(education.id).then(toggleDelete);
  };

  return (
    <>
      <div className="educationOverview">
        <Card>
          <div className="educationInfo">
            <h3>{education.institution}</h3>
            <h5>Degree: {education.degree}</h5>
            {formatedDate ? <h5>Date Graduated: {formatedDate}</h5> : ""}
            <Button onClick={toggleDelete}>Remove Education</Button>
          </div>
        </Card>

        <Modal open={showDeleteModal} toggle={toggleDelete}>
          <Modal.Header toggle={toggleDelete}>
            Delete this Education?
          </Modal.Header>
          <Modal.Content>
            <div className="buttonContainer">
              <Button onClick={toggleDelete}>Cancel</Button>
              <Button negative type="submit" onClick={removeEducation}>
                Delete
              </Button>
            </div>
          </Modal.Content>
        </Modal>
      </div>
    </>
  );
};
