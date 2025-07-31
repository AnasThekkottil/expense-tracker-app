import React, { useState, useEffect } from 'react';
import './form.css';

const ExpenseForm = ({ onSubmit, existingData, onCancel }) => {
  const [amount, setAmount] = useState(existingData ? existingData.amount : '');
  const [category, setCategory] = useState(existingData ? existingData.category : '');
  const [description, setDescription] = useState(existingData ? existingData.description : '');
  const [type, setType] = useState(existingData ? existingData.type : 'expense');

  useEffect(() => {
    if (existingData) {
      setAmount(existingData.amount);
      setCategory(existingData.category);
      setDescription(existingData.description);
      setType(existingData.type);
    }
  }, [existingData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || !category || !type) return;

    const formData = {
      amount: Number(amount),
      category,
      description,
      type,
    };

    onSubmit(formData);
    setAmount('');
    setCategory('');
    setDescription('');
    setType('expense');
  };

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <h2>{existingData ? 'Edit Transaction' : 'Add Transaction'}</h2>

      <label>Type</label>
      <select value={type} onChange={(e) => setType(e.target.value)} required>
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>

      <label>Amount</label>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />

      <label>Category</label>
      {type === 'expense' ? (
        <select value={category} onChange={(e) => setCategory(e.target.value)} required>
          <option value="">Select Expense Category</option>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Bills">Bills</option>
          <option value="Shopping">Shopping</option>
          <option value="Other">Other</option>
        </select>
      ) : (
        <select value={category} onChange={(e) => setCategory(e.target.value)} required>
          <option value="">Select Income Category</option>
          <option value="Salary">Salary</option>
          <option value="Freelance">Freelance</option>
          <option value="Investment">Investment</option>
          <option value="Gift">Gift</option>
          <option value="Other">Other</option>
        </select>
      )}

      <label>Description (optional)</label>
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Add a note (optional)"
      />

      <div className="form-actions">
        <button type="submit">{existingData ? 'Update' : 'Add'}</button>
        {onCancel && <button type="button" onClick={onCancel}>Cancel</button>}
      </div>
    </form>
  );
};

export default ExpenseForm;
