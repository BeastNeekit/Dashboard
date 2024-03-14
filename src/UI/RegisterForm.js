import React, { useState } from 'react';
import axios from 'axios';
import './css/form.css';

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/api/register', formData);
            console.log(response.data);
            window.location.href = '/login';

        } catch (error) {
            console.error('Registration failed:', error.message);
            if (error.response && error.response.status === 409) {
                setError('Please use a different email.');
            } else {
                setError('Email already exists. Please use a different email.');
            }
        }
    };

    return (
        <div className="register-container">
            <form className="register-form" onSubmit={handleSubmit}>
                <h2>Register</h2>
                <label>
                    Username:
                    <input type="text" name="name" value={formData.name} required onChange={handleChange} />
                </label>
                <label>
                    Email:
                    <input type="email" name="email" value={formData.email} onChange={handleChange} />
                </label>
                <label>
                    Password:
                    <input type="password" name="password" value={formData.password} required onChange={handleChange} />
                </label>
                <button type="submit">Register</button>

                {error && <p className="error-message">{error}</p>}

                <p>
                    Already have an account?{' '}
                    <span
                        onClick={() => (window.location.href = '/login')}
                        className="login-link"
                    >
                        Login
                    </span>
                </p>
            </form>
        </div>
    );
};

export default RegisterForm;
