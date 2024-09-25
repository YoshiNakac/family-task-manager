import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

// Set up the modal root element
Modal.setAppElement('#root');

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', description: '' });

  // Fetch tasks from the backend API
  useEffect(() => {
    axios.get('http://localhost:3001/tasks?family_id=1')
      .then(response => {
        setTasks(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching tasks', error);
        setLoading(false);
      });
  }, []);

  // Categorize tasks by their status
  const categorizeTasks = (status) => {
    return tasks.filter(task => task.status === status);
  };

  // Function to handle opening the modal
  const openModal = () => setModalIsOpen(true);

  // Function to handle closing the modal
  const closeModal = () => setModalIsOpen(false);

  // Function to handle creating a new task
  const handleCreateTask = () => {
    axios.post('http://localhost:3001/tasks', {
      family_id: 1,  // Assume family ID 1 for this example
      name: newTask.title,
      description: newTask.description
    })
    .then(response => {
      setTasks([...tasks, response.data[0]]);  // Add new task to task list
      closeModal();
    })
    .catch(error => {
      console.error('Error creating task', error);
    });
  };

  // Function to handle updating task status
  const handleUpdateStatus = (id, status) => {
    axios.put(`http://localhost:3001/tasks/${id}`, { status })
      .then(response => {
        const updatedTask = response.data[0];
        setTasks(tasks.map(task => task.id === id ? updatedTask : task));
      })
      .catch(error => {
        console.error('Error updating task status', error);
      });
  };

  // Display a loading state if tasks are still being fetched
  if (loading) {
    return <div>Loading tasks...</div>;
  }

  return (
    <div>
      <h1>Task List</h1>

      {/* Add New Task Button */}
      <button onClick={openModal}>Add New Task</button>

      {/* Modal for Adding a New Task */}
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <h2>What can we help with?</h2>
        <label>
          Title:
          <input 
            type="text" 
            value={newTask.title} 
            onChange={e => setNewTask({ ...newTask, title: e.target.value })} 
          />
        </label>
        <label>
          Description:
          <textarea
            value={newTask.description}
            onChange={e => setNewTask({ ...newTask, description: e.target.value })}
          />
        </label>
        <button onClick={handleCreateTask}>Submit</button>
        <button onClick={closeModal}>Cancel</button>
      </Modal>

      {/* Task List by Categories */}
      <div className="task-category">
        <h2>To-Do</h2>
        <ul>
          {categorizeTasks('to-do').map(task => (
            <li key={task.id}>
              {task.name}: {task.description}
              <button onClick={() => handleUpdateStatus(task.id, 'in-progress')}>Start</button>
            </li>
          ))}
        </ul>
      </div>

      <div className="task-category">
        <h2>In-Progress</h2>
        <ul>
          {categorizeTasks('in-progress').map(task => (
            <li key={task.id}>
              {task.name}: {task.description}
              <button onClick={() => handleUpdateStatus(task.id, 'completed')}>Complete</button>
            </li>
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


