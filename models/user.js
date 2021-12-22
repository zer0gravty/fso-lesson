const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },
  name: String,
  passwordHash: String,
  notes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Note',
    },
  ],
});

userSchema.set('toJSON', {
  transform: (_doc, obj) => ({
    id: obj._id.toString(),
    username: obj.username,
    name: obj.name,
    notes: obj.notes,
  }),
});

const User = mongoose.model('User', userSchema);

userSchema.plugin(uniqueValidator);

module.exports = User;
