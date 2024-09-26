import React from 'react';
import { Outlet } from 'react-router-dom';
import TabNavigation from './TabNavigation';  // Import the navigation component

function Layout() {
  return (
    <div>
      <Outlet />  {/* This renders the content of the current page */}
      <TabNavigation />  {/* This keeps the tab navigation at the bottom */}
    </div>
  );
}

export default Layout;


