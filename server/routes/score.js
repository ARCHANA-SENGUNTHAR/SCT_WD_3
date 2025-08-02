const express = require('express');
const router = express.Router();
const { submitScore, getUserScores } = require('../controllers/scoreController');
const { protect } = require('../middleware/authMiddleware');

router.post('/submit', protect, submitScore);
router.get('/user/:userId', protect, getUserScores);


module.exports = router;
