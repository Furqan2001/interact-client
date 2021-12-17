import { LOAD_MESSAGES, DELETE_MESSAGE, LOAD_INDIVIDUAL_MESSAGE, CREATE_COMMENT, REMOVE_COMMENT, UPDATE_MESSAGE_LIKES } from '../actionTypes';

const messages = (state=[], action) => {
  switch(action.type) {
    case LOAD_MESSAGES:
      return [...action.messages];
    case LOAD_INDIVIDUAL_MESSAGE:
      return [action.message];
    case DELETE_MESSAGE:
      return state.filter(message => message._id !== action.id);
    case UPDATE_MESSAGE_LIKES:
      return state.map(msg => {
        if (msg._id === action.message._id) {
          let likes = action.message.likes;
          return {
            ...msg,
            likes
          };
        }
        return msg;
      });
    case CREATE_COMMENT:
      let storedComments = [...state[0].comments];
      return [{
        ...state[0],
        comments: [
          ...storedComments,
          action.comment
        ]
      }];
    case REMOVE_COMMENT:
      let updatedComments = state[0].comments.filter(cmnt => cmnt._id !== action.id);
      return [{
        ...state[0],
        comments: updatedComments
      }]

    default:
      return state;  
  }
}

export default messages;