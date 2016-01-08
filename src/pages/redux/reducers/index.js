import { combineReducers } from 'redux';
import actions from '../actions';
import property from '../createPropertyReducer';

export default combineReducers({
    text: property(actions.SET_TEXT, 'No Message Specified')
});
