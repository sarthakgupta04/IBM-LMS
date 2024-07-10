// src/components/Dashboard.js
import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <div>
        <Link to="/loan/request">Request Loan</Link>
        <Link to="/loan/list">List Loans</Link>
      </div>
    </div>
  );
};

export default Dashboard;
