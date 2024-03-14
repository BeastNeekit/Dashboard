import React, { useState } from 'react';
import '../css/style.css';
import RightSection from './RightSection';
import MainContent from './MainContent';
import Users from '../components/Users';
import Analytics from "../components/Analytics";
import Inbox from "../components/Inbox";
import AdminStatus from "../components/AdminStatus";
import AccountSettings from "../components/AccountSettings";
import UserStatus from "../components/UserStatus";
import LogoutConfirmationModal from '../components/modals/LogoutConfirmationModal';
const Dashboard = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeItem, setActiveItem] = useState('dashboard');
    const [contentSection, setContentSection] = useState(null);
    const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);




    const toggleSidebar = (item) => {
        setIsSidebarOpen(!isSidebarOpen);
        setActiveItem(item);

        switch (item) {
            case 'new-login':
                setContentSection(<Users />);
                break;
            case 'user-list':
                setContentSection(<AdminStatus />);
                break;
            case 'analytics':
                setContentSection(<Analytics />);
                break;
            case 'message':
                setContentSection(<Inbox />);
                break;
            case 'users':
                setContentSection(<UserStatus /> );
                break;
            case 'settings':
                setContentSection(<AccountSettings /> );
                break;
            case 'logout':
                handleLogout();
                break;
            default:
                setContentSection(null);
                break;
        }
    };
    const handleLogout = () => {
        // Open the logout confirmation modal
        setLogoutModalOpen(true);
    };

    const confirmLogout = () => {
        // Close the modal and perform the logout
        setLogoutModalOpen(false);
        window.location.href = '/Adminlogin';
    };

    const cancelLogout = () => {
        // Close the modal without logging out
        setLogoutModalOpen(false);
    };
    const sidebarItems = [
        { id: 'dashboard', icon: 'dashboard', text: 'Dashboard' },
        { id: 'users', icon: 'person_outline', text: 'Users' },
        { id: 'history', icon: 'receipt_long', text: 'History' },
        { id: 'analytics', icon: 'insights', text: 'Analytics' },
        { id: 'message', icon: 'mail_outline', text: 'Inbox' },
        { id: 'user-list', icon: 'inventory', text: 'Admin Status' },
        { id: 'reports', icon: 'report_gmailerrorred', text: 'Reports' },
        { id: 'settings', icon: 'settings', text: 'Settings' },
        { id: 'new-login', icon: 'add', text: 'New Login' },
        { id: 'logout', icon: 'logout', text: 'Logout' },
    ];


    return (
        <div className={`container ${isSidebarOpen ? 'sidebar-open' : ''} ${isDarkMode ? 'dark-mode' : ''}`}>
            <aside>
                <div className="toggle">
                    <div className="logo">
                        <img
                            src={isDarkMode ? "/Images/logo.png" : "/Images/light_logo.png"}
                            alt="logo"
                        />
                    </div>
                    <div className="close" id="close-btn">
                        <span className="material-icons-sharp" onClick={() => toggleSidebar(activeItem)}>
                            close
                        </span>
                    </div>
                </div>

                <div className="sidebar">
                    {sidebarItems.map((item) => (
                        <a
                            key={item.id}
                            className={`${activeItem === item.id ? 'active' : ''}`}
                            onClick={() => toggleSidebar(item.id)}
                        >
                            <span className="material-icons-sharp">{item.icon}</span>
                            <h3>{item.text}
                                {item.id === 'message' && (
                                    <span className="message-count">9</span>
                                )}
                            </h3>
                        </a>
                    ))}
                </div>
                <LogoutConfirmationModal
                    isOpen={isLogoutModalOpen}
                    onCancel={cancelLogout}
                    onConfirm={confirmLogout}
                />
            </aside>

            <main>
                {contentSection || <MainContent/>}
            </main>

            <RightSection setIsDarkMode={setIsDarkMode} />
        </div>

    );
};

export default Dashboard;
