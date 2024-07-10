// src/components/LoanList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './LoanList.css';

const LoanList = () => {
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const response = await axios.get('/user/loan/allLoans');
        setLoans(response.data.data);
      } catch (error) {
        console.error('Error fetching loans', error);
      }
    };

    fetchLoans();
  }, []);

  return (
    <div>
      <h1>Loan List</h1>
      <ul>
        {loans.map((loan) => (
          <li key={loan._id}>
            Principle: {loan.principle}, Status: {loan.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LoanList;
