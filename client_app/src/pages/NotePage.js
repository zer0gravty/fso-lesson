import React from 'react';
import { useParams } from 'react-router-dom';

const NotePage = ({ notes }) => {
  const { id } = useParams();
  const note = notes.find((n) => n.id === id);

  const noteStyle = {
    margin: '1rem 0',
  };

  return (
    <div style={noteStyle}>
      <h2>{note.content}</h2>
      <p>Author: {note.author}</p>
      <p>
        Important:
        <strong>{note.important.toString()}</strong>
      </p>
      <p>{note.date}</p>
    </div>
  );
};

export default NotePage;
