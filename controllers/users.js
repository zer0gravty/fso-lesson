const usersRouter = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');

usersRouter.get('/', async (_req, res) => {
  const users = await User.find({});
  res.json(users);
});

usersRouter.post('/', async (req, res) => {
  const { body } = req;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  });

  const createdUser = await user.save();
  res.json(createdUser);
});

module.exports = usersRouter;
