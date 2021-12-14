const notesRouter = require('express').Router();
const Note = require('../models/note');

notesRouter.get('/', async (_req, res) => {
  const notes = await Note.find({});
  res.json(notes);
});

notesRouter.get('/:id', async (req, res) => {
  const note = await Note.findById(req.params.id);
  if (note) {
    res.json(note);
  } else {
    res.status(404).end();
  }
});

notesRouter.post('/', async (req, res) => {
  const { body } = req;

  const note = new Note({
    content: body.content,
    date: new Date(),
    important: body.important || false,
  });

  const newNote = await note.save();
  res.json(newNote);
});

notesRouter.delete('/:id', async (req, res) => {
  await Note.findByIdAndRemove(req.params.id);
  res.status(204).end();
});

notesRouter.put('/:id', async (req, res) => {
  const { body } = req;
  const note = {
    content: body.content,
    important: body.important,
  };

  const updatedNote = await Note.findByIdAndUpdate(req.params.id, note, { new: true });
  res.json(updatedNote);
});

module.exports = notesRouter;
