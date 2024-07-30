import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AgentApprovalList.css';

const AgentApprovalList = () => {
    const [agents, setAgents] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchAgents = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setError('No token found. Please login again.');
                    return;
                }

                const response = await axios.get('http://localhost:8000/user/agentRequestList', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                setAgents(response.data.data || []);
            } catch (error) {
                console.error('Error fetching agent requests:', error);
                setError('Failed to fetch agent requests. Please try again.');
            }
        };

        fetchAgents();
    }, []);

    const handleApprove = async (agentId) => {
        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:8000/user/approveAgent', { agentId }, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setAgents(agents.filter(agent => agent._id !== agentId));
        } catch (error) {
            console.error('Error approving agent:', error);
            setError('Failed to approve agent. Please try again.');
        }
    };

    return (
        <div className="agent-approval-container">
            <h1>Agent Approval Requests</h1>
            {error && <p className="error-message">{error}</p>}
            <table className="agent-approval-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {agents.map((agent) => (
                        <tr key={agent._id}>
                            <td>{agent.name}</td>
                            <td>{agent.email}</td>
                            <td>{agent.phone}</td>
                            <td>
                                <button onClick={() => handleApprove(agent._id)} className="approve-button">Approve</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AgentApprovalList;
