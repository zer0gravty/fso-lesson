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
});

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
