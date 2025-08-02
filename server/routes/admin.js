const express = require('express');
const router = express.Router();
const Question = require('../models/Question');
const { protect } = require('../middleware/authMiddleware');

// ✅ Add a new question
router.post('/add', protect, async (req, res) => {
  const { level, topic, question, options, answer, type } = req.body;
  try {
    const newQuestion = new Question({
      level, topic, question, options, answer, type,
      createdBy: req.user._id
    });
    await newQuestion.save();
    res.status(201).json({ message: 'Question added successfully!' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to add question' });
  }
});

// ✅ Get all questions
router.get('/all', protect, async (req, res) => {
  try {
    const questions = await Question.find().sort({ createdAt: -1 });
    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching questions' });
  }
});

// ✅ Delete question by ID
router.delete('/:id', protect, async (req, res) => {
  try {
    await Question.findByIdAndDelete(req.params.id);
    res.json({ message: 'Question deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Delete failed' });
  }
});

module.exports = router;
