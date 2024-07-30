import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './components/HomePage';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Dashboard from './components/Dashboard';
import LoanRequestForm from './components/LoanRequestForm';
import LoanList from './components/LoanList';
import AdminLoanApproval from './components/AdminLoanApproval';
import Navbar from './components/Navbar';
import AboutUs from './components/AboutUs';
import AuthContext from './AuthContext';
import AdminDashboard from './components/AdminDashboard';
import AgentApprovalList from './components/AgentApprovalList';
import AgentDashboard from './components/AgentDashboard';

const App = () => {
  const { isAuthenticated, user } = useContext(AuthContext);

  const isAdmin = user && user.userType === 'admin';
  const isAgent = user && user.userType === 'agent';

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/loan/request" element={isAuthenticated ? <LoanRequestForm /> : <Navigate to="/login" />} />
        <Route path="/loan/list" element={isAuthenticated ? <LoanList /> : <Navigate to="/login" />} />
        <Route path="/admin/approve" element={isAdmin ? <AdminLoanApproval /> : <Navigate to="/login" />} />
        <Route path="/admin/agent-approval" element={isAdmin ? <AgentApprovalList /> : <Navigate to="/login" />} />
        <Route path="/admin/dashboard" element={isAdmin ? <AdminDashboard /> : <Navigate to="/login" />} />
        <Route path="/agent/dashboard" element={isAgent ? <AgentDashboard /> : <Navigate to="/login" />} />
        <Route path="/about" element={<AboutUs />} />
        {isAuthenticated && (
          <Route
            path="*"
            element={
              isAdmin ? <Navigate to="/admin/dashboard" />
              : isAgent ? <Navigate to="/agent/dashboard" />
              : <Navigate to="/dashboard" />
            }
          />
        )}
      </Routes>
    </Router>
  );
};

export default App;
