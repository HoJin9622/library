import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default () => {
  const [Title, setTitle] = useState('');
  const [Author, setAuthor] = useState('');
  const [Authors, setAuthors] = useState([]);
  const [PublishDate, setPublishDate] = useState('');
  const [PageCount, setPageCount] = useState(1);
  const [Cover, setCover] = useState('');
  const [Description, setDescription] = useState('');

  useEffect(() => {
    axios.get('/api/books/new').then((response) => {
      if (response.data.success) {
        setAuthors(response.data.params.authors);
      } else {
        alert('Failed to load books');
      }
    });
  }, []);

  const onTitleChange = (e) => {
    setTitle(e.currentTarget.value);
  };

  const onAuthorChange = (e) => {
    setAuthor(e.currentTarget.value);
  };

  const onPublishDateChange = (e) => {
    setPublishDate(e.currentTarget.value);
  };

  const onCoverChange = (e) => {
    setCover(e.target.files[0]);
  };

  const onPageCountChange = (e) => {
    setPageCount(e.currentTarget.value);
  };

  const onDescriptionChange = (e) => {
    setDescription(e.currentTarget.value);
  };

  const singleFileUploadHandler = (event) => {
    const data = new FormData();
    // If file selected
    if (Cover) {
      data.append('profileImage', Cover, Cover.name);
      axios
        .post('/api/books', data, {
          headers: {
            accept: 'application/json',
            'Accept-Language': 'en-US,en;q=0.8',
            'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
          },
        })
        .then((response) => {
          if (200 === response.status) {
            // If file size is larger than expected.
            if (response.data.error) {
              if ('LIMIT_FILE_SIZE' === response.data.error.code) {
                alert('Max size: 2MB, red');
              } else {
                console.log(response.data);
                // If not the given file type
                alert(response.data.error, 'red');
              }
            } else {
              // Success
              let fileName = response.data;
              console.log('fileName', fileName);
              alert('File Uploaded #3089cf');
            }
          }
        })
        .catch((error) => {
          // If another error
          alert(error, 'red');
        });
    } else {
      // if file not selected throw error
      alert('Please upload file, red');
    }
  };

  return (
    <>
      <h2>New Book</h2>
      <div>Title</div>
      <input type='text' onChange={onTitleChange} value={Title} />
      <div>Author</div>
      <select onChange={onAuthorChange} value={Author}>
        {Authors.map((author) => (
          <option key={author._id}>{author.name}</option>
        ))}
      </select>
      <div>Publish Date</div>
      <input type='date' onChange={onPublishDateChange} value={PublishDate} />
      <div>Page Count</div>
      <input
        type='number'
        min='1'
        onChange={onPageCountChange}
        value={PageCount}
      />
      <div>Cover</div>
      <input type='file' onChange={onCoverChange} />
      <div>Description</div>
      <textarea onChange={onDescriptionChange} value={Description}></textarea>
      <Link to='/books'>Cancel</Link>
      <button type='submit' onClick={singleFileUploadHandler} value={Cover}>
        Create
      </button>
    </>
  );
};
