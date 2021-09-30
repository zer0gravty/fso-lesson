const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const password = process.env.MONGO_PW;
const user = process.env.MONGO_USER;
const db = process.env.MONGO_DB;
const mongo_url = process.env.MONGO_URL;

const url = `mongodb+srv://${user}:${password}@${mongo_url}/${db}?retryWrites=true`;

console.log('Connecting to Mongo...');

mongoose.connect(url)
    .then(result => {
        console.log('Connection successful.')
    })
    .catch((error) => {
        console.error('Error connecting to Mongo:\n', error);
    });

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
});

noteSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;
