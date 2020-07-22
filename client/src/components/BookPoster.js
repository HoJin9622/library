import React from 'react';
import { Link } from 'react-router-dom';

export default ({ id, title, coverImagePath }) => {
  return (
    <div>
      <img src={coverImagePath} alt={title} />
      <Link to={`/books/${id}`}>{title}</Link>
    </div>
  );
};
