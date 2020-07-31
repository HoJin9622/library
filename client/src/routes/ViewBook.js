import React, { useEffect, useCallback, useState } from 'react';
import axios from 'axios';
import { useParams, Link, useHistory } from 'react-router-dom';

export default () => {
  const history = useHistory();
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

  const onDelete = (e) => {
    e.preventDefault();

    axios
      .delete(`/api/books/${id}`, {
        params: {
          id: id,
        },
      })
      .then((response) => {
        if (response.data.success) {
          history.push('/books');
        } else {
          alert(response.data.err);
        }
      });
  };

  return (
    <>
      <form onSubmit={onDelete}>
        <div>{Title}</div>
        <img src={ImagePath} alt={Title} />
        <Link to={`/books/${id}/edit`}>Edit</Link>
        <button onClick={onDelete}>Delete</button>
        <Link to={`/authors/${authorId}`}>View Author</Link>
      </form>

      <article>
        <div>Author:{Name}</div>
        <div>Publish Date:{PublishDate}</div>
        <div>Page Count:{PageCount}</div>
        <div>Description:{Description}</div>
      </article>
    </>
  );
};
