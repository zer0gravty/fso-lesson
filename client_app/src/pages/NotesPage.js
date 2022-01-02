import React, { forwardRef, useState } from 'react';
import { Table } from 'react-bootstrap';
import NoteForm from '../components/NoteForm';
import Note from '../components/Note';
import Togglable from '../components/Togglable';

const NotesPage = forwardRef((props, ref) => {
  const { notes, addNote, toggleImportanceOf } = props;
  const [showAll, setShowAll] = useState(true);
  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  return (
    <section>
      <h2>Notes</h2>
      <Togglable btnLabel={'Display Notes Form'} ref={ref}>
        <NoteForm createNote={addNote} />
      </Togglable>

      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <Table striped>
        <tbody>
          {notesToShow.map((note) => (
            <tr key={note.id}>
              <td>
                <Note
                  note={note}
                  toggleImportance={() => toggleImportanceOf(note.id)}
                />
              </td>
              <td>
                {note.user.name}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </section>
  );
});

NotesPage.displayName = 'NotesPage';

export default NotesPage;
