import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { UserProfileProvider } from "./providers/UserProfileProvider";
import ApplicationViews from "./components/ApplicationViews";
import { ResumeProvider } from "./providers/ResumeProvider";
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <Router>
        <UserProfileProvider>
          <ResumeProvider>
            <Header />
            <ApplicationViews />
          </ResumeProvider>
        </UserProfileProvider>
      </Router>
    </div>
  );
}

export default App;
