import React, { useContext, useState } from "react";
import { Button, Form, Modal, Grid } from "semantic-ui-react";
import { ExperienceContext } from "../../providers/ExperienceProvider";
import Calendar from "react-calendar";

const AddExperienceForm = ({ setAddingExperience }) => {
  const userProfileId = JSON.parse(sessionStorage.getItem("userProfile")).id;
  const { getUserExperience, addExperience } = useContext(ExperienceContext);

  const [formState, setformState] = useState({ userProfileId: +userProfileId });
  // All of these states are used to conditionally render form elements
  // Would love to find a cleaner solution in the future
  const [addingStartDate, setAddingStartDate] = useState(false);
  const [currentJob, setCurrentJob] = useState(true);
  const [addingEndDate, setAddingEndDate] = useState(false);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const calendarStartChange = (nextValue) => {
    setStartDate(nextValue);
  };

  const calendarEndChange = (nextValue) => {
    setEndDate(nextValue);
  };

  const handleUserInput = (e) => {
    const updatedState = { ...formState };
    updatedState[e.target.id] = e.target.value;
    setformState(updatedState);
  };

  const submit = (e) => {
    e.preventDefault();
    formState.userProfileId = userProfileId;
    formState.dateStarted = startDate.toLocaleDateString("zh-Hans-CN");

    if (currentJob) {
      formState.dateFinished = null;
    } else {
      formState.dateFinished = endDate.toLocaleDateString("zh-Hans-CN");
    }
    addExperience(formState)
      .then(() => getUserExperience(userProfileId))
      .then(setAddingExperience(false));
  };

  return (
    <>
      <Form>
        <Form.Group>
          <Form.Input
            id="jobTitle"
            onChange={handleUserInput}
            label="Job Title"
            placeholder="Job Title"
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Input
            id="company"
            onChange={handleUserInput}
            label="Company"
            placeholder="Company"
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Input
            label="Date Started"
            value={startDate.toLocaleDateString()}
          />

          <Form.Button
            className="calendarButton"
            size="tiny"
            circular
            color="grey"
            onClick={() => setAddingStartDate(!addingStartDate)}
          >
            {addingStartDate ? "Hide Calendar" : "Show Calendar"}
          </Form.Button>
        </Form.Group>

        {addingStartDate ? (
          <Form.Group>
            <Calendar onChange={calendarStartChange} defaultValue={startDate} />
          </Form.Group>
        ) : (
          ""
        )}

        <Form.Group>
          <p>Is this your current job?</p>
          <Form.Radio
            label={currentJob ? "Yes" : "No"}
            defaultChecked
            toggle
            onClick={() => setCurrentJob(!currentJob)}
          />
        </Form.Group>

        {currentJob ? (
          ""
        ) : (
          <Form.Group>
            <Form.Input
              label="Date Ended"
              value={endDate.toLocaleDateString()}
            />

            <Form.Button
              className="calendarButton"
              size="tiny"
              circular
              color="grey"
              onClick={() => setAddingEndDate(!addingEndDate)}
            >
              {addingEndDate ? "Hide Calendar" : "Show Calendar"}
            </Form.Button>
          </Form.Group>
        )}

        {addingEndDate && !currentJob ? (
          <Form.Group>
            <Calendar onChange={calendarEndChange} defaultValue={endDate} />
          </Form.Group>
        ) : (
          ""
        )}

        <Button color="black" onClick={() => setAddingExperience(false)}>
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

export default AddExperienceForm;
