import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AuthorPoster from '../components/AuthorPoster';

export default () => {
  const [Authors, setAuthors] = useState([]);
  const [Name, setName] = useState('');

  useEffect(() => {
    axios.get('/api/authors/').then((response) => {
      if (response.data.success) {
        setAuthors(response.data.authors);
      } else {
        alert('Failed to load authors');
      }
    });
  }, [Authors]);

  const onNameChange = (e) => {
    setName(e.currentTarget.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    axios
      .get('/api/authors', {
        params: {
          name: Name,
        },
      })
      .then((response) => {
        if (response.data.success) {
          setAuthors(response.data.authors);
        } else {
          alert('Failed to load authors');
        }
      });
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <div>Search Authors</div>
        <div>Name</div>
        <input onChange={onNameChange} value={Name} />
        <button onClick={onSubmit}>Search</button>
      </form>
      {Authors.map((author) => (
        <AuthorPoster key={author._id} id={author._id} name={author.name} />
      ))}
    </>
  );
};
