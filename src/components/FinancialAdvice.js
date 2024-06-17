// /frontend/src/components/FinancialAdvice.js
import React, { useState } from 'react';
import axios from 'axios';

function FinancialAdvice() {
    const [income, setIncome] = useState('');
    const [expense, setExpense] = useState('');
    const [advice, setAdvice] = useState('');

    const getAdvice = async () => {
        try {
            const response = await axios.post('http://localhost:3000/get_advice', { income, expense });
            setAdvice(response.data.advice);
        } catch (error) {
            alert('Failed to get advice');
        }
    };

    return (
        <div>
            <h2>Financial Advice</h2>
            <input
                type="number"
                placeholder="Income"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
            />
            <input
                type="number"
                placeholder="Expense"
                value={expense}
                onChange={(e) => setExpense(e.target.value)}
            />
            <button onClick={getAdvice}>Get Advice</button>
            {advice && <div><h3>Advice:</h3><p>{advice}</p></div>}
        </div>
    );
}

export default FinancialAdvice;
