// Inbox.js
import React from 'react';
import '../css/Inbox.css'; // Import the corresponding CSS file

const Inbox = () => {
    const messages = [
        { id: 1, sender: 'John Doe', subject: 'Meeting Tomorrow', date: '2024-03-06' },
        { id: 2, sender: 'Alice Smith', subject: 'Project Update', date: '2024-03-05' },
    ];

    return (
        <>
        <h1> Inbox</h1>
    <div className="inbox-container">
            <ul className="message-list">
                {messages.map((message) => (
                    <li key={message.id} className="message-item">
                        <div className="message-info">
                            <p className="sender">{message.sender}</p>
                            <p className="subject">{message.subject}</p>
                        </div>
                        <p className="date">{message.date}</p>
                    </li>
                ))}
            </ul>
            <a href="#" className="view-all-link">View All Messages</a>
        </div>
            </>
    );
};

export default Inbox;
