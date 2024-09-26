
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Modal from 'react-modal';
// import { Link } from 'react-router-dom';

// Modal.setAppElement('#root');

// function TaskList() {
//   const [tasks, setTasks] = useState([]);
//   const [selectedTask, setSelectedTask] = useState(null);

//   // Fetch tasks from the database (To-Do, In-Progress, Completed)
//   useEffect(() => {
//     axios.get('http://localhost:3001/tasks?family_id=1')
//       .then(response => {
//         setTasks(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching tasks', error);
//       });
//   }, []);

//   const categorizeTasks = (status) => {
//     return tasks.filter(task => task.status === status);
//   };

//   // Handle task deletion
//   const handleDeleteTask = (task) => {
//     axios.delete(`http://localhost:3001/tasks/${task.id}`)
//       .then(response => {
//         alert('Task deleted successfully!');
//         setTasks(tasks.filter(t => t.id !== task.id));  // Update the list
//         setSelectedTask(null);  // Close modal after deletion
//       })
//       .catch(error => {
//         console.error('Error deleting task', error);
//       });
//   };

//   return (
//     <div className="task-list-page">
//       <h1>Honey-do List</h1>
      
//       {/* Tabs for To-do, In-progress, and Completed */}
//       <div className="task-tabs">
//         <button>To-do</button>
//         <button>In-progress</button>
//         <button>Completed</button>
//       </div>

//       {/* To-Do Tasks */}
//       <div className="task-category">
//         <h2>To-do</h2>
//         <ul>
//           {categorizeTasks('to-do').map(task => (
//             <li key={task.id}>
//               <div className="task-info">
//                 <h3>{task.name}</h3>
//                 <p>{task.category}</p>
//               </div>
//               <button onClick={() => setSelectedTask(task)} className="view-details-arrow">→</button> {/* Open detailed view */}
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Modal for Task Details */}
//       <Modal isOpen={!!selectedTask} onRequestClose={() => setSelectedTask(null)} className="task-modal">
//         {selectedTask && (
//           <div className="task-detail-container">
//             <button onClick={() => setSelectedTask(null)} className="back-button">← Honey-do List</button>
//             <h2>{selectedTask.name}</h2>
//             <p>{selectedTask.description}</p>
//             <button className="cta-button" onClick={() => handleDeleteTask(selectedTask)}>Delete Task</button>
//           </div>
//         )}
//       </Modal>
//     </div>
//   );
// }

// export default TaskList;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

// Modal setup
Modal.setAppElement('#root');

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);  // To store selected task for viewing

  const [showAddTaskModal, setShowAddTaskModal] = useState(false);  // State to control Add Task modal
  const [newTaskName, setNewTaskName] = useState('');  // New task name
  const [newTaskDescription, setNewTaskDescription] = useState('');  // New task description

  // Fetch tasks from the database (To-Do, In-Progress, Completed)
  useEffect(() => {
    axios.get('http://localhost:3001/tasks?family_id=1')  // Change to the correct endpoint
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

  // Add a new task to the To-Do list
  const handleAddNewTask = () => {
    if (newTaskName.trim() === '' || newTaskDescription.trim() === '') {
      alert('Please enter both a task name and description');
      return;
    }
    axios.post('http://localhost:3001/tasks', {
      family_id: 1,  // Example family ID
      name: newTaskName,
      description: newTaskDescription,
      status: 'to-do',  // Task added to "To-Do" list
    })
    .then(response => {
      alert('New task added to your To-Do list!');
      setTasks([...tasks, response.data]);  // Add the new task to the state
      setShowAddTaskModal(false);  // Close the modal after submission
      setNewTaskName('');  // Clear the input fields
      setNewTaskDescription('');
    })
    .catch(error => {
      console.error('Error adding new task', error);
    });
  };

  // Handle task deletion
  const handleDeleteTask = (task) => {
    axios.delete(`http://localhost:3001/tasks/${task.id}`)
      .then(response => {
        alert('Task deleted successfully!');
        setTasks(tasks.filter(t => t.id !== task.id));  // Update the list
        setSelectedTask(null);  // Close modal after deletion
      })
      .catch(error => {
        console.error('Error deleting task', error);
      });
  };

  return (
    <div className="task-list-page">
      <h1>Honey-do List</h1>
      
      {/* Add Task Button */}
      <button className="add-task-button" onClick={() => setShowAddTaskModal(true)}>+ Add Task</button> {/* Open modal */}

      {/* Tabs for To-do, In-progress, and Completed */}
      <div className="task-tabs">
        <button>To-do</button>
        <button>In-progress</button>
        <button>Completed</button>
      </div>

      {/* To-Do Tasks */}
      <div className="task-category">
        <h2>To-do</h2>
        <ul>
          {categorizeTasks('to-do').map(task => (
            <li key={task.id}>
              <div className="task-info">
                <h3>{task.name}</h3>
                <p>{task.category}</p>
              </div>
              <button onClick={() => setSelectedTask(task)} className="view-details-arrow">→</button> {/* Open detailed view */}
            </li>
          ))}
        </ul>
      </div>

      {/* Modal for Task Details */}
      <Modal isOpen={!!selectedTask} onRequestClose={() => setSelectedTask(null)} className="task-modal">
        {selectedTask && (
          <div className="task-detail-container">
            <button onClick={() => setSelectedTask(null)} className="back-button">← Honey-do List</button>
            <h2>{selectedTask.name}</h2>
            
            {/* Display description for all tasks */}
            <p className="full-description">Description: {selectedTask.description}</p>

            <button className="cta-button" onClick={() => handleDeleteTask(selectedTask)}>Delete Task</button>
          </div>
        )}
      </Modal>

      {/* Modal for Adding New Task */}
      <Modal isOpen={showAddTaskModal} onRequestClose={() => setShowAddTaskModal(false)} className="add-task-modal">
        <div className="add-task-container">
          <h2>Add a New Task</h2>
          <label>What can we help with?</label>
          <textarea
            value={newTaskName}
            onChange={(e) => setNewTaskName(e.target.value)}
            placeholder="Example: Hang new mirror in guest room"
            rows="2"
            className="task-input"
          />
          <label>Give your task a clear, descriptive title.</label>
          <textarea
            value={newTaskDescription}
            onChange={(e) => setNewTaskDescription(e.target.value)}
            placeholder="Description"
            rows="4"
            className="task-input"
          />
          <button onClick={handleAddNewTask} className="cta-button">Next</button>
        </div>
      </Modal>
    </div>
  );
}

export default TaskList;
