// src/ExpenseTracker.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ExpenseTracker() {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      const res = await axios.get('http://localhost:3000/expenses');
      setExpenses(res.data);
    };
    fetchExpenses();
  }, []);

  const addExpense = async () => {
    try {
      await axios.post('http://localhost:3000/expenses', { description, amount, category });
      setExpenses([...expenses, { description, amount, category }]);
      setDescription('');
      setAmount('');
      setCategory('');
    } catch (error) {
      alert('Failed to add expense');
    }
  };

  return (
    <div>
      <h2>Expense Tracker</h2>
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <button onClick={addExpense}>Add Expense</button>

      <h3>Expenses</h3>
      <ul>
        {expenses.map((expense, index) => (
          <li key={index}>{`${expense.description} - $${expense.amount} - ${expense.category}`}</li>
        ))}
      </ul>
    </div>
  );
}

export default ExpenseTracker;
