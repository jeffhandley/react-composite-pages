export default (state = 0, action) => {
    if (action.type === 'INCREMENT') {
        return ++state;
    } else {
        return state;
    }
}
