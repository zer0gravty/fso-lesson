import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

const NoteForm = ({ createNote }) => {
  const [newNote, setNewNote] = useState('');

  const addNote = (event) => {
    event.preventDefault();
    createNote({
      content: newNote,
      important: false,
    });
    setNewNote('');
  };

  return (
    <div className='form-div'>
      <h2>Create a New Note</h2>
      <form onSubmit={addNote}>
        <input
          id='input-new-note'
          type='text'
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
        />
        <Button id='btn-save-note' type='submit'>Save</Button>
      </form>
    </div>
  );
};

export default NoteForm;
