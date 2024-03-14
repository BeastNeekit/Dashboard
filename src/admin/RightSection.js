import React, {useEffect, useRef, useState} from 'react';
import axios from 'axios';
import '../css/style.css';

const RightSection = ({setIsDarkMode}) => {
    const darkModeRef = useRef(null);
    const username = localStorage.getItem('username');
    const [profilePicture, setProfilePicture] = useState(null);
    const [loadingProfilePicture, setLoadingProfilePicture] = useState(true);

    useEffect(() => {
        const fetchProfilePicture = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/getProfilePicture?username=${username}`);
                if (response.status === 200) {
                    setProfilePicture(response.data.profilePicture);
                } else {
                    console.error('Failed to fetch profile picture');
                }
                setLoadingProfilePicture(false);
            } catch (error) {
                console.error('Error fetching profile picture:', error.message);
                setLoadingProfilePicture(false);
            }
        };

        fetchProfilePicture();
    }, [username]);

    useEffect(() => {
        const darkModeToggle = () => {
            document.body.classList.toggle('dark-mode-variables');
            darkModeRef.current.querySelector('span:nth-child(1)').classList.toggle('active');
            darkModeRef.current.querySelector('span:nth-child(2)').classList.toggle('active');
            setIsDarkMode((prevDarkMode) => !prevDarkMode);
        };

        if (darkModeRef.current) {
            darkModeRef.current.addEventListener('click', darkModeToggle);
        }

        // Cleanup event listeners when the component is unmounted
        return () => {
            if (darkModeRef.current) {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                darkModeRef.current.removeEventListener('click', darkModeToggle);
            }
        };
    }, [setIsDarkMode]);

    useEffect(() => {
        const sideMenu = document.querySelector('aside');
        const menuBtn = document.getElementById('menu-btn');
        const closeBtn = document.getElementById('close-btn');

        menuBtn.addEventListener('click', () => {
            sideMenu.style.display = 'block';
        });

        closeBtn.addEventListener('click', () => {
            sideMenu.style.display = 'none';
        });

        // Cleanup event listeners when the component is unmounted
        return () => {
            menuBtn.removeEventListener('click', () => {
                sideMenu.style.display = 'block';
            });

            closeBtn.removeEventListener('click', () => {
                sideMenu.style.display = 'none';
            });

        };
    }, []);


    return (
      <>
      <div className="right-section">

          <div className="nav">
              <button id="menu-btn">
                    <span className="material-icons-sharp">
                        menu
                    </span>
              </button>
              <div  ref={darkModeRef} className="dark-mode">
                    <span className="material-icons-sharp active">
                        light_mode
                    </span>
                  <span className="material-icons-sharp">
                        dark_mode
                    </span>
              </div>

              <div className="profile">
                  <div className="info">
                      <p>Hey, <b>{username}</b></p>
                      <small className="text-muted">Admin</small>
                  </div>
                  <div className="profile-photo">
                      {loadingProfilePicture ? (
                          <div>Loading...</div>
                      ) : (
                          <img src={profilePicture || '/Images/profile.jpg'} alt="Profile" />
                      )}
                  </div>
              </div>

          </div>

          <div className="user-profile">
              <div className="logo">
                  <img src="/Images/hero.jpg" />
                      <h2>NeekProg</h2>
                  <p><b>Web Developer</b></p>
              </div>
          </div>

          <div className="reminders">
              <div className="header">
                  <h2>Reminders</h2>
                  <span className="material-icons-sharp">
                        notifications_none
                    </span>
              </div>

              <div className="notification">
                  <div className="icon">
                        <span className="material-icons-sharp">
                            volume_up
                        </span>
                  </div>
                  <div className="content">
                      <div className="info">
                          <h3>Workshop</h3>
                          <small className="text_muted">
                              08:00 AM - 12:00 PM
                          </small>
                      </div>
                      <span className="material-icons-sharp">
                            more_vert
                        </span>
                  </div>
              </div>

              <div className="notification deactive">
                  <div className="icon">
                        <span className="material-icons-sharp">
                            edit
                        </span>
                  </div>
                  <div className="content">
                      <div className="info">
                          <h3>Workshop</h3>
                          <small className="text_muted">
                              08:00 AM - 12:00 PM
                          </small>
                      </div>
                      <span className="material-icons-sharp">
                            more_vert
                        </span>
                  </div>
              </div>

              <div className="notification add-reminder">
                  <div>
                        <span className="material-icons-sharp">
                            add
                        </span>
                      <h3>Add Reminder</h3>
                  </div>
              </div>

          </div>
      </div>
          </>
  );
};

export default RightSection;
