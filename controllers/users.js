const usersRouter = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');

const SALT_ROUNDS = 10;

usersRouter.get('/', async (_req, res) => {
  const users = await User.find({}).populate('notes', { content: 1, date: 1 });
  res.json(users);
});

usersRouter.post('/', async (req, res) => {
  const { body } = req;

  const passwordHash = await bcrypt.hash(body.password, SALT_ROUNDS);

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  });

  const createdUser = await user.save();
  res.json(createdUser);
});

module.exports = usersRouter;
