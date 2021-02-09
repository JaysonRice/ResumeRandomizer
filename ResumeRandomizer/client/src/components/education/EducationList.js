import React, { useContext, useEffect } from "react";
import { EducationContext } from "../../providers/EducationProvider";
import Education from "./Education";

const EducationList = () => {
  const { education, getUserEducation } = useContext(EducationContext);
  const userProfile = JSON.parse(sessionStorage.userProfile);

  useEffect(() => {
    getUserEducation(userProfile.id);
  }, []);

  if (!education) {
    return null;
  }

  return (
    <>
      <h3>{userProfile.firstName}'s Education</h3>
      {education.map((education) => {
        return <Education key={education.id} education={education} />;
      })}
    </>
  );
};

export default EducationList;
