import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  // Optional: Sync localStorage changes
  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  return (
    <Router>
      <Routes>
        {/* Default route goes to Login */}
        <Route path="/" element={<Navigate to="/login" />} />
        
        {/* Login route */}
        <Route path="/login" element={<Login setToken={setToken} />} />
        
        {/* Register route */}
        <Route path="/register" element={<Register />} />
        
        {/* Protected dashboard route */}
        <Route
          path="/dashboard"
          element={
            token ? (
              <Dashboard token={token} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
