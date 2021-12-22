const notesRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const Note = require('../models/note');
const User = require('../models/user');

const getTokenFrom = (req) => {
  const authorization = req.get('authorization');
  if (authorization?.toLowerCase().startsWith('bearer')) {
    return authorization.substring(7);
  }
  return null;
};

notesRouter.get('/', async (_req, res) => {
  const notes = await Note.find({}).populate('user', { name: 1, username: 1 });
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
  const token = getTokenFrom(req);
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!token || !decodedToken) {
    return res.status(401).json({ error: 'invalid or missing token' });
  }
  const user = await User.findById(decodedToken.id);

  const note = new Note({
    content: body.content,
    date: new Date(),
    important: body.important || false,
    user: user._id,
  });

  const newNote = await note.save();
  await User.findByIdAndUpdate(decodedToken.id, { notes: user.notes.concat(newNote._id) });

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
