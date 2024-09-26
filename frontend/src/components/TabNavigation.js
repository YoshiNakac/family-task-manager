import React from 'react';
import { NavLink } from 'react-router-dom';

function TabNavigation() {
  return (
    <div className="tab-navigation">
      <NavLink to="/schedule" className={({ isActive }) => isActive ? "active-tab" : ""}>
        <button>Schedule</button>
      </NavLink>
      <NavLink to="/task-list" className={({ isActive }) => isActive ? "active-tab" : ""}>
        <button>Task List</button>
      </NavLink>
      <NavLink to="/messages" className={({ isActive }) => isActive ? "active-tab" : ""}>
        <button>Messages</button>
      </NavLink>
      <NavLink to="/profile" className={({ isActive }) => isActive ? "active-tab" : ""}>
        <button>Profile</button>
      </NavLink>
    </div>
  );
}

export default TabNavigation;


