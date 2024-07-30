import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../AuthContext';
import './LoginForm.css';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);

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
      const { token } = response.data.data;
      localStorage.setItem('token', token);

      // Fetch user profile data using the token
      const userResponse = await axios.get('http://localhost:8000/user/profile', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const user = userResponse.data.user;

      localStorage.setItem('user', JSON.stringify(user));
      login(user);

      // Redirect based on user type
      if (user.userType === 'admin') {
        navigate('/admin/dashboard');
      } else if (user.userType === 'agent') {
        navigate('/agent/dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
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
