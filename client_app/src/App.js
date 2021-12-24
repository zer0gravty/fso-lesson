import React, { useState, useEffect, useRef } from 'react';
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
  const [user, setUser] = useState(null);

  const noteFormRef = useRef(null);

  useEffect(() => {
    noteService.getAll().then((initialNotes) => {
      setNotes(initialNotes);
    });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser');
    if (loggedUserJSON) {
      const userObj = JSON.parse(loggedUserJSON);
      setUser(userObj);
      noteService.setToken(userObj.token);
    }
  }, []);

  const addNote = (noteObject) => {
    noteFormRef.current.toggleVisibility();
    noteService
      .create(noteObject)
      .then((currentNotes) => {
        setNotes(notes.concat(currentNotes));
      })
      .catch(() => {
        setErrorMessage('Error adding note.');
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
        setNotes(notes.map((n) => (n.id !== id ? note : updatedNote)));
      })
      .catch(() => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server.`,
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 3000);
        setNotes(notes.filter((n) => n.id !== id));
      });
  };

  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  const handleLogin = async (userObj) => {
    try {
      const validUser = await loginService.login(userObj);
      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(validUser));

      noteService.setToken(validUser.token);
      setUser(validUser);
    } catch (e) {
      setErrorMessage('Wrong credentials.');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      {user === null ? (
        <Togglable btnLabel={'Display Login Form'}>
          <LoginForm login={handleLogin} />
        </Togglable>
      ) : (
        <div>
          <p>{user.username} is logged in.</p>
          <Togglable btnLabel={'Display Notes Form'} ref={noteFormRef}>
            <NoteForm createNote={addNote} />
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
