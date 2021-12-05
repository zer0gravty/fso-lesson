const notesRouter = require('express').Router();
const Note = require('../models/note');

notesRouter.get('/', (req, res) => res.send("<h1>If you're seeing this message, something is wrong with the build file.</h1>"));

notesRouter.get('/', (req, res) => Note.find({}).then((notes) => res.json(notes)));

notesRouter.get('/:id', (req, res, next) => {
  Note.findById(req.params.id)
    .then((note) => {
      if (note) {
        res.json(note);
      } else {
        res.status(404).end();
      }
    })
    .catch((err) => next(err));
});

notesRouter.post('/', (req, res, next) => {
  const { body } = req;

  const note = new Note({
    content: body.content,
    date: new Date(),
    important: body.important || false,
  });

  note
    .save()
    .then((savedNote) => res.json(savedNote))
    .catch((err) => next(err));
});

notesRouter.delete('/:id', (req, res, next) => {
  Note.findByIdAndRemove(req.params.id)
    .then(() => res.status(204).end())
    .catch((err) => next(err));
});

notesRouter.put('/:id', (req, res, next) => {
  const { body } = req;
  const note = {
    content: body.content,
    important: body.important,
  };

  Note.findByIdAndUpdate(req.params.id, note, { new: true })
    .then((updatedNote) => res.json(updatedNote))
    .catch((err) => next(err));
});

module.exports = notesRouter;
