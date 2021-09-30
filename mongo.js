const mongoose = require('mongoose');
const dotenv = require('dotenv')
dotenv.config()

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>');
    process.exit(1);
}

const password = process.argv[2];
const user = process.env.MONGO_USER;
const db = process.env.MONGO_DB;
const url = process.env.MONGO_URL;

const url = `mongodb+srv://${user}:${password}@${url}/${db}?retryWrites=true`;
mongoose.connect(url);

const noteSchema = new mongoose.Schema({
    content: String,
    date: Date,
    important: Boolean,
});

const Note = mongoose.model('Note', noteSchema);

const note = new Note({
    content: "HTML is super easy",
    date: new Date(),
    important: true,
});

// note.save().then(result => {
//     console.log('note saved!');
//     mongoose.connection.close();
// });

Note.find({}).then(result => {
    result.forEach(note => {
        console.log(note);
    });
    mongoose.connection.close();
});
