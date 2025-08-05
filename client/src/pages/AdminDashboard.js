import { useEffect, useState, useContext } from 'react';
import API from '../api/axios';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch all questions
  const fetchQuestions = async () => {
    try {
      const res = await API.get('/admin/all');
      setQuestions(res.data);
    } catch (err) {
      console.error('Error fetching questions:', err);
      toast.error("Failed to load questions");
    }
  };

  useEffect(() => {
    if (!user || !user.isAdmin) {
      navigate('/admin/login');
    } else {
      fetchQuestions();
    }
  }, [user, navigate]);

  // Delete question
  const deleteQuestion = async (id) => {
    if (!window.confirm("Are you sure you want to delete this question?")) return;
    try {
      await API.delete(`/admin/${id}`);
      setQuestions((prev) => prev.filter((q) => q._id !== id));
      toast.success("Question deleted");
    } catch (err) {
      console.error('Failed to delete question:', err);
      toast.error("Delete failed");
    }
  };

  // Filter questions by search term
  const filteredQuestions = questions.filter((q) =>
    q.question?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    q.topic?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    q.level?.toString().includes(searchTerm)
  );

  return (
    <div style={{ padding: '2rem' }}>
      <h2>📋 All Questions</h2>

      <input
        type="text"
        placeholder="🔍 Search by question, topic, or level"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ padding: '8px', width: '50%', marginBottom: '1rem' }}
      />

      {filteredQuestions.length === 0 ? (
        <p>No matching questions found.</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Level</th>
              <th>Topic</th>
              <th>Type</th>
              <th>Question</th>
              <th>Options</th>
              <th>Answer</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredQuestions.map((q) => (
              <tr key={q._id}>
                <td>{q.level}</td>
                <td>{q.topic}</td>
                <td>{q.type}</td>
               <td>{q.questionText}</td>
               <td>{q.options?.join(', ') || '-'}</td>
               <td>{Array.isArray(q.correctAnswer) ? q.correctAnswer.join(', ') : q.correctAnswer}</td>
                <td>
                  <button onClick={() => deleteQuestion(q._id)}>🗑️ Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminDashboard;
