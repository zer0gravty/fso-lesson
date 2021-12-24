import React, { useState } from 'react';

const NoteForm = ({ createNote }) => {
  const [newNote, setNewNote] = useState('');

  const addNote = (event) => {
    event.preventDefault();
    createNote({
      content: newNote,
      important: Math.random() < 0.5,
    });
    setNewNote('');
  };

  return (
    <div>
      <h2>Create a New Note</h2>
      <form onSubmit={addNote}>
        <input
          type='text'
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
        />
        <button type='submit'>Save</button>
      </form>
    </div>
  );
};

export default NoteForm;
