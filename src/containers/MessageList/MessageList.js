import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchMessages, fetchUserMessages, deleteMessage, addLike, removeLike } from '../../store/actions/messages';
import MessageItem from '../../components/MessageItem/MessageItem';
import './MessageList.css';

class MessageList extends Component {

  state = {
    isReady: false
  }

  componentDidMount() {
    this.loadMessages();
  }

  loadMessages = async () => {
    if (this.props.showIndividualUserMessages) {
      await this.props.fetchUserMessages(this.props.userId);
    } else {
      await this.props.fetchMessages();
    }
    return this.setState({isReady: true})
  } 

  loadIndividualMessage = messageId => {
    const userId = this.props.currentUser;
    this.props.history.push(`/users/${userId}/messages/${messageId}`);
  }

  render() {
    const { messages, deleteMessage, currentUser, addLike, removeLike } = this.props;
    let messageList = null;
    if (this.state.isReady && messages) {
      messageList = messages.map(m => (
        <MessageItem 
          loadMessage = {this.loadIndividualMessage.bind(this, m._id)}
          key= {m._id}
          userId= {m.user._id}
          date= {m.createdAt}
          text= {m.text}
          username= {m.user.username}
          profileImageUrl= {m.user.profileImageUrl}
          likes= {m.likes}
          comments= {m.comments}
          onAddLike= {addLike.bind(this, m._id)}
          onRemoveLike= {removeLike.bind(this, m._id)}
          removeMessage={deleteMessage.bind(this, m._id)}
          isCorrectUser={currentUser === m.user._id}
          currentUser= {currentUser}
          showIndividualMessage={false}
        />      
      ));      
    }
    return (
      <div className="row col-sm-8">
        <div className="offset-1 col-sm-10">
          <ul className="list-group" id="messages">
            {messageList}
          </ul>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    messages: state.messages,
    currentUser: state.currentUser.user.id
  }
}


export default connect(mapStateToProps, { fetchMessages, deleteMessage, fetchUserMessages, addLike, removeLike })(withRouter(MessageList));