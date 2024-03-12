import React, {useEffect} from 'react';

const UserDashboard = () => {
    const name = localStorage.getItem('name');
    useEffect(() => {

    }, [name]);

    return (
        <div>
            <h1>Welcome, {name}!</h1>
            <p>This is your dashboard. Customize it according to your application's needs.</p>

        </div>
    );
};

export default UserDashboard;
