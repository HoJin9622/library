import React, { useEffect, useCallback, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

export default () => {
  const { id } = useParams();
  const [Title, setTitle] = useState('');
  const [ImagePath, setImagePath] = useState('');
  const [Name, setName] = useState('');
  const [PublishDate, setPublishDate] = useState('');
  const [PageCount, setPageCount] = useState('');
  const [Description, setDescription] = useState('');
  const [authorId, setAuthorId] = useState('');

  const viewBookApi = useCallback(() => {
    axios
      .get(`/api/books/${id}`, {
        params: {
          id: id,
        },
      })
      .then((response) => {
        if (response.data.success) {
          const {
            title,
            coverImagePath,
            publishDate,
            pageCount,
            description,
            author,
          } = response.data.book;
          setTitle(title);
          setImagePath(coverImagePath);
          setName(author.name);
          setPublishDate(publishDate);
          setPageCount(pageCount);
          setDescription(description);
          setAuthorId(author._id);
        } else {
          alert('failed to load books');
        }
      });
  }, [id]);

  useEffect(() => {
    viewBookApi();
  }, [viewBookApi]);

  return (
    <>
      <div>{Title}</div>
      <img src={ImagePath} alt={Title} />
      <div>Edit</div>
      <div>Delete</div>
      <Link to={`/authors/${authorId}`}>View Author</Link>

      <article>
        <div>Author:{Name}</div>
        <div>Publish Date:{PublishDate}</div>
        <div>Page Count:{PageCount}</div>
        <div>Description:{Description}</div>
      </article>
    </>
  );
};
