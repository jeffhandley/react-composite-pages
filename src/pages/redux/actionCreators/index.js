import actions from '../actions';
import property from '../createPropertyActionCreator';

export default {
    setMessage: property(actions.SET_TEXT)
};
