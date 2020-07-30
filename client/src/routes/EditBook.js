import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useParams, Link, useHistory } from 'react-router-dom';

export default () => {
  const { id } = useParams();
  const history = useHistory();
  const [Title, setTitle] = useState('');
  const [AuthorId, setAuthorId] = useState('');
  const [Authors, setAuthors] = useState([]);
  const [PublishDate, setPublishDate] = useState('');
  const [PageCount, setPageCount] = useState(1);
  const [Cover, setCover] = useState('');
  const [Description, setDescription] = useState('');

  const formatDate = (date) => {
    let publishDate = new Date(date);
    let month = '' + (publishDate.getMonth() + 1);
    let day = '' + publishDate.getDate();
    let year = publishDate.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  };

  const editBookApi = useCallback(() => {
    axios.get(`/api/books/${id}/edit`).then((response) => {
      if (response.data.success) {
        let publishDate = formatDate(response.data.book.publishDate);
        setTitle(response.data.book.title);
        setPublishDate(publishDate);
        setPageCount(response.data.book.pageCount);
        setDescription(response.data.book.description);
        setAuthors(response.data.allAuthor);
      } else {
        alert('Failed to load books');
      }
    });
  }, [id]);

  useEffect(() => {
    editBookApi();
  }, [editBookApi]);

  const onTitleChange = (e) => {
    setTitle(e.currentTarget.value);
  };

  const onAuthorChange = (e) => {
    let option = document.getElementById('selectedOption');
    let selectedId = option.options[option.selectedIndex].id;

    setAuthorId(selectedId);
  };

  const onPublishDateChange = (e) => {
    setPublishDate(e.currentTarget.value);
    console.log(e.currentTarget.value);
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
    // 파일이 없어도 업로드되게 수정해야함
    const data = new FormData();
    // If file selected
    if (Cover) {
      data.append('imgFile', Cover, Cover.name);
      data.append('title', Title);
      data.append('author', AuthorId);
      data.append('publishDate', PublishDate);
      data.append('pageCount', PageCount);
      data.append('description', Description);
      axios
        .post('/api/books', data, {
          headers: {
            accept: 'application/json',
            'Accept-Language': 'en-US,en;q=0.8',
            'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
          },
        })
        .then((response) => {
          if (response.data.success) {
            alert('성공적으로 추가하였습니다.');
            history.push(`/books/${response.data.books._id}`);
          } else {
            alert('업로드에 실패하였습니다.');
          }
        });
    } else {
      // if file not selected throw error
      alert('파일을 업로드해주세요.');
    }
  };

  return (
    <>
      <h2>Edit Book</h2>
      <div>Title</div>
      <input type='text' onChange={onTitleChange} value={Title} />
      <div>Author</div>
      <select id='selectedOption' onChange={onAuthorChange}>
        {Authors.map((author) => (
          <option key={author._id} label={author.name} id={author._id} />
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
