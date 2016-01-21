const _ = {
    mapValues: require('lodash/object/mapValues')
};

export default function bindActionCreators(actions, executeAction) {
    return _.mapValues(actions, (action) => (payload, done) => {
        executeAction(action, payload, done);
    });
};