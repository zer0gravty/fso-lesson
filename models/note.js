const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  content: {
    required: true,
    minlength: 5,
    type: String,
  },
  date: {
    required: true,
    type: Date,
  },
  important: Boolean,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

noteSchema.set('toJSON', {
  transform: (_doc, obj) => ({
    id: obj._id.toString(),
    content: obj.content,
    date: obj.date,
    important: obj.important,
    user: obj.user,
  }),
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
