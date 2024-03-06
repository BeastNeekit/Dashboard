import React, { useState } from 'react';
import '../css/style.css';
import RightSection from './RightSection';
import MainContent from './MainContent';
import Users from '../components/Users';
import Order from "../components/Order";
import Analytics from "../components/Analytics";
import Inbox from "../components/Inbox";
import UserStatus from "../components/UserStatus";

const Dashboard = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeItem, setActiveItem] = useState('dashboard');
    const [contentSection, setContentSection] = useState(null);

    const toggleSidebar = (item) => {
        setIsSidebarOpen(!isSidebarOpen);
        setActiveItem(item);

        switch (item) {
            case 'new-login':
                setContentSection(<Users />);
                break;
            case 'user-list':
                setContentSection(<UserStatus />);
                break;
            case 'history':
                setContentSection(<UserStatus /> );
                break;
            case 'analytics':
                setContentSection(<Analytics />);
                break;
            case 'message':
                setContentSection(<Inbox />);
                break;
            case 'users':
                setContentSection(<Users /> );
                break;
            default:
                setContentSection(null);
                break;
        }
    };

    const sidebarItems = [
        { id: 'dashboard', icon: 'dashboard', text: 'Dashboard' },
        { id: 'users', icon: 'person_outline', text: 'Users' },
        { id: 'history', icon: 'receipt_long', text: 'History' },
        { id: 'analytics', icon: 'insights', text: 'Analytics' },
        { id: 'message', icon: 'mail_outline', text: 'Inbox' },
        { id: 'user-list', icon: 'inventory', text: 'User Status' },
        { id: 'reports', icon: 'report_gmailerrorred', text: 'Reports' },
        { id: 'settings', icon: 'settings', text: 'Settings' },
        { id: 'new-login', icon: 'add', text: 'New Login' },
        { id: 'logout', icon: 'logout', text: 'Logout' },
    ];


    return (
        <div className={`container ${isSidebarOpen ? 'sidebar-open' : ''}`}>
            <aside>
                <div className="toggle">
                    <div className="logo">
                        <img src="/Images/hero.jpg" alt="logo" />
                        <h2>Neek<span className="danger">Prog</span></h2>
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
                            href="#"
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
            </aside>

            <main>
                {contentSection || <MainContent />}
            </main>

            <RightSection />
        </div>
    );
};

export default Dashboard;
