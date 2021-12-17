import React from 'react';
import { Link } from 'react-router-dom';
import MessageTimeline from '../MessageTimeline/MessageTimeLine';
import './Homepage.css';

const Homepage = props => {
  const {currentUser} = props;
  if (!currentUser.isAuthenticated) {
    return (
      <div className="home-hero">
        <h1>What's Happening?</h1>
        <h4>New to Interact?</h4>
        <Link to="/signup" className="btn btn-primary homebtn">Sign up here</Link>
      </div>
    );
  }
  return (
    <div>
      <MessageTimeline username={currentUser.user.username} profileImageUrl={currentUser.user.profileImageUrl} {...props} />
    </div>
  );
}

export default Homepage;