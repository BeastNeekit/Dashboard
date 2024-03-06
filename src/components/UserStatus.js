import React from "react";
const Users = () => {
    return (
        <div className="new-users">
            <h1>New Users</h1>
            <div className="user-list">
                <div className="user">
                    <img src="images/profile-2.jpg"/>
                    <h2>Jack</h2>
                    <p>54 Min Ago</p>
                </div>
                <div className="user">
                    <img src="images/profile-3.jpg"/>
                    <h2>Amir</h2>
                    <p>3 Hours Ago</p>
                </div>
                <div className="user">
                    <img src="images/profile-4.jpg"/>
                    <h2>Ember</h2>
                    <p>6 Hours Ago</p>
                </div>
                <div className="user">
                    <img src="images/plus.png"/>
                    <h2>More</h2>
                    <p>New User</p>
                </div>
            </div>
        </div>
    );
};
export default Users;