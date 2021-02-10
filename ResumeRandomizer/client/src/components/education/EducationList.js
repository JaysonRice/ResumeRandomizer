import React, { useContext, useEffect, useState } from "react";
import { Button, Modal } from "semantic-ui-react";
import { EducationContext } from "../../providers/EducationProvider";
import AddEducationForm from "./AddEducationForm";
import Education from "./Education";

const EducationList = () => {
  const { education, getUserEducation } = useContext(EducationContext);
  const userProfile = JSON.parse(sessionStorage.userProfile);

  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => setShowModal(!showModal);

  useEffect(() => {
    getUserEducation(userProfile.id);
  }, []);

  if (!education) {
    return null;
  }

  return (
    <>
      <h3>{userProfile.firstName}'s Education</h3>
      <Button onClick={toggleModal}>New Education</Button>
      {education.map((education) => {
        return <Education key={education.id} education={education} />;
      })}

      <Modal open={showModal} toggle={toggleModal}>
        <Modal.Header toggle={toggleModal}>Add Education</Modal.Header>

        <Modal.Content toggle={toggleModal}>
          <AddEducationForm />
        </Modal.Content>

        <Modal.Actions>
          <Button color="black" onClick={toggleModal}>
            Cancel
          </Button>
          <Button
            content="Save"
            labelPosition="right"
            icon="checkmark"
            onClick={toggleModal}
            positive
          />
        </Modal.Actions>
      </Modal>
    </>
  );
};

export default EducationList;
