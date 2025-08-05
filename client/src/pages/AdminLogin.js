import { useState, useContext } from 'react';
import API from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import './AdminLogin.css';

const AdminLogin = () => {
  const { login } = useContext(UserContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '', adminSecret: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', form);
      if (res.data.isAdmin) {
        login(res.data);
        navigate('/admin/dashboard');
      } else {
        alert("Access denied: Not an admin");
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-card">
        <h2>🔐 Admin <span className="admin-highlight">Login</span></h2>
        <form onSubmit={handleSubmit} className="admin-form">
          <input
            name="email"
            type="email"
            placeholder="📧 Admin Email"
            onChange={handleChange}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="🔒 Password"
            onChange={handleChange}
            required
          />
          <input
            name="adminSecret"
            type="password"
            placeholder="🗝️ Admin Secret Key"
            onChange={handleChange}
            required
          />
          <button type="submit">🚀 Login as Admin</button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
