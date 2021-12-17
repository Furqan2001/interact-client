import { LOAD_MESSAGES, DELETE_MESSAGE, LOAD_INDIVIDUAL_MESSAGE, CREATE_COMMENT, REMOVE_COMMENT, UPDATE_MESSAGE_LIKES } from '../actionTypes';
import { apiCall } from '../../services/api';
import { addError } from './errors';

export const loadMessages = messages => {
  return {
    type: LOAD_MESSAGES,
    messages
  };
}

export const loadIndividualMessage = message => {
  return {
    type: LOAD_INDIVIDUAL_MESSAGE,
    message
  }
}

export const removeMessage = id => {
  return {
    type: DELETE_MESSAGE,
    id
  }
}

export const updateMessageLikes = message => {
  return {
    type: UPDATE_MESSAGE_LIKES,
    message
  }
}

export const createComment = comment => {
  return {
    type: CREATE_COMMENT,
    comment
  }
}

export const removeComment = id => {
  return {
    type: REMOVE_COMMENT,
    id
  }
}

export const deleteMessage = messageId => {
  return (dispatch, getState) => {
    let { currentUser } = getState();
    const userId = currentUser.user.id;
    return apiCall('delete', `/api/users/${userId}/messages/${messageId}`)
      .then(() => dispatch(removeMessage(messageId)))
      .catch(err => dispatch(addError(err.message)))
  }
}

export const fetchMessages = () => {
  return dispatch => {
    return apiCall("GET", "/api/messages")
      .then(res => dispatch(loadMessages(res)))
      .catch(err => dispatch(addError(err.message)))
  }
}

export const fetchIndividualMessage = (userId, messageId) => {
  return dispatch => {
    return apiCall("get", `/api/users/${userId}/messages/${messageId}`)
      .then(res => dispatch(loadIndividualMessage(res)))
      .catch(err => dispatch(addError(err)))
  }
}

export const fetchUserMessages = userId => {
  return dispatch => {
    return apiCall("get", `/api/users/${userId}/messages`)
      .then(res => dispatch(loadMessages(res)))
      .catch(err => dispatch(addError(err))) 
  }
}

export const postNewMessage = text => (dispatch, getState) => {
  let { currentUser } = getState();
  const userId = currentUser.user.id;
  return apiCall('post', `/api/users/${userId}/messages`, {text})
    .then(res => {})
    .catch(err => dispatch(addError(err.message)))
}

export const addLike = messageId => {
  return (dispatch, getState) => {
    let { currentUser } = getState();
    let userId = currentUser.user.id;

    return apiCall('post', `/api/users/${userId}/messages/${messageId}/likes/add`)
      .then(res => dispatch(updateMessageLikes(res)))
      .catch(err => dispatch(addError(err)))
  }
}

export const removeLike = messageId => {
  return (dispatch, getState) => {
    let { currentUser } = getState();
    let userId = currentUser.user.id;

    return apiCall('post', `/api/users/${userId}/messages/${messageId}/likes/remove`)
      .then(res => dispatch(updateMessageLikes(res)))
      .catch(err => dispatch(addError(err)))
  }
}

export const postNewComment = text => {
  return (dispatch, getState) => {
    let { currentUser, messages } = getState();
    let userId = currentUser.user.id;
    const messageId = messages[0]._id;

    return apiCall('post', `/api/users/${userId}/messages/${messageId}/comments`, {text})
      .then(res => dispatch(createComment(res)))
      .catch(err => dispatch(addError(err)))
  }
}

export const deleteComment = commentId => {
  return (dispatch, getState) => {
    let { currentUser, messages } = getState();
    const userId = currentUser.user.id;
    const messageId = messages[0]._id;

    return apiCall('delete', `/api/users/${userId}/messages/${messageId}/comments/${commentId}`)
      .then(res => dispatch(removeComment(res._id)))
      .catch(err => dispatch(addError(err)))
  }
}
