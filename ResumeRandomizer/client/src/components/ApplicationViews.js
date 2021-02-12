import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import EducationList from "./education/EducationList";
import Login from "./Login";
import Register from "./Register";
import ResumeList from "./resumes/ResumeList";

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
          <p>Experience</p>
        </Route>

        <Route path="/projects">
          <p>Projects</p>
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
