import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { UserProfileProvider } from "./providers/UserProfileProvider";
import ApplicationViews from "./components/ApplicationViews";
import { ResumeProvider } from "./providers/ResumeProvider";
import Header from "./components/Header";
import { EducationProvider } from "./providers/EducationProvider";
import { ExperienceProvider } from "./providers/ExperienceProvider";

function App() {
  return (
    <div className="App">
      <Router>
        <UserProfileProvider>
          <ExperienceProvider>
            <EducationProvider>
              <ResumeProvider>
                <Header />
                <ApplicationViews />
              </ResumeProvider>
            </EducationProvider>
          </ExperienceProvider>
        </UserProfileProvider>
      </Router>
    </div>
  );
}

export default App;
