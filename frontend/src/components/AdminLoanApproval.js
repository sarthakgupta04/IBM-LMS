import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminLoanApproval.css';

const AdminLoanApproval = () => {
    const [loans, setLoans] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchLoans = async () => {
            try {
                const token = localStorage.getItem('token');
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

    const handleApprove = async (loanId) => {
        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:8000/loan/approveLoan', { loanId }, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setLoans(loans.map(loan => loan._id === loanId ? { ...loan, status: 'APPROVED' } : loan));
        } catch (error) {
            console.error('Error approving loan:', error);
            setError('Failed to approve loan. Please try again.');
        }
    };

    const handleReject = async (loanId) => {
        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:8000/loan/rejectLoan', { loanId }, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setLoans(loans.map(loan => loan._id === loanId ? { ...loan, status: 'REJECTED' } : loan));
        } catch (error) {
            console.error('Error rejecting loan:', error);
            setError('Failed to reject loan. Please try again.');
        }
    };

    return (
        <div className="admin-loan-approval-container">
            <h1>Approve or Reject Loans</h1>
            {error && <p className="error-message">{error}</p>}
            <table className="loan-approval-table">
                <thead>
                    <tr>
                        <th>Principle Amount</th>
                        <th>Interest Rate</th>
                        <th>Months to Repay</th>
                        <th>Repayment Amount</th>
                        <th>EMI</th>
                        <th>Status</th>
                        <th>Actions</th>
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
                            <td>
                                {loan.status === 'NEW' && (
                                    <>
                                        <button onClick={() => handleApprove(loan._id)} className="approve-button">Approve</button>
                                        <button onClick={() => handleReject(loan._id)} className="reject-button">Reject</button>
                                    </>
                                )}
                                {loan.status !== 'NEW' && <span>{loan.status}</span>}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminLoanApproval;
