import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/tasks?family_id=1')
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => {
        console.error('Error fetching tasks', error);
      });
  }, []);

  const categorizeTasks = (status) => {
    return tasks.filter(task => task.status === status);
  };

  return (
    <div>
      <h1>Task List</h1>
      <div className="task-category">
        <h2>To-Do</h2>
        <ul>
          {categorizeTasks('to-do').map(task => (
            <li key={task.id}>{task.name}: {task.description}</li>
          ))}
        </ul>
      </div>

      <div className="task-category">
        <h2>In-Progress</h2>
        <ul>
          {categorizeTasks('in-progress').map(task => (
            <li key={task.id}>{task.name}: {task.description}</li>
          ))}
        </ul>
      </div>

      <div className="task-category">
        <h2>Completed</h2>
        <ul>
          {categorizeTasks('completed').map(task => (
            <li key={task.id}>{task.name}: {task.description}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TaskList;


