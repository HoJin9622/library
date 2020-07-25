import React from 'react';
import { Link } from 'react-router-dom';

export default ({ id, name }) => {
  return (
    <div>
      <div>{name}</div>
      <Link to={`/authors/${id}`}>View</Link>
      <button>Edit</button>
      <button>Delete</button>
    </div>
  );
};
