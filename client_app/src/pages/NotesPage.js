import React, { forwardRef, useState } from 'react';
import NoteForm from '../components/NoteForm';
import Note from '../components/Note';
import Togglable from '../components/Togglable';

const NotesPage = forwardRef((props, ref) => {
  const { notes, addNote, toggleImportanceOf } = props;
  const [showAll, setShowAll] = useState(true);
  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  return (
    <section>
      <h1>Notes</h1>
      <Togglable btnLabel={'Display Notes Form'} ref={ref}>
        <NoteForm createNote={addNote} />
      </Togglable>

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
    </section>
  );
});

NotesPage.displayName = 'NotesPage';

export default NotesPage;
