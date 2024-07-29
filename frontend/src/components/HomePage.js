// src/components/HomePage.js
import React from 'react';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="homepage">
      <div className="hero">
        <h1>Welcome to Loan Management System</h1>
        <p>Your trusted partner for easy and efficient loan management.</p>
        <div className="hero-buttons">
          <a href="/login" className="hero-button">Login</a>
          <a href="/register" className="hero-button">Register</a>
        </div>
      </div>
      <div className="features">
        <h2>Features</h2>
        <ul>
          <li>Easy Loan Application Process</li>
          <li>Quick Loan Approval</li>
          <li>Secure User Authentication</li>
          <li>Real-Time Loan Status Tracking</li>
        </ul>
      </div>
      <div className="testimonials">
        <h2>What Our Users Say</h2>
        <p>"The Loan Management System made applying for a loan so easy and quick!" - John Doe</p>
        <p>"A seamless experience from start to finish." - Jane Smith</p>
      </div>
      <div className="cta">
        <h2>Get Started Today!</h2>
        <p>Sign up now and manage your loans effortlessly.</p>
        <a href="/register" className="cta-button">Register</a>
      </div>
    </div>
  );
};

export default HomePage;
