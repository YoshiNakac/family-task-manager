# Family Task Manager

## Project Overview
The **Family Task Manager** is a collaborative tool that allows families to manage tasks together. It features task categorization, sample task suggestions, and a responsive mobile-first design. Built using React for the frontend and Node.js with Supabase for the backend, it offers a seamless user experience.

## Features
- **Task List**: Organize tasks into three categories: To-Do, In-Progress, and Completed.
- **Sample Tasks**: Users can view and opt into suggested tasks via the Schedule page.
- **Add New Task**: A modal popup enables users to create new tasks by providing a title and description.
- **Mobile-First Design**: Optimized for mobile devices but also fully functional on desktop.
- **Profile and Messages Tabs**: Placeholder tabs for future profile management and messaging functionality.

## Tech Stack
- **Frontend**: React, React Router, Axios.
- **Backend**: Node.js, Express, Supabase (PostgreSQL).
- **Database**: Supabase with Row-Level Security (RLS) for secure data access.

## Installation and Setup

### Backend Setup
1. Clone the repository and navigate to the `backend` folder:
   ```bash
   git clone https://github.com/YoshiNakac/family-task-manager.git
   cd family-task-manager/backend


2. Install required dependencies:
  npm install


3. Create a .env file in the backend folder with the following Supabase credentials:

4. Start the backend server:
  node server.js

The backend will be running on http://localhost:3001

### Frontend Setup
1. Navigate to the frontend folder:
  cd ../frontend

2. Install required dependencies:
  npm install

3. Start the frontend development server:
  npm start

The backend will be running on http://localhost:3000
