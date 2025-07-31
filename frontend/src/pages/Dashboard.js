import React, { useEffect, useState } from 'react';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';
import API from '../api/api';
import ExpenseChart from '../components/ExpenseChart';
import ExpenseBarChart from '../components/ExpenseBarChart';
import MonthlyBarChart from '../components/MonthlyBarChart';
import './Dashboard.css';


const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);
  const [filterCategory, setFilterCategory] = useState('');
  const [activeSection, setActiveSection] = useState('home'); // new state
  const user = JSON.parse(localStorage.getItem('user'));
  const [menuOpen, setMenuOpen] = useState(false);



  const filteredExpenses = filterCategory
    ? expenses.filter((e) => e.category === filterCategory)
    : expenses;

  const fetchExpenses = async () => {
    try {
      const res = await API.get('/expenses');
      setExpenses(res.data);
    } catch (error) {
      console.error('Failed to fetch expenses:', error.message);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleAddOrEdit = async (data) => {
    try {
      if (editingExpense) {
        await API.put(`/expenses/${editingExpense._id}`, data);
        setEditingExpense(null);
      } else {
        await API.post('/expenses', data);
      }
      fetchExpenses();
    } catch (error) {
      console.error('Save failed:', error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/expenses/${id}`);
      fetchExpenses();
    } catch (error) {
      console.error('Delete failed:', error.response?.data || error.message);
    }
  };

  const handleEdit = (expense) => {
    setEditingExpense(expense);
    setActiveSection('form'); // switch to form section when editing
  };


  const totalIncome = expenses
  .filter((e) => e.type === 'income')
  .reduce((acc, curr) => acc + Number(curr.amount), 0);

const totalExpense = expenses
  .filter((e) => e.type === 'expense')
  .reduce((acc, curr) => acc + Number(curr.amount), 0);

const currentBalance = totalIncome - totalExpense;


  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
     <aside className={`sidebar ${menuOpen ? 'open' : ''}`}>
  <div className="sidebar-header">
  <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
    <div className="bar"></div>
    <div className="bar"></div>
    <div className="bar"></div>
  </div>
  <h3>Expense App</h3>
  </div>
  <nav className={`nav-links ${menuOpen ? 'show' : ''}`}>
    <ul>
      <li><button onClick={() => { setActiveSection('home'); setMenuOpen(false); }}>Home</button></li>
      <li><button onClick={() => { setActiveSection('form'); setMenuOpen(false); }}>Add Expense</button></li>
      <li><button onClick={() => { setActiveSection('charts'); setMenuOpen(false); }}>Analysis</button></li>
      <li>
        <button onClick={() => {
          localStorage.removeItem('token');
          window.location.href = '/login';
        }}>Logout</button>
      </li>
    </ul>
  </nav>
</aside>

      {/* Main Content */}
      <div className="main-content">
        <div className='dashmain'>
          <h2>Dashboard</h2>
           <h3>Hello, {user?.name || 'User'}</h3>
        </div>

        {/* Home Section */}
        {activeSection === 'home' && (
          <div>
            <div className='amount-card'>
              <div className='bal'><h2>Current Balance</h2>RS {currentBalance}</div>
              <div className='bal'><h2>Total Income</h2>RS {totalIncome}</div>
              <div className='bal'><h2>Total Expense</h2>RS {totalExpense}</div>
            </div>

            <div className="top-controls">
              <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
                <option value="">All Categories</option>
                <option value="Food">Food</option>
                <option value="Transport">Transport</option>
                <option value="Bills">Bills</option>
                <option value="Shopping">Shopping</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className='list-section'>
              <ExpenseList expenses={filteredExpenses} onDelete={handleDelete} onEdit={handleEdit} />
            </div>
          </div>
        )}

        {/* Add/Edit Form Section */}
        {activeSection === 'form' && (
          <div className='form-section'>
            <ExpenseForm onSubmit={handleAddOrEdit} existingData={editingExpense} />
          </div>
        )}

        {/* Charts Section */}
        {activeSection === 'charts' && (
          <div className='chart-grid'>
            <div className="chart-container"><ExpenseChart data={filteredExpenses} /></div>
            <div className="chart-container"><ExpenseBarChart expenses={filteredExpenses} /></div>
            <div className="chart-container"><MonthlyBarChart expenses={filteredExpenses} /></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
  