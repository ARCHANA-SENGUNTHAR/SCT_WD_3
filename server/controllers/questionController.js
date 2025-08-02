const Question = require('../models/Question');

// Add a question
const addQuestion = async (req, res) => {
  try {
    const { level, topic, type, questionText, options, correctAnswer, timeLimit } = req.body;

    const newQuestion = new Question({
      level,
      topic,
      type,
      questionText,
      options: options || [],
      correctAnswer,
      timeLimit: timeLimit || 60
    });

    await newQuestion.save();
    res.status(201).json({ message: 'Question added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding question', error: error.message });
  }
};

// Get questions by level and topic
const getQuestionsByLevelAndTopic = async (req, res) => {
  try {
    const { level, topic } = req.params;

    const questions = await Question.find({
      level: parseInt(level),
      topic: topic
    });

    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching questions', error: error.message });
  }
};

// Get all questions (for admin)
const getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching all questions', error: error.message });
  }
};

module.exports = {
  addQuestion,
  getQuestionsByLevelAndTopic,
  getAllQuestions
};
