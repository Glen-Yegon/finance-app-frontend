// src/App.js
import React, { useState } from 'react';
import axios from 'axios';
import ExpenseTracker from './Expensetracker';
import BudgetPlanner from './BudgetPlanner';
import FinancialAnalytics from './FinancialAnalytics';
import BillManager from './BillManager';



function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const register = async () => {
    try {
      await axios.post('http://localhost:3000/register', { username, password });
      alert('User registered');
    } catch (error) {
      alert('Registration failed');
    }
  };

  const login = async () => {
    try {
      await axios.post('http://localhost:3000/login', { username, password });
      alert('User logged in');
    } catch (error) {
      alert('Login failed');
    }
  };

  return (
    <div>
      <h1>Finance App</h1>
      <div>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={register}>Register</button>
        <button onClick={login}>Login</button>
      </div>
      <ExpenseTracker />
      <BudgetPlanner />
      <FinancialAnalytics />
      <BillManager />
    </div>
  );
}

export default App;
