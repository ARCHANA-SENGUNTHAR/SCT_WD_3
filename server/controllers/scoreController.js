const User = require('../models/User');

const submitScore = async (req, res) => {
  try {
    const { level, topic, score, timeTaken } = req.body;
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.scores.push({
      level,
      topic,
      score,
      timeTaken,
    });

    await user.save();
    res.status(200).json({ message: 'Score submitted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error submitting score', error: err.message });
  }
};

const getUserScores = async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId).select('scores');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json(user.scores);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching scores', error: err.message });
  }
};

module.exports = { submitScore, getUserScores };
