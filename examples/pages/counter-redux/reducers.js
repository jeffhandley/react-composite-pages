export default (state = 0, action) => {
    if (action.type === 'INCREMENT') {
        return state + action.count;
    } else {
        return state;
    }
}
