import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './login.css';

function Login({ setToken }) {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', formData);
      const { token,user } = response.data;

      setToken(token); // store token and user in localStorage
      localStorage.setItem('token', token); 
      localStorage.setItem('user', JSON.stringify(response.data.user));

      navigate('/dashboard'); // Redirect
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className='form' >
      <h1>Login</h1>
      <div className='box '>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <br />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        <br />
        <button  type="submit">Login</button>
      </form>
      </div>
      <p>Not a member? <Link to="/register">Register</Link></p>
    </div>
  );
}

export default Login;
