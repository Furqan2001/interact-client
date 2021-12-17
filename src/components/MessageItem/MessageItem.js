import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import DefaultProfileImage from '../../images/default-profile.jpg';
// import Like from '../../images/like.svg';]
import CommentList from '../../containers/CommentList/CommentList';
import Modal from '../UI/Modal/Modal';
import './MessageItem.css';


const MessageItem = ({username, profileImageUrl, date, text, removeMessage, isCorrectUser, currentUser, loadMessage, showIndividualMessage, likes, onAddLike, onRemoveLike, comments, userId}) => {

  const [liked, setLikeStatus] = useState(likes.includes(currentUser) ? true : false);
  const [likesLength, setLikesLength] = useState(likes.length);

  const toggleLike = e => {
    e.stopPropagation();
    if (liked) {
      setLikeStatus(false);
      setLikesLength(likesLength-1);
      onRemoveLike();
    } else {
      setLikeStatus(true);
      setLikesLength(likesLength+1);
      onAddLike();
    }
  }

  const deleteMessage = e => {
    e.stopPropagation();
    setDeletingStatus(true);
  }

  const [deletingStatus, setDeletingStatus] = useState(false);

  let modal = null;
  if (deletingStatus) {
    modal = (<Modal show={deletingStatus} 
      onCancelDelete={() => setDeletingStatus(false)} 
      >
        <h6>Are you sure you want to delete this message?</h6>
        <div>
          <button className='btn btn-success modal-success' onClick={() => setDeletingStatus(false)}>No</button>
          <button className='btn btn-danger modal-danger' onClick={removeMessage}>Delete</button>
        </div>
      </Modal>)
  }
  return (
    <div className={`post-container ${showIndividualMessage ? '' : 'collective'}`} onClick={(loadMessage && !deletingStatus)? loadMessage : null}>
      {modal}
      <div className='content-container'>
      <div className='content-section'>
        <img className='post-image' src={profileImageUrl || DefaultProfileImage} alt="username" width="100" height="100" />
        <div className="message-area">
          <Link to={{ pathname: `/users/${userId}/messages/`, state: { username, profileImageUrl } }}  onClick={e =>  e.stopPropagation()}>
            @{username} &nbsp;
          </Link>
          <span className="text-muted">
            <Moment className="text-muted" format="Do MMM YYYY">
              {date}
            </Moment>
          </span>
          <p className='post-text'>{text}</p>
        </div>
      </div>
          {isCorrectUser && (
            <span className='message-delete-button' onClick={deleteMessage}><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"><path d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z"/></svg></span>
          )}
      </div>
      
      <div className="likes">
        <button className={`likebtn ${!liked ? 'unliked' : 'liked'}`} onClick={toggleLike}>{!liked ? 'Like'  : 'Liked' }</button>
        {showIndividualMessage ? <p className="comment_count">{likesLength} Likes</p> : null}
      </div>

        <div className="comment_area">
          {showIndividualMessage ? 
            (<div>
              <CommentList 
                comments= {comments}  
              />
            </div>) : 
            (<div className='post_stats'>
              <p className="comment_count">{likesLength} Likes</p> 
              <p className="comment_count">{comments.length} Comments</p>
              </div>
            )
          } 
        </div>
    </div>
  );
};

export default MessageItem;