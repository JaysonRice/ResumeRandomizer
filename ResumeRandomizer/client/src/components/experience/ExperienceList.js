import React, { useContext, useEffect, useState } from "react";
import { DateInput } from "semantic-ui-calendar-react";
import { Button, Modal } from "semantic-ui-react";
import { ExperienceContext } from "../../providers/ExperienceProvider";
import Experience from "./Experience";

const ExperienceList = () => {
  const { experience, getUserExperience } = useContext(ExperienceContext);
  const userProfile = JSON.parse(sessionStorage.userProfile);

  //   const [addingExperience, setAddingExperience] = useState(false);

  useEffect(() => {
    getUserExperience(userProfile.id);
  }, []);

  if (!experience) {
    return null;
  }

  return (
    <>
      <h3>{userProfile.firstName}'s Experience</h3>

      {/* {addingExperience ? (
        <AddExperienceForm setAddingExperience={setAddingExperience} />
      ) : (
        <Button onClick={() => setAddingExperience(true)}>
          Add Experience
        </Button>
      )} */}

      <div className="experienceList">
        {experience.map((experience) => {
          return <Experience key={experience.id} experience={experience} />;
        })}
      </div>
    </>
  );
};

export default ExperienceList;
