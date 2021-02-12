import React, { useContext, useEffect } from "react";
import { ResumeContext } from "../../providers/ResumeProvider";
import Resume from "./Resume";
import "../css/Education.css";

const ResumeList = () => {
  const { resumes, getUserResumes } = useContext(ResumeContext);
  const userProfile = JSON.parse(sessionStorage.userProfile);

  useEffect(() => {
    getUserResumes(userProfile.id);
  }, []);

  if (!resumes) {
    return null;
  }

  return (
    <>
      <h3>{userProfile.firstName}'s Resumes</h3>
      {resumes.map((resume) => {
        return <Resume key={resume.id} resume={resume} />;
      })}
    </>
  );
};

export default ResumeList;
