// src/components/LoanRequestForm.js
import React, { useState } from 'react';
import axios from 'axios';
import './LoanRequestForm.css';

const LoanRequestForm = () => {
  const [principle, setPrinciple] = useState('');
  const [monthsToRepay, setMonthsToRepay] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/user/loan/newLoan', { principle, monthsToRepay });
      console.log('Loan request successful', response.data);
    } catch (error) {
      console.error('Loan request error', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Principle Amount:</label>
        <input type="number" value={principle} onChange={(e) => setPrinciple(e.target.value)} />
      </div>
      <div>
        <label>Months to Repay:</label>
        <input type="number" value={monthsToRepay} onChange={(e) => setMonthsToRepay(e.target.value)} />
      </div>
      <button type="submit">Request Loan</button>
    </form>
  );
};

export default LoanRequestForm;
