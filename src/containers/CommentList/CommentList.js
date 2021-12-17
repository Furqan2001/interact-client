import React, { Component } from 'react';
import { connect } from 'react-redux';
import CommentItem from '../../components/CommentItem/CommentItem';
import { postNewComment, deleteComment } from '../../store/actions/messages';
import CommentInput from '../../components/CommentInput/CommentInput';

class CommentList extends Component {

  render() {
    const {currentUser, comments, onDeleteComment, onPostComment} = this.props;
    return (
      <div>
        <CommentInput onPostComment={onPostComment} />

        <div className="comment_list">
          {comments.map(cmnt => {
            return (
              <CommentItem 
                key= {cmnt._id}
                userId= {cmnt.user._id}
                username= {cmnt.user.username}
                profileImageUrl= {cmnt.user.profileImageUrl}
                date= {cmnt.createdAt}
                text= {cmnt.text}
                removeComment= {onDeleteComment.bind(this, cmnt._id)}
                isCorrectUser= {currentUser === cmnt.user._id}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
    return {
      currentUser: state.currentUser.user.id
    }
}

function mapDispatchToProps(dispatch) {
  return {
    onDeleteComment: commentId => dispatch(deleteComment(commentId)),
    onPostComment: text => dispatch(postNewComment(text))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentList);