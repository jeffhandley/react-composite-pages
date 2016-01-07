export default function createPropertyReducer(actionType, initialState, debug) {
    let undefinedValue;

    if (initialState === undefinedValue) {
        initialState = null;
    }

    return (state = initialState, action) => {
        if (action.type !== actionType) {
            return state;
        }

        if (debug) {
            console.log('redux', action.type, action.value);
        }

        return action.value;
    };
}
