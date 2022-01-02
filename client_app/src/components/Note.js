import React from 'react';
import { Link } from 'react-router-dom';

const Note = ({ note, toggleImportance }) => {
  const label = note.important
    ? 'make not important'
    : 'make important';

  return (
    <>
      <Link to={`/notes/${note.id}`}>{note.content}</Link>
      <button onClick={toggleImportance}>{label}</button>
    </>
  );
};

export default Note;
