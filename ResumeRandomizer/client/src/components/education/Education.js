import React, { useContext, useState } from "react";
import { Button, Card, Modal } from "semantic-ui-react";
import { EducationContext } from "../../providers/EducationProvider";
import { FormatDate } from "../helpers/FormatDate";
import EditEducationForm from "./EditEducationForm";

export default ({ education }) => {
  const [showDeleteModal, setDeleteShowModal] = useState(false);
  const toggleDelete = () => setDeleteShowModal(!showDeleteModal);
  const [editingEducation, setEditingEducation] = useState(false);

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
          {!editingEducation ? (
            <div className="educationInfo">
              <h3>{education.institution}</h3>
              <h5>Degree: {education.degree}</h5>
              {formatedDate ? <h5>Date Graduated: {formatedDate}</h5> : ""}
              <Button onClick={() => setEditingEducation(true)}>Edit</Button>
              <Button onClick={toggleDelete}>Remove</Button>
            </div>
          ) : (
            <EditEducationForm
              education={education}
              setEditingEducation={setEditingEducation}
            />
          )}
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
