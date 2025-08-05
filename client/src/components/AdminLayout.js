import { Outlet, Link, useNavigate } from 'react-router-dom';
import './AdminLayout.css';
import { useContext, useEffect } from 'react';
import { UserContext } from '../context/UserContext';

const AdminLayout = () => {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !user.isAdmin) {
      navigate('/admin/login');
    }
  }, [user, navigate]);

  // Prevent flicker before redirect
  if (!user || !user.isAdmin) return null;

  return (
    <div className="admin-container">
      <aside className="admin-sidebar">
        <h2>🛠️ Admin</h2>
        <ul>
          <li><Link to="/admin/dashboard">📋 Dashboard</Link></li>
          <li><Link to="/admin/add">➕ Add Question</Link></li>
          <li><Link to="/admin/profile">👤 Profile</Link></li>
          <li><button onClick={() => { logout(); navigate('/'); }}>🚪 Logout</button></li>
        </ul>
      </aside>

      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
