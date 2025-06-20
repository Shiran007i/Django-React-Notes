import { useState, useEffect, use } from 'react';
import api from '../api';
import Note from '../components/Note';
import '../styles/Home.css';

function Home() {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');

  useEffect(() => {
    getNote();
  }, []);

  const getNote = () => {
    api
      .get('/api/notes/')
      .then((res) => res.data)
      .then((data) => {
        setNotes(data);
        console.log(data);
      })
      .catch((err) => alert(err));
  };

  const deleteNote = (id) => {
    api
      .delete(`/api/notes/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) alert('Note deleted successfully');
        else alert('Failed to delete note');
        getNote();
      })
      .catch((err) => alert(err));
  };

  const createNote = (e) => {
    e.preventDefault();
    api
      .post('/api/notes/', { title, content })
      .then((res) => {
        if (res.status === 201) alert('Note created successfully');
        else alert('Failed to create note');
        getNote();
      })
      .catch((err) => alert(err));
  };

  return (
    <div>
      <div>
        <h2>Notes</h2>
        {notes.map((note) => (
          <div>
            <Note
              note={note}
              onDelete={deleteNote}
              key={note.id}
            />
          </div>
        ))}
      </div>
      <h2>Create Note</h2>
      <form onSubmit={createNote}>
        <label htmlFor='title'>Title:</label>
        <br />
        <input
          type='text'
          id='title'
          name='title'
          required
          placeholder='Title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <label htmlFor='content'>Content:</label>
        <br />
        <textarea
          id='content'
          name='content'
          required
          placeholder='Content'
          value={content}
          onChange={(e) => setContent(e.target.value)}></textarea>
        <br />
        <input
          type='submit'
          value='Submit'></input>
      </form>
    </div>
  );
}

export default Home;
