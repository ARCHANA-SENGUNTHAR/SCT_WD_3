import { useState, useContext, useEffect } from 'react';
import API from '../api/axios';
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import './Register.css';

const Register = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: ''
  });

  useEffect(() => {
    if (user) navigate('/dashboard');
  }, [user, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/auth/register', form);
      alert('Registration successful! Please login now.');
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2>Register for <span className="java-color">Javenture</span></h2>
        <form onSubmit={handleSubmit} className="register-form">
          <input
            name="username"
            placeholder="👤 Username"
            onChange={handleChange}
            required
          />
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
          <button type="submit">🚀 Register</button>
        </form>
        <p>
          Already have an account?{' '}
          <Link to="/login" className="login-link">Login Here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
