export default function createPropertyActionCreator(actionType) {
    return (value) => ({
        type: actionType,
        value
    });
}
