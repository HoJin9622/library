import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import BookPoster from '../components/BookPoster';

const BooksContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 25px;
  width: 60%;
  position: relative;
`;

const Books = () => {
  const [Books, setBooks] = useState([]);
  const [Title, setTitle] = useState('');
  const [AfterDate, setAfterDate] = useState('');
  const [BeforeDate, setBeforeDate] = useState('');

  useEffect(() => {
    axios.get('/api/books/').then((response) => {
      if (response.data.success) {
        setBooks(response.data.books);
      } else {
        alert('Failed to load books');
      }
    });
  }, []);

  const onTitleChange = (e) => {
    setTitle(e.currentTarget.value);
  };

  const onAfterDateChange = (e) => {
    setAfterDate(e.currentTarget.value);
  };

  const onBeforeDateChange = (e) => {
    setBeforeDate(e.currentTarget.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    axios
      .get('/api/books', {
        params: {
          title: Title,
          publishedAfter: AfterDate,
          publishedBefore: BeforeDate,
        },
      })
      .then((response) => {
        if (response.data.success) {
          setBooks(response.data.books);
        } else {
          alert('Failed to load books');
        }
      });
  };

  return (
    <>
      <div>Search Book</div>
      <form onSubmit={onSubmit}>
        <div>Title</div>
        <input onChange={onTitleChange} value={Title} />
        <div>Published After</div>
        <input type='date' onChange={onAfterDateChange} value={AfterDate} />
        <div>Published Before</div>
        <input type='date' onChange={onBeforeDateChange} value={BeforeDate} />
        <button onClick={onSubmit}>Search</button>
      </form>

      <BooksContainer>
        {Books.map((book) => (
          <BookPoster
            key={book._id}
            id={book._id}
            title={book.title}
            coverImagePath={book.coverImagePath}
          />
        ))}
      </BooksContainer>
    </>
  );
};

export default React.memo(Books);
