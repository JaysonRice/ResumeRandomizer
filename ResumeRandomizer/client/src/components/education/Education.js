import React from "react";
import { Card } from "semantic-ui-react";

export default ({ education }) => {
  let formatedDate;
  let unformatedDate;

  if (education.dateGraduated != null) {
    unformatedDate = education.dateGraduated.split("T")[0];
    const [year, month, day] = unformatedDate.split("-");
    formatedDate = month + "/" + day + "/" + year;
  }

  return (
    <>
      <div className="educationOverview">
        <Card>
          <div className="educationInfo">
            <h3>{education.institution}</h3>
            <h5>Degree or Diploma: {education.degree}</h5>
            <h5>Date Graduated: {formatedDate}</h5>
          </div>
        </Card>
      </div>
    </>
  );
};
