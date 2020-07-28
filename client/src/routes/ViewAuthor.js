import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useHistory } from 'react-router';
import axios from 'axios';
import BookPoster from '../components/BookPoster';
import { Link } from 'react-router-dom';

export default () => {
  const { id } = useParams();
  const history = useHistory();
  const [Name, setName] = useState('');
  const [Books, setBooks] = useState([]);

  const viewAuthorApi = useCallback(() => {
    axios.get(`/api/authors/${id}`).then((response) => {
      if (response.data.success) {
        setName(response.data.author.name);
        setBooks(response.data.booksByAuthor);
      } else {
        alert('작가 불러오기에 실패하였습니다.');
      }
    });
  }, [id]);

  useEffect(() => {
    viewAuthorApi();
  }, [viewAuthorApi]);

  const onDelete = (e) => {
    e.preventDefault();

    axios
      .delete(`/api/authors/${id}`, {
        params: {
          id: id,
        },
      })
      .then((response) => {
        if (response.data.success) {
          history.push('/authors');
        } else {
          alert(response.data.err);
        }
      });
  };

  return (
    <>
      <form onSubmit={onDelete}>
        <div>{Name}</div>
        <Link to={`/authors/${id}/edit`}>Edit</Link>
        <button type='submit' onClick={onDelete}>
          Delete
        </button>
      </form>
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
