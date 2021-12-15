const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Note = require('../models/note');

const initialNotes = [
  {
    content: 'HTML is easy',
    date: new Date(),
    important: false,
  },
  {
    content: 'Browser can execute only Javascript',
    date: new Date(),
    important: true,
  },
];

beforeEach(async () => {
  await Note.deleteMany({});
  await Note.insertMany(initialNotes);
});

afterAll(() => mongoose.connection.close());

const api = supertest(app);

test('notes are returned as json', async () => {
  await api.get('/api/notes').expect(200).expect('Content-Type', /application\/json/);
});

test('all notes are returned', async () => {
  const response = await api.get('/api/notes');

  expect(response.body).toHaveLength(initialNotes.length);
});

test('a specific note is within the returned notes', async () => {
  const response = await api.get('/api/notes');
  const contents = response.body.map((r) => r.content);

  expect(contents).toContain('Browser can execute only Javascript');
});

test('a valid note can be added', async () => {
  const newNote = {
    content: 'async/await simplifies making async calls',
    important: true,
  };

  await api.post('/api/notes').send(newNote).expect(200).expect('Content-Type', /application\/json/);
  const response = await api.get('/api/notes');
  const contents = await response.body.map((r) => r.content);

  expect(response.body).toHaveLength(initialNotes.length + 1);
  expect(contents).toContain('async/await simplifies making async calls');
});

test('note without content is not added', async () => {
  const newNote = {
    important: true,
  };

  await api.post('/api/notes').send(newNote).expect(400);

  const response = await api.get('/api/notes');
  expect(response.body).toHaveLength(initialNotes.length);
});

test('a specific note can be viewed', async () => {
  const response = await api.get('/api/notes');
  await api.get(`/api/notes/${response.body[0].id}`).expect(200).expect('Content-Type', /application\/json/);
});

test('a note can be deleted', async () => {
  const responseOne = await api.get('/api/notes');
  const noteToDelete = responseOne.body[0];

  await api.delete(`/api/notes/${noteToDelete.id}`).expect(204);
  const responseTwo = await api.get('/api/notes');
  expect(responseTwo.body).toHaveLength(initialNotes.length - 1);

  const contents = responseTwo.body.map((r) => r.content);
  expect(contents).not.toContain(noteToDelete.content);
});
