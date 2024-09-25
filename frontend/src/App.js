import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Schedule from './pages/Schedule';
import TaskList from './pages/TaskList';
import Messages from './pages/Messages';
import Profile from './pages/Profile';

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li><Link to="/schedule">Schedule</Link></li>
            <li><Link to="/task-list">Task List</Link></li>
            <li><Link to="/messages">Messages</Link></li>
            <li><Link to="/profile">Profile</Link></li>
          </ul>
        </nav>
        
        <Switch>
          <Route path="/schedule" component={Schedule} />
          <Route path="/task-list" component={TaskList} />
          <Route path="/messages" component={Messages} />
          <Route path="/profile" component={Profile} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;


