import React, { useEffect, useState } from 'react';
import '../css/Users.css';
import axios from 'axios';

const Users = () => {
    const [users, setUsers] = useState([]);




    useEffect(() => {
        axios.get('http://localhost:5000/getImage')
            .then((res) => {
                setUsers(res.data);
            })
            .catch((err) => {
                console.log('Error fetching users:', err);
            });
    }, []);



    return (
        <>
            <h1>Users</h1>
            <div className="users-section">
                <div className="user-list">
                    {users && users.length > 0 ? (
                        users.map((user) => (
                            <div className="user" key={user._id}>
                                <img src={user.imageUrl} alt={user.name} />
                                <h3>{user.name}</h3>
                                <p>{user.email}</p>
                            </div>
                        ))
                    ) : (
                        <p>No users found.</p>
                    )}
                </div>
            </div>

        </>
    );
};

export default Users;
