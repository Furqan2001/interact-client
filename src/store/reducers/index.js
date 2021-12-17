import { combineReducers } from 'redux';
import currentUser from './currentUser';
import errors from './errors';
import messages from './messages';

const rootReducer = combineReducers({
    errors,
    currentUser,
    messages
});

export default rootReducer;