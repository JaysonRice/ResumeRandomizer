import React, { useContext, useState } from "react";
import { DateInput } from "semantic-ui-calendar-react";
import { Button, Form, Modal } from "semantic-ui-react";
import { EducationContext } from "../../providers/EducationProvider";

const AddEducationForm = ({ toggleModal }) => {
  const userProfileId = JSON.parse(sessionStorage.getItem("userProfile")).id;
  const { addEducation } = useContext(EducationContext);

  const [formState, setformState] = useState({ userProfileId: +userProfileId });

  const handleUserInput = (e) => {
    const updatedState = { ...formState };
    updatedState[e.target.id] = e.target.value;
    setformState(updatedState);
  };

  const submit = (e) => {
    e.preventDefault();
    formState.userProfileId = userProfileId;
    console.log(formState);
    // addEducation(formState).then(() => toggleModal);
    toggleModal();
  };

  return (
    <>
      <Modal.Content toggle={toggleModal}>
        <Form>
          <Form.Group>
            <Form.Input
              id="institution"
              onChange={handleUserInput}
              label="Institution Name"
              placeholder="Institution Name"
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Input
              id="degree"
              onChange={handleUserInput}
              label="Degree"
              placeholder="Degree or Certificate"
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Input
              label="Date Graduated"
              placeholder="Degree or Certificate"
            ></Form.Input>

            <DateInput
              id="dateGraduated"
              onChange={handleUserInput}
              label="Date Graduated"
              name="dateGraduated"
              dateFormat="YYYY-MM-DD"
              inline="true"
              pickerWidth="70%"
              iconPosition="left"
            />
          </Form.Group>
        </Form>
      </Modal.Content>

      <Modal.Actions className="test">
        <Button color="black" onClick={toggleModal}>
          Cancel
        </Button>
        <Button
          content="Save"
          labelPosition="right"
          icon="checkmark"
          positive
          onClick={submit}
        />
      </Modal.Actions>
    </>
  );
};

export default AddEducationForm;
