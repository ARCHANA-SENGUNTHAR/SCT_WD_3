import { useState, useContext } from 'react';
import API from '../api/axios';
import { UserContext } from '../context/UserContext';
import './AdminQuestionForm.css';

const AdminQuestionForm = () => {
  const { user } = useContext(UserContext);
  const [formData, setFormData] = useState({
    level: 1,
    topic: '',
    question: '',
    type: 'single',
    options: ['', '', '', ''],
    answer: '',
  });

  const handleChange = (e, index = null) => {
    const { name, value } = e.target;
    if (name === 'options') {
      const newOptions = [...formData.options];
      newOptions[index] = value;
      setFormData({ ...formData, options: newOptions });
    } else if (name === 'answer' && formData.type === 'multi') {
      const selected = formData.answer || [];
      const updatedAnswer = selected.includes(value)
        ? selected.filter((a) => a !== value)
        : [...selected, value];
      setFormData({ ...formData, answer: updatedAnswer });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      level: formData.level,
      topic: formData.topic,
      type: formData.type,
      questionText: formData.question, // backend expects 'questionText'
      options: formData.options,
      correctAnswer: formData.answer  // backend expects 'correctAnswer'
    };

    try {
      await API.post('/api/admin/add', payload, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      alert('✅ Question added!');
      setFormData({
        level: 1,
        topic: '',
        question: '',
        type: 'single',
        options: ['', '', '', ''],
        answer: '',
      });
    } catch (err) {
      console.error(err);
      alert('❌ Failed to add question');
    }
  };

  return (
    <div className="admin-form-container">
      <h2>➕ Add New Question</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Level:</label>
          <input
            type="number"
            name="level"
            value={formData.level}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Topic:</label>
          <input
            type="text"
            name="topic"
            value={formData.topic}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Question:</label>
          <textarea
            name="question"
            value={formData.question}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Type:</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
          >
            <option value="single">Single Choice</option>
            <option value="multi">Multiple Choice</option>
            <option value="fill">Fill in the Blank</option>
          </select>
        </div>

        {(formData.type === 'single' || formData.type === 'multi') &&
          formData.options.map((opt, idx) => (
            <div key={idx}>
              <label>Option {idx + 1}:</label>
              <input
                type="text"
                name="options"
                value={opt}
                onChange={(e) => handleChange(e, idx)}
              />
              {(formData.type === 'single') && (
                <input
                  type="radio"
                  name="answer"
                  value={opt}
                  checked={formData.answer === opt}
                  onChange={handleChange}
                />
              )}
              {(formData.type === 'multi') && (
                <input
                  type="checkbox"
                  name="answer"
                  value={opt}
                  checked={formData.answer.includes(opt)}
                  onChange={handleChange}
                />
              )}
            </div>
          ))
        }

        {formData.type === 'fill' && (
          <div>
            <label>Answer:</label>
            <input
              type="text"
              name="answer"
              value={formData.answer}
              onChange={handleChange}
            />
          </div>
        )}

        <button type="submit">✅ Add Question</button>
      </form>
    </div>
  );
};

export default AdminQuestionForm;
