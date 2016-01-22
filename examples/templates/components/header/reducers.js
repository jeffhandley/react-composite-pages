import constants from './constants';

export default (state, action) => {
    switch (action.type) {
        case constants.SIGNIN:
            return action.username;

        case constants.SIGNOUT:
            return null;

        default:
            return state;
    }
}
