import React, { useContext, useEffect, useState } from "react";
import { Button, Form } from "semantic-ui-react";
import { ExperienceContext } from "../../providers/ExperienceProvider";
import Calendar from "react-calendar";

const EditExperienceForm = ({ experience, setEditingExperience }) => {
  const userProfileId = JSON.parse(sessionStorage.getItem("userProfile")).id;
  const { getUserExperience, editExperience } = useContext(ExperienceContext);
  const [formState, setformState] = useState({ userProfileId: +userProfileId });

  const [addingStartDate, setAddingStartDate] = useState(false);
  const [currentJob, setCurrentJob] = useState(!experience.dateFinished);
  const [addingEndDate, setAddingEndDate] = useState(false);

  const [startDate, setStartDate] = useState(new Date(experience.dateStarted));
  const [endDate, setEndDate] = useState(
    new Date(experience.dateFinished || new Date())
  );

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

  useEffect(() => {
    setformState(experience);
  }, []);

  const submitChanges = (e) => {
    e.preventDefault();
    debugger;
    formState.userProfileId = userProfileId;
    formState.dateStarted = startDate.toLocaleDateString();
    if (currentJob) {
      formState.dateFinished = null;
    } else {
      formState.dateFinished = endDate.toLocaleDateString();
    }
    editExperience(formState.id, formState)
      .then(() => getUserExperience(userProfileId))
      .then(setEditingExperience(false));
  };

  return (
    <>
      <Form>
        <Form.Group>
          <Form.Input
            id="jobTitle"
            onChange={handleUserInput}
            label="Job Title"
            defaultValue={experience.jobTitle}
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Input
            id="company"
            onChange={handleUserInput}
            label="Company"
            defaultValue={experience.company}
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
            <Calendar onChange={calendarStartChange} value={startDate} />
          </Form.Group>
        ) : (
          ""
        )}

        <Form.Group>
          <p>Is this your current job?</p>
          <Form.Radio
            label={currentJob ? "Yes" : "No"}
            defaultChecked={currentJob}
            toggle
            onClick={() => setCurrentJob(!currentJob)}
          />
        </Form.Group>

        {currentJob && endDate ? (
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
            <Calendar onChange={calendarEndChange} value={endDate} />
          </Form.Group>
        ) : (
          ""
        )}

        <Button color="black" onClick={() => setEditingExperience(false)}>
          Cancel
        </Button>
        <Button
          content="Save"
          labelPosition="right"
          icon="checkmark"
          positive
          onClick={submitChanges}
        />
      </Form>
    </>
  );
};

export default EditExperienceForm;
