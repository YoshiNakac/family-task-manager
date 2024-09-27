# Family Task Manager

Welcome to the **Family Task Manager**! This mobile-first web application helps families organize, manage, and complete various tasks, as well as communicate with service providers. The project includes several features such as task management, a messaging system, and profile management, built with a clean, modern design.

---

## Features
- **Task List View**: View tasks under categories like "To-do," "In-progress," and "Completed."
- **Task Details**: View detailed information for each task and manage task statuses.
- **Suggested Tasks**: See a list of tasks suggested for the family and easily add them to the task list.
- **Profile Management**: Edit personal information such as name, email, password, and country/region.
- **Messages**: View and manage conversations with service providers.

---

## Tech Stack
- **Frontend**: React (with functional components and hooks)
- **Backend**: Node.js with Express
- **Database**: Supabase (PostgreSQL)
- **Styling**: CSS (custom styles for mobile-first responsiveness)
- **Libraries**:
  - `axios`: for handling HTTP requests
  - `react-router-dom`: for routing between different pages
  - `dotenv`: for environment variable management
  - `supabase-js`: for database interaction

---

## Setup Instructions

### 1. Clone the Repository
Start by cloning the repository to your local machine:

```bash 
git clone https://github.com/YoshiNakac/family-task-manager.git
```

### 2. Setup Backend
```bash
cd backend
npm install
```

### 3. Setup Environment Variables in .env
SUPABASE_URL=https://lwklryqzttkgnxtrjetz.supabase.co
SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx3a2xyeXF6dHRrZ254dHJqZXR6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjcyNDQ3NDgsImV4cCI6MjA0MjgyMDc0OH0.potlyTt-9WJ0xqJrr8_0sMZ0ZZwRxnqjdH5z-FzoHQg

### 4. Run Backend Server
npm start

### 5. Setup Frontend
cd ../frontend
npm install


### 6. Run Frontend
npm start