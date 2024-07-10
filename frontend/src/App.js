// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Dashboard from './components/Dashboard';
import LoanRequestForm from './components/LoanRequestForm';
import LoanList from './components/LoanList';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/loan/request" element={<LoanRequestForm />} />
        <Route path="/loan/list" element={<LoanList />} />
      </Routes>
    </Router>
  );
};

export default App;
