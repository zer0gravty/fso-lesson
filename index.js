const express = require("express");
const cors = require("cors");
const Note = require("./models/note");
const { json } = require("express");

const requestLogger = (request, _response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};

const unknownEndpoint = (_req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (err, _req, res, next) => {
  console.log(err);
  if (err.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' });
  }

  next(err);
}

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(cors());
app.use(requestLogger);
app.use(express.static("build"));

app.get("/", (req, res) => res.send('<h1>If you\'re seeing this message, something is wrong with the build file.</h1>'));

app.get("/api/notes", (req, res) => Note.find({}).then((notes) => res.json(notes)));

app.get("/api/notes/:id", (req, res, next) => {
  const note = Note.findById(req.params.id).then((note) => {
    if (note) {
      res.json(note);
    } else {
      res.status(404).end();
    }
  })
  .catch(err => next(err));
});

app.post("/api/notes", (req, res) => {
  const body = req.body;

  if (!body.content) {
    return res.status(400).json({ error: "content missing" });
  }

  const note = new Note({
    content: body.content,
    date: new Date(),
    important: body.important || false,
  });

  note.save().then((savedNote) => res.json(savedNote));
});

app.delete("/api/notes/:id", (req, res) => {
  Note.findByIdAndRemove(req.params.id).then(result => res.status(204).end()).catch(err => next(err));
});

app.put('/api/notes/:id', (req, res, next) => {
  const body = req.body;
  const note = {
    content: body.content,
    important: body.important
  }


  Note.findByIdAndUpdate(req.params.id, note, { new: true }).then(updatedNote => res.json(updatedNote)).catch(err => next(err));
});

app.use(unknownEndpoint);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}... `);
});
