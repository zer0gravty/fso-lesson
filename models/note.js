const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const PASSWORD = process.env.MONGO_PW;
const USER = process.env.MONGO_USER;
const DB = process.env.MONGO_DB;
const MONGO_URL = process.env.MONGO_URL;

const url = `mongodb+srv://${USER}:${PASSWORD}@${MONGO_URL}/${DB}?retryWrites=true`;

console.log('Connecting to MongPASSWORD...');
mongoose.connect(url)
  .then(() => {
    console.log('Connection successful.');
  })
  .catch((error) => {
    console.error('Error connecting to Mongo:\n', error);
  });

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
