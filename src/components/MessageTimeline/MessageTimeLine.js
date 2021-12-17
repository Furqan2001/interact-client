import React from 'react';
import MessageList from '../../containers/MessageList/MessageList';
import UserAside from '../UserAside/UserAside';

const MessageTimeLine = props => {
  return (
    <div className="row">
      <UserAside 
        username= {props.username}
        profileImageUrl= {props.profileImageUrl}
      />
      <MessageList showIndividualUserMessages={false} />
    </div>
  );
}

export default MessageTimeLine;