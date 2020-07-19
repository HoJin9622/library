import React from 'react';
import { Link } from 'react-router-dom';

export default ({ id, name }) => {
  return (
    <div>
      <Link to={`/authors/${id}`}>{name}</Link>
      <button>View</button>
      <button>Edit</button>
      <button>Delete</button>
    </div>
  );
};
