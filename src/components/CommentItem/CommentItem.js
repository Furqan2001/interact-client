import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import DefaultProfileImage from '../../images/default-profile.jpg';
import './CommentItem.css';

const CommentItem = ({userId, username, profileImageUrl, date, text, removeComment, isCorrectUser}) => {
  return (
    <div className='comment-container'>
      <div className='content-container'>
        <div className='content-section'>
          <img src={profileImageUrl || DefaultProfileImage} alt="username" width="100" height="100" className="comment-image"/>
          <div className="text-area">
            <Link to={{ pathname: `/users/${userId}/messages/`, state: { username, profileImageUrl } }}  onClick={e =>  e.stopPropagation()}>
              @{username} &nbsp;
            </Link>
            <span className="text-muted">
              <Moment className="text-muted" format="Do MMM YYYY">
                {date}
              </Moment>
            </span>
            <p className='comment-text'>{text}</p>
          </div>
        </div>
        <div>
          {isCorrectUser && (
            <span className="comment-delete-button" onClick={removeComment}><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z"/></svg></span>
          )}
        </div>
       </div>

    </div>
  );
}

export default CommentItem;