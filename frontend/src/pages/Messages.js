import React from 'react';
import '../Messages.css';  // Assuming Messages.css is still in src

function Messages() {
  // Example data to represent different conversations with people about services
  const conversations = [
    {
      id: 1,
      name: 'John Doe',
      service: 'Furnace Tune-up',
      lastMessage: 'Hey, can you come by today?',
      timestamp: 'Yesterday, 4:35 PM',
    },
    {
      id: 2,
      name: 'Jane Smith',
      service: 'Home Health Setup',
      lastMessage: 'Thanks for helping with the setup!',
      timestamp: 'Today, 9:12 AM',
    },
    {
      id: 3,
      name: 'Alex Johnson',
      service: 'Window Repair',
      lastMessage: 'I’ll check the windows tomorrow.',
      timestamp: 'Today, 2:14 PM',
    },
  ];

  return (
    <div className="messages-page">
      <header className="messages-header">
        <h1>Messages</h1>
      </header>

      <div className="messages-container">
        {/* Render each conversation as a card */}
        {conversations.map((conversation) => (
          <div key={conversation.id} className="message-card">
            <div className="message-card-content">
              <h3>{conversation.name}</h3>
              <p className="service-name">{conversation.service}</p>
              <p className="last-message">{conversation.lastMessage}</p>
            </div>
            <span className="message-timestamp">{conversation.timestamp}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Messages;
