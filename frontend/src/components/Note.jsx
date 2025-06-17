import React from 'react';
import '../styles/Note.css';

function Note({ note, onDelete }) {
    const formttedDate = new Date(note.created_at).toLocaleDateString("en-US");
  return (
    <div className='note-container'>
      <h2>{note.title}</h2>
      <p className='note-title'>{note.title}</p>
      <p className='note-content'>{note.content}</p>
      <p className='note-date'>{formttedDate}</p>
      <button
        className='delete-button'
        onClick={() => onDelete(note.id)}>
        Delete
      </button>
    </div>
  );
}

export default Note;
