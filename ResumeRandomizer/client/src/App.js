import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserProfileProvider } from './providers/UserProfileProvider';
import ApplicationViews from './components/ApplicationViews';
import { ResumeProvider } from './providers/ResumeProvider';

function App() {
  return (
    <div className="App">
      <Router>
        <UserProfileProvider>
          <ResumeProvider>
            <ApplicationViews />
          </ResumeProvider>
        </UserProfileProvider>
      </Router>
    </div>
  );
}

export default App;