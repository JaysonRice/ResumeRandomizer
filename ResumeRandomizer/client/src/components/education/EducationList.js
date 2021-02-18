import React, { useContext, useEffect, useState } from "react";
import { DateInput } from "semantic-ui-calendar-react";
import { Button, Modal } from "semantic-ui-react";
import { EducationContext } from "../../providers/EducationProvider";
import AddEducationForm from "./AddEducationForm";
import Education from "./Education";

const EducationList = () => {
  const { education, getUserEducation } = useContext(EducationContext);
  const userProfile = JSON.parse(sessionStorage.userProfile);

  const [addingEducation, setAddingEducation] = useState(false);

  useEffect(() => {
    getUserEducation(userProfile.id);
  }, []);

  if (!education) {
    return null;
  }

  return (
    <>
      <h3>{userProfile.firstName}'s Education</h3>

      {addingEducation ? (
        <AddEducationForm setAddingEducation={setAddingEducation} />
      ) : (
        <Button onClick={() => setAddingEducation(true)}>Add Education</Button>
      )}
      <div className="educationList">
        {education.map((education) => {
          return <Education key={education.id} education={education} />;
        })}
      </div>
    </>
  );
};

export default EducationList;
