import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const [loans, setLoans] = useState([]);
    const [error, setError] = useState('');
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setError('No token found. Please login again.');
                    return;
                }

                const loansResponse = await axios.get('http://localhost:8000/loan/allLoans', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                const userResponse = await axios.get('http://localhost:8000/user/profile', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                setLoans(loansResponse.data.data);
                setUser(userResponse.data.user);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
                setError('Failed to fetch dashboard data. Please try again.');
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good morning';
        if (hour < 18) return 'Good afternoon';
        return 'Good evening';
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="admin-dashboard-container">
            <h1>Admin Dashboard</h1>
            {error && <p className="error-message">{error}</p>}
            <div className="dashboard-welcome">
                <h2>{getGreeting()}, {user ? user.name : 'Admin'}!</h2>
            </div>
            <div className="loan-summary">
                <h3>Loan Summary</h3>
                <p>Total Loans: {loans.length}</p>
                <p>Active Loans: {loans.filter(loan => loan.status === 'APPROVED').length}</p>
                <p>Pending Loans: {loans.filter(loan => loan.status === 'NEW').length}</p>
            </div>
            <div className="recent-activities">
                <h3>Recent Activities</h3>
                {loans.length > 0 ? (
                    <ul>
                        {loans.slice(0, 5).map(loan => (
                            <li key={loan._id}>{`Loan for ${loan.principle} is ${loan.status}`}</li>
                        ))}
                    </ul>
                ) : (
                    <p>No recent activities</p>
                )}
            </div>
            <div className="admin-actions">
                <h3>Admin Actions</h3>
                <button onClick={() => navigate('/admin/approve')}>Approve Loans</button>
                <button onClick={() => navigate('/admin/agent-approval')}>Approve Agents</button>
            </div>
        </div>
    );
};

export default AdminDashboard;
