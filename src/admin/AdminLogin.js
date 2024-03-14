import React, { useState } from 'react';
import '../css/AdminLogin.css';

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                localStorage.setItem('username', username);
                window.location.href = '/dashboard';

            } else {
                const data = await response.json();
                setError(data.message || 'Login failed.');
            }
        } catch (error) {
            console.error(error);
            setError('Internal Server Error');
        } finally {
            setLoading(false); // Reset loading state, whether the request succeeds or fails
        }
    };

    const handleRegister = async () => {
        try {
            const response = await fetch('http://localhost:5000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                alert('Admin registered successfully. You can now log in.');
            } else {
                const data = await response.json();
                setError(data.message || 'Registration failed.');
            }
        } catch (error) {
            console.error(error);
            setError('Internal Server Error');
        }
    };

    return (
        <div className="admin-login-container">
            <h1>Admin Login</h1>
            <div className="login-form">
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                {error && <p className="error-message">{error}</p>}

                <div className="button-container">
                    <button type="button" onClick={handleLogin} disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                    <span>or</span>
                    <button type="button" onClick={handleRegister} disabled={loading}>
                        {loading ? 'Registering...' : 'Register'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
