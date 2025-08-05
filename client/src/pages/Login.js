import { useState, useContext, useEffect } from 'react';
import API from '../api/axios';
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import './Login.css';

const Login = () => {
  const { login, user } = useContext(UserContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: '', password: '' });

  useEffect(() => {
    if (user) navigate('/dashboard');
  }, [user, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', form);
      login(res.data);
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login to <span className="java-color">Javenture</span></h2>
        <form onSubmit={handleSubmit} className="login-form">
          <input
            name="email"
            type="email"
            placeholder="📧 Email"
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
          <button type="submit">🔑 Login as User</button>
        </form>
        <p>
          Don’t have an account?{' '}
          <Link to="/register" className="register-link">Register Here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
