const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
  content: {
    type: String,
    default: ''
  },
  history: [
    {
      content: String,
      timestamp: {
        type: Date,
        default: Date.now
      }
    }
  ]
});

module.exports = mongoose.model('Note', NoteSchema);
