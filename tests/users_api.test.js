const mongoose = require('mongoose');
const supertest = require('supertest');
const bcrypt = require('bcrypt');
const app = require('../app');
const User = require('../models/user');

const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});

  const passwordHash = await bcrypt.hash('root', 10);
  const user = new User({ username: 'root', passwordHash });
  await user.save();
});

afterAll((done) => {
  mongoose.connection.close();
  done();
});

describe('when there is initially one user in the db', () => {
  test('successful creation of a new user', async () => {
    const firstResponse = await User.find({});
    const usersAtStart = firstResponse.map((u) => u.toJSON());

    const newUser = {
      username: 'bwayne',
      password: 'batman',
      name: 'Bruce Wayne',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const secondResponse = await User.find({});
    const usersAtEnd = secondResponse.map((u) => u.toJSON());

    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain('bwayne');
  });

  test('creation fails with proper statuscode and message if username already taken', async () => {
    let response = await User.find({});
    const usersAtStart = response.map((u) => u.toJSON());

    const newUser = {
      username: 'root',
      name: 'superuser',
      password: 'root',
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);
    expect(result.body.error).toContain('`username` to be unique');

    response = await User.find({});
    const usersAtEnd = response.map((u) => u.toJSON());
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });
});
