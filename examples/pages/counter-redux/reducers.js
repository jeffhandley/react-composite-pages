import constants from './constants';

export default (state = 0, action) => {
    if (action.type === constants.INCREMENT) {
        return state + action.count;
    } else {
        return state;
    }
}
