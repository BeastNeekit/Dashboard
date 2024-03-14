import React, { useState } from 'react';
import axios from 'axios';
import './css/form.css';

const LoginForm = () => {
    const [formData, setFormData] = useState({
        identifier: '',
        password: '',
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/api/login', formData);

            if (response.data.error) {
                setError('Invalid email or username or password');
            } else {
                setError('');
                localStorage.setItem('identifier', formData.identifier);
                window.location.href = "/userDashboard";
            }
        } catch (error) {
            console.error('Login failed:', error.message);
            setError('Invalid email or password');
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Login</h2>
                <label>
                    Email/Username:
                    <input type="text" name="identifier" value={formData.identifier} onChange={handleChange} />
                </label>
                <label>
                    Password:
                    <input type="password" name="password" value={formData.password} onChange={handleChange} />
                </label>
                <button className="submit" type="submit">Login</button>

                {error && <p className="error-message">{error}</p>}

                <p>
                    Don't have an account?{' '}
                    <span
                        onClick={() => (window.location.href = '/register')}
                        className="register-link"
                    >
                        Register
                    </span>
                </p>
            </form>
        </div>
    );
};

export default LoginForm;
