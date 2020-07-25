import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import BookPoster from '../components/BookPoster';

export default () => {
  const { id } = useParams();
  const [Name, setName] = useState('');
  const [Books, setBooks] = useState([]);

  useEffect(() => {
    axios.get(`/api/authors/${id}`).then((response) => {
      if (response.data.success) {
        setName(response.data.author.name);
        setBooks(response.data.booksByAuthor);
      } else {
        alert('작가 불러오기에 실패하였습니다.');
      }
    });
  }, [id]);

  return (
    <>
      <div>{Name}</div>
      <button>Edit</button>
      <button>Delete</button>
      <div>Books By Author</div>
      {Books.map((book) => (
        <BookPoster
          key={book._id}
          id={book._id}
          title={book.title}
          coverImagePath={book.coverImagePath}
        />
      ))}
    </>
  );
};
