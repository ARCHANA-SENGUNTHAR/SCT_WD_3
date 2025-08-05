import { useEffect, useState, useContext } from 'react';
import API from '../api/axios';
import { UserContext } from '../context/UserContext';
import './MyPerformance.css';

const MyPerformance = () => {
  const { user } = useContext(UserContext);
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (user?.token) {
      API.get('/api/results/my', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
        .then((res) => setResults(res.data))
        .catch((err) => console.error('Failed to fetch results', err));
    }
  }, [user]);

  return (
    <div className="performance-container">
      <h2>📈 My Performance</h2>
      {results.length === 0 ? (
        <p className="no-results">No performance data yet. Take some quizzes!</p>
      ) : (
        <table className="performance-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Level</th>
              <th>Topic</th>
              <th>Score</th>
              <th>Time Taken</th>
            </tr>
          </thead>
          <tbody>
            {results.map((r, index) => (
              <tr key={index}>
                <td>{new Date(r.createdAt).toLocaleDateString()}</td>
                <td>{r.level}</td>
                <td>{r.topic}</td>
                <td>{r.score} / {r.total}</td>
                <td>{r.timeTaken} mins</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyPerformance;
