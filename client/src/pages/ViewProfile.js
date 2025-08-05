import ActivityHeatmap from '../components/ActivityHeatmap';
import { useEffect, useState, useContext } from 'react';
import API from '../api/axios';
import { UserContext } from '../context/UserContext';
import MyPerformance from './MyPerformance';
import './ViewProfile.css';

const ViewProfile = () => {
  const { user } = useContext(UserContext);
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (user?.token) {
      API.get('/api/results/my', {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      })
        .then(res => setResults(res.data))
        .catch(err => console.error("Failed to fetch results", err));
    }
  }, [user]);

  if (!user) return <p className="login-message">Login to view profile.</p>;

  return (
    <div className="profile-wrapper">
      <section className="profile-section">
        <h2>👤 {user.username || 'Your'}'s Profile</h2>
        <p><strong>Email:</strong> {user.email || 'Not available'}</p>
      </section>

      <section className="activity-section">
        <h3>📈 Activity Map</h3>
        <ActivityHeatmap activities={results} />
      </section>

      <section className="performance-section">
        <h3>📊 My Performance</h3>
        <MyPerformance />
      </section>
    </div>
  );
};

export default ViewProfile;
