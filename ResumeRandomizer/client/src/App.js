import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserProfileProvider } from './providers/UserProfileProvider';
import ApplicationViews from './components/ApplicationViews';
import logo from './logo.svg';

function App() {
  return (
    <div className="App">
      <Router>
        <UserProfileProvider>
          <ApplicationViews />
        </UserProfileProvider>
      </Router>
    </div>
  );
}

export default App;