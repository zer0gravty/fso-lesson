import React, { useState, useEffect } from 'react';
import Note from './components/Note';
import Togglable from './components/Togglable';
import Notification from './components/Notification';
import NoteForm from './components/NoteForm';
import LoginForm from './components/LoginForm';
import Footer from './components/Footer';
import noteService from './services/notes';
import loginService from './services/login';
import './App.css';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    noteService.getAll().then((initialNotes) => {
      setNotes(initialNotes);
    });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      noteService.setToken(user.token);
    }
  }, []);

  const createNote = (event) => {
    noteService
      .create(noteObject)
      .then((currentNotes) => {
        setNotes(notes.concat(currentNotes));
        setNewNote('');
      })
      .catch(() => {
        setErrorMessage(`Error adding note.`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 3000);
      });
  };

  const toggleImportanceOf = (id) => {
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };

    noteService
      .update(id, changedNote)
      .then((updatedNote) => {
        setNotes(notes.map((note) => (note.id !== id ? note : updatedNote)));
      })
      .catch((err) => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server.`
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 3000);
        setNotes(notes.filter((n) => n.id !== id));
      });
  };

  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });

      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user));

      noteService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (e) {
      setErrorMessage('Wrong credentials.');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const loginForm = () => {
    return (
      <Togglable btnLabel={'Display Login Form'}>
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={(e) => setUsername(e.target.value)}
          handlePasswordChange={(e) => setPassword(e.target.value)}
          handleSubmit={handleLogin}
        />
      </Togglable>
    );
  };

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>{user.username} is logged in.</p>
          <Togglable btnLabel={'Display Create Note Form'}>
            <NoteForm createNote={createNote} />
          </Togglable>
        </div>
      )}
      <br />

      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        ))}
      </ul>
      <Footer />
    </div>
  );
};

export default App;
