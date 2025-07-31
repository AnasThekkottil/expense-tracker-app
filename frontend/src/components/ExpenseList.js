import React from 'react';
import './ExpenseList.css'; // optional: for styling

const ExpenseList = ({ expenses, onDelete, onEdit }) => {
  return (
    <div className="expense-table-container">
      <table className="expense-table">
        <thead>
          <tr>
            <th>Category</th>
            <th>Amount (₹)</th>
            <th>Description</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((exp) => (
            <tr key={exp._id}>
              <td>{exp.category}</td>
              <td>{exp.amount}</td>
              <td>{exp.description}</td>
              <td>{new Date(exp.date).toLocaleDateString()}</td>
              <td>
                <button onClick={() => onEdit(exp)}>✏️</button>
                <button onClick={() => onDelete(exp._id)}>❌</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseList;
