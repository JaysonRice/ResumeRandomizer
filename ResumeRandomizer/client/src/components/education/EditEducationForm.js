import React, { useContext, useEffect, useState } from "react";
import { Button, Form } from "semantic-ui-react";
import { EducationContext } from "../../providers/EducationProvider";
import Calendar from "react-calendar";

const EditEducationForm = ({ education, setEditingEducation }) => {
  const userProfileId = JSON.parse(sessionStorage.getItem("userProfile")).id;
  const { getUserEducation, editEducation } = useContext(EducationContext);

  const [formState, setformState] = useState({ userProfileId: +userProfileId });
  const [value, setValue] = useState(new Date(education.dateGraduated));

  const calendarChange = (nextValue) => {
    setValue(nextValue);
  };

  const handleUserInput = (e) => {
    const updatedState = { ...formState };
    updatedState[e.target.id] = e.target.value;
    setformState(updatedState);
  };

  useEffect(() => {
    setformState(education);
  }, []);

  const submitChanges = (e) => {
    e.preventDefault();
    formState.userProfileId = userProfileId;
    formState.dateGraduated = value.toLocaleDateString();
    editEducation(formState.id, formState)
      .then(() => getUserEducation(userProfileId))
      .then(setEditingEducation(false));
  };

  return (
    <>
      <Form>
        <Form.Group>
          <Form.Input
            id="institution"
            onChange={handleUserInput}
            label="Institution Name"
            defaultValue={education.institution}
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Input
            id="degree"
            onChange={handleUserInput}
            label="Degree"
            defaultValue={education.degree}
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Input
            label="Date Graduated"
            value={value.toLocaleDateString()}
          />
          <Calendar onChange={calendarChange} value={value} />
        </Form.Group>

        <Form.Group>
          <Button color="black" onClick={() => setEditingEducation(false)}>
            Cancel
          </Button>
          <Button
            content="Save Changes"
            labelPosition="right"
            icon="checkmark"
            positive
            onClick={submitChanges}
          />
        </Form.Group>
      </Form>
    </>
  );
};

export default EditEducationForm;
