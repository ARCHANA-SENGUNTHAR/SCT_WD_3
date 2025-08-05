import { useEffect, useState, useContext, useCallback } from 'react';
import API from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const TimedTest = ({ level = 1 }) => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(600);
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  useEffect(() => {
    API.get(`/api/questions/level/${level}`)
      .then(res => {
        const selected = res.data.sort(() => 0.5 - Math.random()).slice(0, 15);
        setQuestions(selected);
      }).catch(err => {
        console.error('Failed to fetch test questions', err);
      });
  }, [level]);

  const handleChange = (q, value) => {
    setAnswers(prev => ({ ...prev, [q._id]: value }));
  };

  const handleSubmit = useCallback(() => {
    navigate('/result', {
      state: { questions, answers, level }
    });
  }, [navigate, questions, answers, level]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [handleSubmit]);

  const formatTime = () => {
    const mins = Math.floor(timeLeft / 60);
    const secs = timeLeft % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div>
      <h2>⏳ Timed Test - Level {level}</h2>
      <h3>🕒 Time Left: {formatTime()}</h3>

      {questions.map((q, idx) => (
        <div key={q._id}>
          <p><strong>Q{idx + 1}:</strong> {q.question}</p>

          {q.type === 'fill' ? (
            <input
              type="text"
              onChange={(e) => handleChange(q, e.target.value)}
            />
          ) : q.type === 'single' ? (
            q.options.map((opt, i) => (
              <label key={i}>
                <input
                  type="radio"
                  name={q._id}
                  value={opt}
                  checked={answers[q._id] === opt}
                  onChange={() => handleChange(q, opt)}
                />
                {opt}
              </label>
            ))
          ) : (
            q.options.map((opt, i) => (
              <label key={i}>
                <input
                  type="checkbox"
                  name={`${q._id}-${i}`}
                  value={opt}
                  checked={(answers[q._id] || []).includes(opt)}
                  onChange={(e) => {
                    const existing = answers[q._id] || [];
                    const newAns = e.target.checked
                      ? [...existing, opt]
                      : existing.filter((a) => a !== opt);
                    handleChange(q, newAns);
                  }}
                />
                {opt}
              </label>
            ))
          )}
        </div>
      ))}

      <button onClick={handleSubmit}>🚀 Submit Test</button>
    </div>
  );
};

export default TimedTest;
