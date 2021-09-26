const express = require('express');
const cors = require('cors');

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    date: "2019-05-30T17:30:31.098Z",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    date: "2019-05-30T18:39:34.091Z",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2019-05-30T19:20:14.298Z",
    important: true,
  },
];

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method);
  console.log('Path:  ', request.path);
  console.log('Body:  ', request.body);
  console.log('---');
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(cors());
app.use(requestLogger);
app.use(express.static('build'));

// app.get('/', (req, res) => {
//     res.send('<h1>Hello World</h1>');
// });

app.get('/api/notes', (req, res) => {
    res.json(notes);
});

app.get('/api/notes/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const note = notes.find(note => note.id === id);
    return note ? res.json(note) : res.status(404).end();
});

app.post('/api/notes', (req, res) => {
    const maxId = notes.length > 0
        ? Math.max(...notes.map(n => n.id))
        : 0
    
    const body = req.body;

    if (!body.content) {
        return res.status(400).json({ error: 'content missing'});
    }

    const note = {
        content: body.content,
        date: new Date(),
        id: maxId + 1,
        important: body.important || false
    }

    notes = notes.concat(note);

    res.json(note);
});

app.delete('/api/notes/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    notes = notes.filter(note => note.id !== id);

    res.status(204).end();
});

app.use(unknownEndpoint);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}... `)
});
