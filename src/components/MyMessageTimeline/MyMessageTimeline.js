import React from 'react';
import MessageList from '../../containers/MessageList/MessageList';
import UserAside from '../UserAside/UserAside';
import NotFound from '../NotFound/NotFound';
import { withRouter, useLocation } from 'react-router-dom';

const MyMessageTimeline = props =>  {
  let username, profileImageUrl;
  const location = useLocation();
  if (location.state) {
    ({ username, profileImageUrl } = location.state);
  }

  if (!props.isAuthenticated) {
    return <NotFound />;
  }
  return (
    <div className="row">
        <UserAside 
          username= {username || props.username}
          profileImageUrl= {username ? profileImageUrl: props.profileImageUrl}
        />
        <MessageList  showIndividualUserMessages={true} userId={props.match.params.id} />
      </div>
  );
}

export default withRouter(MyMessageTimeline);