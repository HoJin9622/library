import React from 'react';
import { Link } from 'react-router-dom';

const BookPoster = ({ id, title, coverImagePath }) => {
  return (
    <div>
      <img src={coverImagePath} alt={title} />
      <Link to={`/books/${id}`}>{title}</Link>
    </div>
  );
};

export default React.memo(BookPoster);
