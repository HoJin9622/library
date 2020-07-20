import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default () => {
  const [Title, setTitle] = useState('');
  const [Author, setAuthor] = useState('');
  const [Authors, setAuthors] = useState([]);
  const [PublishDate, setPublishDate] = useState('');
  const [PageCount, setPageCount] = useState(1);
  const [Cover, setCover] = useState('');
  const [Description, setDescription] = useState('');

  useEffect(() => {
    axios.get('/api/books/new').then((response) => {
      if (response.data.success) {
        setAuthors(response.data.params.authors);
      } else {
        alert('Failed to load books');
      }
    });
  }, []);

  const onTitleChange = (e) => {
    setTitle(e.currentTarget.value);
  };

  const onAuthorChange = (e) => {
    setAuthor(e.currentTarget.value);
  };

  const onPublishDateChange = (e) => {
    setPublishDate(e.currentTarget.value);
  };

  const onCoverChange = (e) => {
    setCover(e.currentTarget.value);
  };

  const onPageCountChange = (e) => {
    setPageCount(e.currentTarget.value);
  };

  const onDescriptionChange = (e) => {
    setDescription(e.currentTarget.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <h2>New Book</h2>
      <form onSubmit={onSubmit}>
        <div>Title</div>
        <input type='text' onChange={onTitleChange} value={Title} />
        <div>Author</div>
        <select onChange={onAuthorChange} value={Author}>
          {Authors.map((author) => (
            <option key={author._id}>{author.name}</option>
          ))}
        </select>
        <div>Publish Date</div>
        <input type='date' onChange={onPublishDateChange} value={PublishDate} />
        <div>Page Count</div>
        <input
          type='number'
          min='1'
          onChange={onPageCountChange}
          value={PageCount}
        />
        <div>Cover</div>
        <input type='file' onChange={onCoverChange} />
        <div>Description</div>
        <textarea onChange={onDescriptionChange} value={Description}></textarea>
        <Link to='/books'>Cancel</Link>
        <button type='submit' onClick={onSubmit} value={Cover}>
          Create
        </button>
      </form>
    </>
  );
};
