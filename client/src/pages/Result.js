import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import API from '../api/axios';
import { UserContext } from '../context/UserContext';

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const { questions, answers, level, topic } = location.state || {};

  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);

  useEffect(() => {
    if (!questions || !answers) {
      navigate('/');
      return;
    }

    let tempScore = 0;
    let correct = 0;

    questions.forEach((q) => {
      const userAns = answers[q._id];
      if (q.type === 'fill') {
        if (userAns?.toLowerCase().trim() === q.answer.toLowerCase().trim()) {
          tempScore += 1;
          correct++;
        }
      } else if (q.type === 'single') {
        if (userAns === q.answer) {
          tempScore += 1;
          correct++;
        }
      } else if (q.type === 'multi') {
        const correctOptions = q.answer.sort().join(',');
        const userOptions = (userAns || []).sort().join(',');
        if (correctOptions === userOptions) {
          tempScore += 1;
          correct++;
        }
      }
    });

    setScore(tempScore);
    setCorrectCount(correct);

    if (user && user.token) {
      API.post(
        '/api/results',
        {
          level,
          topic,
          score: tempScore,
          total: questions.length,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      ).then(() => console.log('Result saved!'))
       .catch((err) => console.error('Failed to save result:', err));
    }
  }, [questions, answers, navigate, level, topic, user]);

  const total = questions?.length || 0;

  return (
    <div>
      <h2>🎉 Quiz Completed!</h2>
      {/* (Same result display and buttons) */}
    </div>
  );
};

export default Result;
