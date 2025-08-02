const mongoose = require('mongoose');
const QuestionSchema = new mongoose.Schema({
  level: Number,
  topic: String,
  question: String,
  options: [String],       // only for single & multi
  answer: mongoose.Schema.Types.Mixed, // string OR array
  type: String,            // 'single', 'multi', 'fill'
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});
