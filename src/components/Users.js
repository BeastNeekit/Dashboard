import React from 'react';
import '../css/Users.css';
const Users = () => {
    // Your user data or logic can be added here

    const users = [
        { id: 1, name: 'John Doe', email: 'john@example.com' },
        { id: 2, name: 'Jane Doe', email: 'jane@example.com' },
        { id: 3, name: 'Bob Smith', email: 'bob@example.com' },
        // Add more users as needed
    ];

    return (
        <>
        <h1>Users</h1>
    <div className="users-section">
            <div className="user-list">
                {users.map((user) => (
                    <div className="user" key={user.id}>
                        <img src={`/path-to-user-images/${user.id}.jpg`} alt={user.name} />
                        <h3>{user.name}</h3>
                        <p>{user.email}</p>
                    </div>
                ))}
            </div>
        </div>
            </>
    );
};

export default Users;
