import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import BookPoster from '../components/BookPoster';

const Title = styled.h2`
  margin-top: 5rem;
  margin-bottom: 2rem;
  font-size: 2rem;
`;

const BooksContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 25px;
  width: 60%;
  position: relative;
`;

export default () => {
  const [Books, setBooks] = useState([]);

  useEffect(() => {
    axios.get('/api/').then((response) => {
      console.log(response);
      if (response.data.success) {
        setBooks(response.data.books);
      } else {
        alert('Failed to load books');
      }
    });
  }, []);

  return (
    <>
      <Title>Recently Added</Title>
      <BooksContainer>
        {Books.map((book) => (
          <BookPoster key={book._id} id={book._id} title={book.title} />
        ))}
      </BooksContainer>
    </>
  );
};
