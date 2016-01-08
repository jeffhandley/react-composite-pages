import { combineReducers } from 'redux';
import actions from '../actions';
import property from '../createPropertyReducer';

export default combineReducers({
    message: property(actions.SET_MESSAGE, 'No Message Specified'),
    source: property(actions.SET_SOURCE, 'No Source Specified')
});
