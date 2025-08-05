import { useContext, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';

const AdminProfile = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !user.isAdmin) {
      navigate('/admin/login');
    }
  }, [user, navigate]);

  if (!user || !user.isAdmin) return null;

  return (
    <div className="profile-container" style={{ padding: '2rem' }}>
      <h2>👨‍💼 Admin Profile</h2>
      <div className="profile-card">
        <p><strong>👤 Name:</strong> {user.username || 'Not Available'}</p>
        <p><strong>📧 Email:</strong> {user.email || 'Not Available'}</p>
        <p><strong>🛡️ Role:</strong> Admin</p>
        {/* Future: Display Admin Logs / Audit */}
      </div>
    </div>
  );
};

export default AdminProfile;
