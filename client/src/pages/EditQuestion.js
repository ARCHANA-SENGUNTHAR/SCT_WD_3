import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api/axios';
import { UserContext } from '../context/UserContext';

const EditQuestion = () => {
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    API.get(`/admin/${id}`)
      .then((res) => setFormData(res.data))
      .catch((err) => alert("Failed to fetch question"));
  }, [id]);

  const handleChange = (e, index = null) => {
    const { name, value } = e.target;
    if (name === 'options') {
      const newOptions = [...formData.options];
      newOptions[index] = value;
      setFormData({ ...formData, options: newOptions });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/admin/${id}`, formData);
      alert("✅ Question updated!");
      navigate('/admin/questions');
    } catch (err) {
      alert("❌ Failed to update");
    }
  };

  if (!formData) return <p>Loading...</p>;

  return (
    <div>
      <h2>✏️ Edit Question</h2>
      <form onSubmit={handleSubmit}>
        <input name="question" value={formData.question} onChange={handleChange} />
        {formData.options.map((opt, i) => (
          <input key={i} name="options" value={opt} onChange={(e) => handleChange(e, i)} />
        ))}
        <input name="answer" value={formData.answer} onChange={handleChange} />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default EditQuestion;
