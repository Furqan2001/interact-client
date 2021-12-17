import React, { Component } from 'react';
import MessageItem from '../../components/MessageItem/MessageItem';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchIndividualMessage, deleteMessage, addLike, removeLike } from '../../store/actions/messages';
import NotFound from '../../components/NotFound/NotFound';
import Spinner from '../../components/UI/Spinner/Spinner';

class IndividualMessage extends Component {

  state = {
    isReady: false
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    await this.props.onFetchIndividualMessage(this.props.match.params.id ,this.props.match.params.message_id);
    this.setState({isReady: true});
  }

  deleteAndRedirect = messageId => {
    this.props.onDeleteMessage(messageId);
    this.props.history.push('/');
  }

  render() {
    const { currentUser, message, addLike, removeLike } = this.props;
    if (!this.state.isReady) {
      return <Spinner />
    }
    if (!message) {
      return <NotFound />
    } 
    return (
      <MessageItem 
        date= {message.createdAt}
        text= {message.text}
        userId= {message.user._id}
        username= {message.user.username}
        profileImageUrl= {message.user.profileImageUrl}
        likes= {message.likes}
        onAddLike= {addLike.bind(this, message._id)}
        onRemoveLike= {removeLike.bind(this, message._id)}
        removeMessage={this.deleteAndRedirect.bind(this, message._id)}
        isCorrectUser={currentUser === message.user._id}
        showIndividualMessage={true}
        currentUser= {currentUser}
        comments= {message.comments}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    message: state.messages[0],
    currentUser: state.currentUser.user.id
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onFetchIndividualMessage: (userId, messageId) => dispatch(fetchIndividualMessage(userId, messageId)),
    onDeleteMessage: messageId => dispatch(deleteMessage(messageId)),
    addLike: messageId => dispatch(addLike(messageId)),
    removeLike: messageId => dispatch(removeLike(messageId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(IndividualMessage));