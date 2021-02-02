import React from "react"
import { Card } from "semantic-ui-react";

export default ({ resume }) => {

    if (!resume) {
        return null
    }

    return (
        <>
                <div className="resumeOverview">
                    <Card >
                            <div className="resumeInfo">
                                <h3>{resume.title}</h3>
                                <h5>Header Font: {resume.headerFont}</h5>
                                <h5>Body Hont: {resume.bodyFont}</h5>
                                <h5>Color: {resume.color}</h5>
                            </div>
                    </Card>
                </div>
        </>
    );
}