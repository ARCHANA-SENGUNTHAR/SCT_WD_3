import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <h1>
        Welcome to <span className="highlight">Javenture</span> Quiz Game 🎮
      </h1>
      <p className="subtitle">🔥 Fuel Your Brain with Java Challenges!</p>
    
      <div className="features">
        <div className="feature-card">🧠 Brain Teasing Questions</div>
        <div className="feature-card">🎯 Multiple Quiz Levels</div>
        <div className="feature-card">🏆 Track Your Progress</div>
        <div className="feature-card">🛠️ Admin Question Control</div>
      </div>

      <Link to="/register" className="get-started-btn">🚀 Get Started</Link>
    </div>
  );
};

export default Home;
