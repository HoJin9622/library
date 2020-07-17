import React from 'react';
import { Link } from 'react-router-dom';

export default ({ id, title }) => {
  return (
    <div>
      <Link to={`/books/${id}`}>{title}</Link>
    </div>
  );
};
