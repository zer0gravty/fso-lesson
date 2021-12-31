import React, { useState, useEffect, useRef } from 'react';
import { Route, Routes } from 'react-router-dom';
// components
import NavigationBar from './components/NavigationBar';
import Notification from './components/Notification';
import Footer from './components/Footer';
// pages
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import NotesPage from './pages/NotesPage';
import NotePage from './pages/NotePage';
// services
import noteService from './services/notes';
import loginService from './services/login';
// styling
import './App.css';

const App = () => {
  const [notes, setNotes] = useState([]);
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

  const handleLogin = async (userObj) => {
    try {
      const validUser = await loginService.login(userObj);
      window.localStorage.setItem(
        'loggedNoteappUser',
        JSON.stringify(validUser),
      );

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
      <Notification message={errorMessage} />
      <NavigationBar user={user} />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route
          path='/login'
          element={<LoginPage user={user} handleLogin={handleLogin} />}
        />
        <Route
          path='/notes'
          element={
            <NotesPage
              notes={notes}
              addNote={addNote}
              toggleImportanceOf={toggleImportanceOf}
              ref={noteFormRef}
            />
          }
        />
        <Route path='/notes/:id' element={<NotePage notes={notes} />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
