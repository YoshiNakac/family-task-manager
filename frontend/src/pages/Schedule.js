import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Schedule() {
  const [sampleTasks, setSampleTasks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/suggested-tasks')
      .then(response => {
        setSampleTasks(response.data);
      })
      .catch(error => {
        console.error('Error fetching sample tasks', error);
      });
  }, []);

  return (
    <div>
      <h1>Schedule</h1>
      <ul>
        {sampleTasks.map(task => (
          <li key={task.id}>
            {task.name}: {task.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Schedule;


