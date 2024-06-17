// src/FinancialAnalytics.js
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

function FinancialAnalytics() {
  const [expenses, setExpenses] = useState([]);
  
  useEffect(() => {
    const fetchExpenses = async () => {
      const res = await axios.get('http://localhost:3000/expenses');
      setExpenses(res.data);
    };
    fetchExpenses();
  }, []);

  const getChartData = () => {
    const categories = [...new Set(expenses.map(exp => exp.category))];
    const data = categories.map(cat => {
      return expenses.filter(exp => exp.category === cat).reduce((sum, exp) => sum + exp.amount, 0);
    });

    return {
      labels: categories,
      datasets: [
        {
          label: 'Expenses',
          data: data,
          backgroundColor: 'rgba(75, 192, 192, 0.6)'
        }
      ]
    };
  };

  return (
    <div>
      <h2>Financial Analytics</h2>
      <Bar data={getChartData()} />
    </div>
  );
}

export default FinancialAnalytics;
