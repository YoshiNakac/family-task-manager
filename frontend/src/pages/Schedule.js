import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';

// Set up the modal root element
Modal.setAppElement('#root');

function Schedule() {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  // Fetch suggested tasks from the Supabase backend
  useEffect(() => {
    axios.get('http://localhost:3001/suggestedtasks')  // Fetch suggested tasks
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => {
        console.error('Error fetching suggested tasks', error);
      });
  }, []);

  // Function to add task to the To-Do list and update the database
  const handleAddTask = (task) => {
    axios.post('http://localhost:3001/tasks', {
      family_id: 1,  // Example family ID
      name: task.name,
      description: task.description,
      status: 'to-do',  // Adding the task to the "To-Do" list
      estimated_cost: task.estimated_cost,
    })
    .then(response => {
      alert('Task added to your To-Do list!');
      setSelectedTask(null);  // Close the modal after adding the task
    })
    .catch(error => {
      console.error('Error adding task', error);
      alert('Failed to add the task. Please try again.');
    });
  };

  return (
    <div className="schedule-page">
      {/* Top Section */}
      <div className="top-section">
        <div className="header">
          <img src="/images/your-screenshot.png" alt="Logo" className="logo" />  {/* Custom logo */}
          <button className="notification-button">🔔</button>
        </div>
        <h1>Hello, Ian</h1>
        <button className="tour-button">Book your free walk-thru</button>  {/* Updated button */}
      </div>

      {/* Bottom Section */}
      <div className="bottom-section">
        <h2>Upcoming</h2>
        <div className="task-cards">
          {tasks.map(task => (
            <div className="task-card" key={task.id} onClick={() => setSelectedTask(task)}>
              <div className="task-details">
                <h3>🌳 {task.name}</h3> {/* Emoji placed directly in front of title */}
                <p className="opt-in-line">📅 Opt in before {task.opt_in_date || 'August 31'}</p>
                <p className="price-line">Additional fee of ${task.estimated_cost}</p>
              </div>
              <span className="arrow">→</span>  {/* Faded gray arrow */}
            </div>
          ))}
        </div>
      </div>

      {/* Modal for Task Details */}
      <Modal isOpen={!!selectedTask} onRequestClose={() => setSelectedTask(null)} className="task-modal">
        {selectedTask && (
          <div className="task-detail-container">
            {/* Back button */}
            <button onClick={() => setSelectedTask(null)} className="back-button">← Schedule</button>

            {/* Task Title with Icon */}
            <h2 className="task-title">🌳 {selectedTask.name}</h2>

            {/* Opt-in Deadline */}
            <p className="opt-in-line">📅 Opt in before {selectedTask.opt_in_date || 'August 31'}</p>

            {/* Task Details Section */}
            <div className="task-section">
              <h3 className="section-heading">📄 Details</h3>
              <p>This is a premium perk and will be performed by a professional. A professional will provide estimates based on the number of trees and bushes that need to be pruned.</p>
              <p>Once you opt-in, we will reach out with additional details closer to the date with a quote.</p>
            </div>

            {/* Cost Estimate Section */}
            <div className="task-section">
              <h3 className="section-heading">💲 Cost Estimate</h3>
              <p className="cost-estimate">Estimated Cost: ${selectedTask.estimated_cost}</p>
              <p className="additional-info">This is an estimated cost. An actual quote will be given based on the work required.</p>
            </div>

            {/* Estimated Duration Section */}
            <div className="task-section">
              <h3 className="section-heading">⏳ Estimated Duration</h3>
              <p>About {selectedTask.estimated_duration || '2'} hours</p>
            </div>

            {/* Opt-in Button */}
            <button className="cta-button" onClick={() => handleAddTask(selectedTask)}>Yes, I'd like to sign up</button> {/* Updated button */}
          </div>
        )}
      </Modal>

      {/* Bottom Tab Navigation (Old Navigation Bar) */}
      <div className="tab-navigation">
        <Link to="/schedule"><button>Schedule</button></Link>
        <Link to="/task-list"><button>Task List</button></Link>
        <Link to="/messages"><button>Messages</button></Link>
        <Link to="/profile"><button>Profile</button></Link>
      </div>
    </div>
  );
}

export default Schedule;
