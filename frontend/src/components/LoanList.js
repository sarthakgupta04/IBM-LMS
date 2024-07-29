import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './LoanList.css';

const LoanList = () => {
    const [loans, setLoans] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchLoans = async () => {
            try {
                const token = localStorage.getItem('token'); // Get token from localStorage
                if (!token) {
                    setError('No token found. Please login again.');
                    return;
                }

                // Send GET request to fetch loans
                const response = await axios.get('http://localhost:8000/loan/allLoans', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                setLoans(response.data.data);
            } catch (error) {
                console.error('Error fetching loans:', error);
                setError('Failed to fetch loans. Please try again.');
            }
        };

        fetchLoans();
    }, []);

    return (
        <div className="loan-list-container">
            <h1>Loan List</h1>
            {error && <p className="error-message">{error}</p>}
            <table className="loan-list-table">
                <thead>
                    <tr>
                        <th>Principle Amount</th>
                        <th>Interest Rate</th>
                        <th>Months to Repay</th>
                        <th>Repayment Amount</th>
                        <th>EMI</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {loans.map((loan) => (
                        <tr key={loan._id}>
                            <td>{loan.principle}</td>
                            <td>{loan.interestRate}%</td>
                            <td>{loan.monthsToRepay}</td>
                            <td>{loan.repaymentAmount}</td>
                            <td>{loan.emi}</td>
                            <td>{loan.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default LoanList;
