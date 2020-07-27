import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

const NewAuthor = () => {
  const history = useHistory();
  const [Name, setName] = useState('');

  const onNameChange = (e) => {
    setName(e.currentTarget.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const variables = {
      name: Name,
    };

    axios.post('/api/authors', variables).then((response) => {
      if (response.data.success) {
        alert('성공적으로 추가하였습니다.');
        history.push(`/authors/${response.data.authors._id}`);
      } else {
        alert('작가 업로드에 실패했습니다.');
      }
    });
  };

  return (
    <>
      <h2>New Author</h2>
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

export default React.memo(NewAuthor);
