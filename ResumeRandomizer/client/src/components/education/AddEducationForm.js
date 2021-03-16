import React, { useContext, useState } from "react";
import { Button, Form, Modal } from "semantic-ui-react";
import { EducationContext } from "../../providers/EducationProvider";
import Calendar from "react-calendar";

const AddEducationForm = ({ setAddingEducation }) => {
  const userProfileId = JSON.parse(sessionStorage.getItem("userProfile")).id;
  const { getUserEducation, addEducation } = useContext(EducationContext);

  const [formState, setformState] = useState({ userProfileId: +userProfileId });
  const [value, setValue] = useState(new Date());

  const calendarChange = (nextValue) => {
    setValue(nextValue);
  };

  const handleUserInput = (e) => {
    const updatedState = { ...formState };
    updatedState[e.target.id] = e.target.value;
    setformState(updatedState);
  };

  const submit = (e) => {
    e.preventDefault();
    formState.userProfileId = userProfileId;
    formState.dateGraduated = value.toLocaleDateString("zh-Hans-CN");
    addEducation(formState)
      .then(() => getUserEducation(userProfileId))
      .then(setAddingEducation(false));
  };

  return (
    <>
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
            value={value.toLocaleDateString()}
          />
          <Calendar onChange={calendarChange} defaultValue={value} />
        </Form.Group>

        <Button color="black" onClick={() => setAddingEducation(false)}>
          Cancel
        </Button>
        <Button
          content="Save"
          labelPosition="right"
          icon="checkmark"
          positive
          onClick={submit}
        />
      </Form>
    </>
  );
};

export default AddEducationForm;
