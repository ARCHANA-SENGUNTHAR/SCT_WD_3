const express = require('express');
const router = express.Router();
const Result = require('../models/Result');
const { protect } = require('../middleware/authMiddleware');


// Save result
router.post('/', protect, async (req, res) => {
  try {
    const { level, topic, score, total } = req.body;

    const result = new Result({
      user: req.user.id,
      level,
      topic,
      score,
      total
    });

    await result.save();
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});

// Get results of logged-in user
router.get('/my', protect, async (req, res) => {
  try {
    const results = await Result.find({ user: req.user.id }).sort({ date: -1 });
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});

module.exports = router;
