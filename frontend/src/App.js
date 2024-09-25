//import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/tasks?family_id=1')
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the tasks!', error);
      });
  }, []);

  return (
    <div className="App">
      <h1>Family Task Manager</h1>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>{task.name}: {task.status}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
