import React, { useState } from 'react';
import '../Profile.css';  // Assuming a separate CSS file for Profile styling

function Profile() {
  const [name, setName] = useState('Melissa Peters');
  const [email, setEmail] = useState('melpeters@gmail.com');
  const [password, setPassword] = useState('********');
  const [dob, setDob] = useState('1995-05-23'); // Date in YYYY-MM-DD format for compatibility with input type=date
  const [country, setCountry] = useState('Nigeria');

  return (
    <div className="profile-page">
      {/* Profile Header */}
      <header className="profile-header">
        <button className="back-button">←</button>
        <h1>Edit Profile</h1>
      </header>

      <div className="profile-photo-section">
        <img 
          src="https://via.placeholder.com/150" 
          alt="Profile" 
          className="profile-photo"
        />
        <button className="edit-photo-button">📸</button> {/* Icon for changing profile picture */}
      </div>

      <form className="profile-form">
        {/* Name Input */}
        <label htmlFor="name">Name</label>
        <input 
          type="text" 
          id="name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
        />

        {/* Email Input */}
        <label htmlFor="email">Email</label>
        <input 
          type="email" 
          id="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />

        {/* Password Input */}
        <label htmlFor="password">Password</label>
        <input 
          type="password" 
          id="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />

        {/* Date of Birth Input */}
        <label htmlFor="dob">Date of Birth</label>
        <input 
          type="date" 
          id="dob" 
          value={dob} 
          onChange={(e) => setDob(e.target.value)} 
        />

        {/* Country Input */}
        <label htmlFor="country">Country/Region</label>
        <select 
          id="country" 
          value={country} 
          onChange={(e) => setCountry(e.target.value)}
        >
          <option value="Nigeria">Nigeria</option>
          <option value="United States">United States</option>
          <option value="Canada">Canada</option>
          <option value="United Kingdom">United Kingdom</option>
          {/* Add more countries as needed */}
        </select>

        {/* Save Changes Button */}
        <button type="submit" className="save-button">
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default Profile;
