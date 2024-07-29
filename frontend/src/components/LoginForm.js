import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/user/login', formData);
      console.log('Login successful', response.data);

      if (response.data.message === 'Your approval request is still pending') {
        setError(response.data.message);
      } else {
        // Save the token to localStorage
        localStorage.setItem('token', response.data.data.token);
        console.log('Token stored:', response.data.data.token); // Log token storage

        // Redirect to the dashboard
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Login error', error);
      setError('Login failed. Please try again.');
    }
  };

  return (
    <div className="login-form-container">
      <form onSubmit={handleSubmit}>
        <h2>Welcome Back! Please Login</h2>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
