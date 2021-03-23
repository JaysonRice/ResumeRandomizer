import React from "react";
import { Card } from "semantic-ui-react";

export default ({ resume }) => {
  return (
    <>
      <Card color="teal">
        <div className="resumeCard">
          <h3>{resume.title}</h3>
          <h5>Header Font: {resume.headerFont}</h5>
          <h5>Body Hont: {resume.bodyFont}</h5>
          <h5>Color: {resume.color}</h5>
        </div>
      </Card>
    </>
  );
};
