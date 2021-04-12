import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import EducationList from "./education/EducationList";
import ExperienceList from "./experience/ExperienceList";
import ProjectList from "./projects/ProjectList";
import Login from "./Login";
import Register from "./Register";
import ResumeList from "./resumes/ResumeList";
import "./css/Education.css";
import "./css/Experience.css";
import "./css/ResumeList.css";
import "react-calendar/dist/Calendar.css";

export default function ApplicationViews() {
  const { isLoggedIn } = useContext(UserProfileContext);

  return (
    <main>
      <Switch>
        <Route path="/" exact>
          {isLoggedIn ? <ResumeList /> : <Redirect to="/login" />}
        </Route>

        <Route path="/education">
          <EducationList />
        </Route>

        <Route path="/experience">
          <ExperienceList />
        </Route>

        <Route path="/projects">
          <ProjectList />
        </Route>

        <Route path="/login">
          <Login />
        </Route>

        <Route path="/register">
          <Register />
        </Route>
      </Switch>
    </main>
  );
}
