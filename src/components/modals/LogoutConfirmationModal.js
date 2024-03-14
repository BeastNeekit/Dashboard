import React from 'react';
import '../../css/modals/LogoutConfirmation.css';

const LogoutConfirmationModal = ({ isOpen, onCancel, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-content">
                    <p>Are you sure you want to logout?</p>
                    <div className="button-container">
                        <button className="cancel-button" onClick={onCancel}>
                            Cancel
                        </button>
                        <button className="logout-button" onClick={onConfirm}>
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LogoutConfirmationModal;
