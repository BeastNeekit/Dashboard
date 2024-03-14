import React, { useState, useEffect } from "react";
import '../css/AdminStatus.css';
import axios from "axios";

const AdminStatus = () => {
    const [adminUsers, setAdminUsers] = useState([]);


    useEffect(() => {
        // Fetch admin user data
        const fetchAdminUsers = async () => {
            try {
                const response = await axios.get("http://localhost:5000/getAdminUsers");
                if (!response.data || response.data.length === 0) {
                    throw new Error("Failed to fetch admin users");
                }

                const adminUsersData = response.data;
                setAdminUsers(adminUsersData);
            } catch (error) {
                console.error("Error fetching admin users:", error.message);
            }
        };

        fetchAdminUsers();
    }, []);



    const formatLastLogin = (lastLogin) => {
        if (!lastLogin) {
            return "Never";
        }

        const now = new Date();
        const lastLoginDate = new Date(lastLogin);
        const timeDifference = now - lastLoginDate;

        const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
        if (hoursDifference === 0) {
            const minutesDifference = Math.floor(timeDifference / (1000 * 60));
            return `${minutesDifference} ${minutesDifference === 1 ? 'minute' : 'Min'} Ago`;
        } else if (hoursDifference < 24) {
            return `${hoursDifference} ${hoursDifference === 1 ? 'hour' : 'Hours'} Ago`;
        } else {
            return `${Math.floor(hoursDifference / 24)} ${Math.floor(hoursDifference / 24) === 1 ? 'day' : 'Days'} Ago`;
        }
    };
    useEffect(() => {
        console.log("Admin Users:", adminUsers);
        // Log image URLs for troubleshooting
        adminUsers.forEach((adminUser) => {
            if (adminUser.imageUrl) {
                console.log("Image URL:", adminUser.imageUrl);
            }
        });
    }, [adminUsers]);

    return (
        <div className="admin-status">
            <h1>Admin Users</h1>
            {adminUsers === null ? (
                <p>Loading...</p>
            ) : (
                <div className="admin-list">
                    {adminUsers.map((adminUser) => (
                        <div className="admin" key={adminUser._id}>
                            {adminUser.imageUrl && (
                                <img src={adminUser.imageUrl} alt={adminUser.name} />
                            )}
                            <h2>{adminUser.username}</h2>
                            <p>{formatLastLogin(adminUser.lastLogin)}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminStatus;
