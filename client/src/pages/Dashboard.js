import { useContext, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import { useNavigate, Link } from 'react-router-dom';
import quizData from '../data/quizData';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) return null;

  const handleStartQuiz = (level, topic) => {
    navigate(`/quiz/${level}/${encodeURIComponent(topic)}`);
  };

  return (
    <div className="dashboard-container">
      <h2 className="welcome-title">👋 Hello, <span>{user.username}</span>!</h2>
      <p className="instruction-text">Choose a level and topic to start your quiz adventure 🚀</p>

      <div className="card-container">
        {quizData.map(({ level, name, topics }) => (
          <div className={`card level-${level}`} key={level}>
            <h3>Level {level}: {name}</h3>
            <ul>
              {topics.map((topic) => (
                <li key={topic}>
                  {topic}
                  <button onClick={() => handleStartQuiz(level, topic)}>Start Quiz</button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="user-links">
        <Link to="/performance" className="performance-link">📈 My Performance</Link>

        {user?.isAdmin && (
          <div className="admin-links">
            <Link to="/admin/add">➕ Add Question</Link>
            <Link to="/admin/dashboard">📋 Manage Questions</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
