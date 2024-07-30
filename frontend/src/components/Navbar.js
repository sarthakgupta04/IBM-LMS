import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../AuthContext';
import './Navbar.css';

const Navbar = () => {
    const { isAuthenticated, user, logout } = useContext(AuthContext);
    const isAdmin = user && user.userType === 'admin';
    const isAgent = user && user.userType === 'agent';

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/">Loan Management System</Link>
            </div>
            <div className="navbar-links">
                {isAuthenticated ? (
                    <>
                        {isAdmin ? (
                            <>
                                <Link to="/admin/dashboard">Admin Dashboard</Link>
                                <Link to="/admin/approve">Approve Loans</Link>
                                <Link to="/admin/agent-approval">Agent Approval</Link>
                            </>
                        ) : isAgent ? (
                            <>
                                <Link to="/agent/dashboard">Agent Dashboard</Link>
                                <Link to="/loan/list">List Loans</Link>
                            </>
                        ) : (
                            <>
                                <Link to="/dashboard">Dashboard</Link>
                                <Link to="/loan/request">Request Loan</Link>
                                <Link to="/loan/list">List Loans</Link>
                            </>
                        )}
                        <Link to="/about">About Us</Link>
                        <button onClick={logout} className="nav-button">Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="nav-button">Login</Link>
                        <Link to="/register" className="nav-button">Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
