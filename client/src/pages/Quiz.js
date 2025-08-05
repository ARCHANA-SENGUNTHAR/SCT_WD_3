import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import sampleQuestions from "../data/sampleQuestions";

const Quiz = () => {
  const { level, topic } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [timer, setTimer] = useState(900); // 15 mins

  useEffect(() => {
    setQuestions(sampleQuestions); // Replace with backend later
  }, []);

  const handleChange = (qid, value, type) => {
    setAnswers(prev => {
      if (type === "multi") {
        const existing = prev[qid] || [];
        return {
          ...prev,
          [qid]: existing.includes(value)
            ? existing.filter(v => v !== value)
            : [...existing, value]
        };
      }
      return { ...prev, [qid]: value };
    });
  };

  const handleSubmit = useCallback(() => {
    navigate("/result", { state: { questions, answers } });
  }, [navigate, questions, answers]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [handleSubmit]);

  const formatTime = () => {
    const mins = Math.floor(timer / 60);
    const secs = timer % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div>
      <h2>Level {level} | Topic: {decodeURIComponent(topic)}</h2>
      <h3>⏱ Time Left: {formatTime()}</h3>

      {questions.map((q) => (
        <div key={q.id} style={{ marginBottom: "20px" }}>
          <h4>{q.question}</h4>

          {q.type === "single" &&
            q.options.map((opt) => (
              <label key={opt}>
                <input
                  type="radio"
                  name={`q-${q.id}`}
                  value={opt}
                  checked={answers[q.id] === opt}
                  onChange={() => handleChange(q.id, opt, "single")}
                />
                {opt}
              </label>
            ))}

          {q.type === "multi" &&
            q.options.map((opt) => (
              <label key={opt}>
                <input
                  type="checkbox"
                  name={`q-${q.id}`}
                  value={opt}
                  checked={answers[q.id]?.includes(opt)}
                  onChange={() => handleChange(q.id, opt, "multi")}
                />
                {opt}
              </label>
            ))}

          {q.type === "fill" && (
            <input
              type="text"
              placeholder="Type your answer"
              value={answers[q.id] || ""}
              onChange={(e) => handleChange(q.id, e.target.value, "fill")}
            />
          )}
        </div>
      ))}

      <button onClick={handleSubmit}>Submit Quiz</button>
    </div>
  );
};

export default Quiz;
