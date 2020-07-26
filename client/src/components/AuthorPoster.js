import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';

const AuthorPoster = (props) => {
  const onDelete = (e) => {
    e.preventDefault();

    axios
      .delete(`/api/authors/${props.id}`, {
        params: {
          id: props.id,
        },
      })
      .then((response) => {
        if (response.data.success) {
          props.history.push('/authors');
        } else {
          alert(response.data.err);
        }
      });
  };

  return (
    <div>
      <form onSubmit={onDelete}>
        <div>{props.name}</div>
        <Link to={`/authors/${props.id}`}>View</Link>
        <button>Edit</button>
        <button type='submit' onClick={onDelete}>
          Delete
        </button>
      </form>
    </div>
  );
};

export default withRouter(AuthorPoster);
