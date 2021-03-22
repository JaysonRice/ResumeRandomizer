import React, { useContext, useState } from "react";
import { Button, Card, Grid, Modal } from "semantic-ui-react";
import { EducationContext } from "../../providers/EducationProvider";
import { FormatDate } from "../helpers/FormatDate";
import EditEducationForm from "./EditEducationForm";

export default ({ education }) => {
  const userProfileId = JSON.parse(sessionStorage.getItem("userProfile")).id;
  const [showDeleteModal, setDeleteShowModal] = useState(false);
  const toggleDelete = () => setDeleteShowModal(!showDeleteModal);
  const [editingEducation, setEditingEducation] = useState(false);

  const { getUserEducation, deleteEducation } = useContext(EducationContext);

  let formatedDate;
  if (education.dateGraduated != null) {
    formatedDate = FormatDate(education.dateGraduated);
  }

  const removeEducation = (e) => {
    e.preventDefault();
    deleteEducation(education.id)
      .then(() => getUserEducation(userProfileId))
      .then(toggleDelete);
  };

  return (
    <>
      <Card color="teal" fluid>
        <div className="educationCard">
          {!editingEducation ? (
            <Grid stackable>
              <Grid.Column width={9}>
                <h3>
                  {education.institution} - {education.degree}
                </h3>
              </Grid.Column>
              <Grid.Column width={3}>
                <h3>
                  {formatedDate ? <h5>Date Graduated: {formatedDate}</h5> : ""}
                </h3>
              </Grid.Column>
              <Grid.Column width={3}>
                <Button color="teal" onClick={() => setEditingEducation(true)}>
                  Edit
                </Button>
                <Button color="red" onClick={toggleDelete}>
                  Remove
                </Button>
              </Grid.Column>
            </Grid>
          ) : (
            <EditEducationForm
              education={education}
              setEditingEducation={setEditingEducation}
            />
          )}

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
      </Card>
    </>
  );
};
