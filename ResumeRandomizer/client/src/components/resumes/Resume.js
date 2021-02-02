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
                                <h5>{resume.title}</h5>
                            </div>
                    </Card>
                </div>
        </>
    );
}