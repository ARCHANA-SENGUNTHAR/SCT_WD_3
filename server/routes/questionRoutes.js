// Get 15 random questions for level-end test

router.get('/level/:level', async (req, res) => {
  const level = parseInt(req.params.level);
  try {
    const questions = await Question.find({ level });
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch level questions' });
  }
});
