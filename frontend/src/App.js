import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Layout from './components/Layout';  // Adjust the path based on where you place Layout
import Schedule from './pages/Schedule';
import TaskList from './pages/TaskList';
import Messages from './pages/Messages';
import Profile from './pages/Profile';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Use Layout for pages that need the tab navigation */}
          <Route path="/" element={<Navigate to="/schedule" />} />
          <Route element={<Layout />}>
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/task-list" element={<TaskList />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;





