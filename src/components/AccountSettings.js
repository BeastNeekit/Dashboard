// AccountSettings.js

import React, { useState } from 'react';
import axios from 'axios';
import LogoutConfirmationModal from './modals/LogoutConfirmationModal';
import '../css/AccountSetting.css';

const AccountSettings = () => {
    const [email, setEmail] = useState('john.doe@example.com');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [changePasswordMessage, setChangePasswordMessage] = useState('');
    const username = localStorage.getItem('username');
    const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);
    const [profilePicture, setProfilePicture] = useState(null);

    const handleProfilePictureChange = (event) => {
        setProfilePicture(event.target.files[0]);
    };

    const handleProfilePictureUpload = async () => {
        try {
            const formData = new FormData();
            formData.append('profilePicture', profilePicture);

            const response = await fetch('http://localhost:5000/uploadProfilePicture', {
                method: 'POST',
                body: formData,
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                    'Username': localStorage.getItem('username'),
                },
            });

            if (response.ok) {
                console.log('Profile picture uploaded successfully');
            } else {
                console.error('Failed to upload profile picture');
            }
        } catch (error) {
            console.error('Error uploading profile picture:', error.message);
        }
    };

    const handleLogout = () => {
        setLogoutModalOpen(true);
    };

    const confirmLogout = () => {
        setLogoutModalOpen(false);
        window.location.href = '/Adminlogin';
    };

    const cancelLogout = () => {
        setLogoutModalOpen(false);
    };

    const handleSaveProfile = () => {
        console.log('Profile saved:', { username, email });
    };

    const handleChangePassword = async () => {
        try {
            const response = await axios.post('http://localhost:5000/changePassword', {
                username,
                currentPassword,
                newPassword,
            });
            setChangePasswordMessage(response.data.message);
            console.log('Password changed successfully:', response.data);

            setNewPassword('');
        } catch (error) {
            setChangePasswordMessage(error.response.data.message);
            console.error('Error changing password:', error.response.data.message);
        }
    };

    return (
        <div className="account-settings-container">
            <h1>Account Settings</h1>

            <div className="section">
                <h2>Profile Settings</h2>
                <div className="form-group">
                    <label>Username:</label>
                    <input type="text" value={username} readOnly />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <button className="save-button" onClick={handleSaveProfile}>Save Profile</button>
            </div>

            <div className="section">
                <h2>Security Settings</h2>
                <div className="form-group">
                    <label>Current Password:</label>
                    <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>New Password:</label>
                    <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                    <button className="change-password-button" onClick={handleChangePassword}>Change Password</button>
                </div>
                {changePasswordMessage && (
                    <div className="error-message">{changePasswordMessage}</div>
                )}
            </div>



            <div className="section">
                <button className="logout" onClick={handleLogout}>Logout</button>
            </div>

            <LogoutConfirmationModal
                isOpen={isLogoutModalOpen}
                onCancel={cancelLogout}
                onConfirm={confirmLogout}
            />
        </div>
    );
};

export default AccountSettings;
