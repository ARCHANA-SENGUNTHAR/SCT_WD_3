const express = require('express');
const router = express.Router();
const {
  addQuestion,
  getQuestionsByLevelAndTopic,
  getAllQuestions,
} = require('../controllers/questionController');

const verifyToken = require('../middleware/authMiddleware');

// For now allow adding without auth, you can lock later with verifyToken middleware
router.post('/add', addQuestion);
router.get('/:level/:topic', getQuestionsByLevelAndTopic);
// ✅ New route to get all questions
router.get('/admin/all', getAllQuestions);

module.exports = router;
