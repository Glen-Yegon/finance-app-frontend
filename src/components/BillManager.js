// src/BillManager.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BillManager() {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [bills, setBills] = useState([]);

  useEffect(() => {
    const fetchBills = async () => {
      const res = await axios.get('http://localhost:3000/bills');
      setBills(res.data);
    };
    fetchBills();
  }, []);

  const addBill = async () => {
    try {
      await axios.post('http://localhost:3000/bills', { description, amount, dueDate });
      setBills([...bills, { description, amount, dueDate }]);
      setDescription('');
      setAmount('');
      setDueDate('');
    } catch (error) {
      alert('Failed to add bill');
    }
  };

  return (
    <div>
      <h2>Bill Manager</h2>
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
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <button onClick={addBill}>Add Bill</button>

      <h3>Bills</h3>
      <ul>
        {bills.map((bill, index) => (
          <li key={index}>{`${bill.description} - $${bill.amount} - Due: ${new Date(bill.dueDate).toLocaleDateString()}`}</li>
        ))}
      </ul>
    </div>
  );
}

export default BillManager;
