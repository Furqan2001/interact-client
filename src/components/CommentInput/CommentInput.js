import React, { useState } from 'react';
import './CommentInput.css';

const CommentInput = props => {

  const [comment, setComment] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    props.onPostComment(comment);
    setComment('');
  }

  return (
    <form className='comment-form' onSubmit={handleSubmit}>
      <input 
        type="text"
        className="form-control"
        placeholder='Enter Comment'
        value={comment}
        onChange={e => setComment(e.target.value)}
      />
      <button type="submit" className="btn btn-success pull-right comment-button">
        SEND
      </button>
    </form>

  );
}

export default CommentInput;