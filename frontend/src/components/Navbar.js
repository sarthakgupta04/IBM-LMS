// src/components/Navbar.js
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../AuthContext';
import './Navbar.css';

const Navbar = () => {
    const { isAuthenticated, logout } = useContext(AuthContext);

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/">Loan Management System</Link>
            </div>
            <div className="navbar-links">
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/loan/request">Request Loan</Link>
                <Link to="/loan/list">List Loans</Link>
                <Link to="/admin/approve">Approve Loans</Link>
                <Link to="/about">About Us</Link>
                {!isAuthenticated ? (
                    <>
                        <Link to="/login" className="nav-button">Login</Link>
                        <Link to="/register" className="nav-button">Register</Link>
                    </>
                ) : (
                    <button onClick={logout} className="nav-button">Logout</button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
