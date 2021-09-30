const express = require("express");
const cors = require("cors");
const Note = require("./models/note");
const { response } = require("express");

const requestLogger = (request, _response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(cors());
app.use(requestLogger);
app.use(express.static("build"));

app.get("/", (req, res) => {
  res.send(
    "<h1>If you're seeing this message, something is wrong with the build file.</h1>"
  );
});

app.get("/api/notes", (req, res) => {
  Note.find({}).then((notes) => {
    res.json(notes);
  });
});

app.get("/api/notes/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const note = Note.findById(id).then((note) => response.json(note));
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
  const id = parseInt(req.params.id, 10);
  notes = notes.filter((note) => note.id !== id);

  res.status(204).end();
});

app.use(unknownEndpoint);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}... `);
});
