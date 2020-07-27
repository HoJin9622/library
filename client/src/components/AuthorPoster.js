import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

const AuthorPoster = ({ name, id }) => {
  const history = useHistory();

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
    <div>
      <form onSubmit={onDelete}>
        <div>{name}</div>
        <Link to={`/authors/${id}`}>View</Link>
        <Link to={`/authors/${id}/edit`}>Edit</Link>
        <button type='submit' onClick={onDelete}>
          Delete
        </button>
      </form>
    </div>
  );
};

export default React.memo(AuthorPoster);
