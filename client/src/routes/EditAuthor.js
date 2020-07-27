import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useParams, Link, useHistory } from 'react-router-dom';

export default () => {
  const { id } = useParams();
  const history = useHistory();
  const [Name, setName] = useState('');

  const authorEditApi = useCallback(() => {
    axios.get(`/api/authors/${id}/edit`).then((response) => {
      if (response.data.success) {
        setName(response.data.author.name);
      } else {
        alert('Failed to load');
      }
    });
  }, [id]);

  useEffect(() => {
    authorEditApi();
  }, [authorEditApi]);

  const onNameChange = (e) => {
    setName(e.currentTarget.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const variables = {
      name: Name,
      params: { id: id },
    };

    axios.put(`/api/authors/${id}`, variables).then((response) => {
      if (response.data.success) {
        alert('성공적으로 추가하였습니다.');
        history.push(`/authors/${response.data.author._id}`);
      } else {
        alert('작가 업로드에 실패했습니다.');
      }
    });
  };

  return (
    <>
      <h2>Edit Author</h2>
      <form onSubmit={onSubmit}>
        <div>Name</div>
        <input onChange={onNameChange} value={Name} />
        <div>
          <Link to='/authors'>Cancel</Link>
          <button type='submit' onClick={onSubmit}>
            Create
          </button>
        </div>
      </form>
    </>
  );
};
