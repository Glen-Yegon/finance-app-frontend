// src/BudgetPlanner.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BudgetPlanner() {
  const [category, setCategory] = useState('');
  const [limit, setLimit] = useState('');
  const [period, setPeriod] = useState('');
  const [budgets, setBudgets] = useState([]);

  useEffect(() => {
    const fetchBudgets = async () => {
      const res = await axios.get('http://localhost:3000/budgets');
      setBudgets(res.data);
    };
    fetchBudgets();
  }, []);

  const addBudget = async () => {
    try {
      await axios.post('http://localhost:3000/budgets', { category, limit, period });
      setBudgets([...budgets, { category, limit, period }]);
      setCategory('');
      setLimit('');
      setPeriod('');
    } catch (error) {
      alert('Failed to set budget');
    }
  };

  return (
    <div>
      <h2>Budget Planner</h2>
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <input
        type="number"
        placeholder="Limit"
        value={limit}
        onChange={(e) => setLimit(e.target.value)}
      />
      <select value={period} onChange={(e) => setPeriod(e.target.value)}>
        <option value="monthly">Monthly</option>
        <option value="yearly">Yearly</option>
      </select>
      <button onClick={addBudget}>Set Budget</button>

      <h3>Budgets</h3>
      <ul>
        {budgets.map((budget, index) => (
          <li key={index}>{`${budget.category} - $${budget.limit} - ${budget.period}`}</li>
        ))}
      </ul>
    </div>
  );
}

export default BudgetPlanner;
