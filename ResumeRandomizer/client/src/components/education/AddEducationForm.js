import React, { useContext, useState } from "react";
import { DateInput } from "semantic-ui-calendar-react";
import { Button, Form, Modal } from "semantic-ui-react";
import { EducationContext } from "../../providers/EducationProvider";
import Calendar from "react-calendar";

const AddEducationForm = () => {
  const userProfileId = JSON.parse(sessionStorage.getItem("userProfile")).id;
  const { addEducation } = useContext(EducationContext);

  const [formState, setformState] = useState({ userProfileId: +userProfileId });
  const [value, setValue] = useState(new Date());

  const calendarChange = (nextValue) => {
    setValue(nextValue.toLocaleDateString("zh-Hans-CN"));
  };

  const handleUserInput = (e) => {
    const updatedState = { ...formState };
    updatedState[e.target.name] = e.target.value;
    setformState(updatedState);
  };

  const submit = (e) => {
    e.preventDefault();
    formState.userProfileId = userProfileId;
    formState.dateGraduated = value;
    // addEducation(formState).then(() => toggleModal);
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
          <Calendar onChange={calendarChange} defaultValue={value} />
        </Form.Group>

        <Button color="black">Cancel</Button>
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
