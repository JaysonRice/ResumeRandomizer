import React, { useContext, useState } from "react";
import { Button, Card } from "semantic-ui-react";
import { EducationContext } from "../../providers/EducationProvider";
import { FormatDate } from "../helpers/FormatDate";

export default ({ education }) => {
  const [showDeleteModal, setDeleteShowModal] = useState(false);
  const toggleDelete = () => setDeleteShowModal(!showDeleteModal);

  const { deleteEducation } = useContext(EducationContext);

  let formatedDate;
  if (education.dateGraduated != null) {
    formatedDate = FormatDate(education.dateGraduated);
  }

  const removeEducation = (e) => {
    e.preventDefault();
    deleteEducation(education.id);
    // Might need to getEducation here to rerender
  };

  return (
    <>
      <div className="educationOverview">
        <Card>
          <div className="educationInfo">
            <h3>{education.institution}</h3>
            <h5>Degree: {education.degree}</h5>
            {formatedDate ? <h5>Date Graduated: {formatedDate}</h5> : ""}
            <Button onClick={() => removeEducation}>Remove Education</Button>
          </div>
        </Card>
      </div>
    </>
  );
};
