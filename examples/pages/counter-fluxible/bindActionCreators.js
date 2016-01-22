const _ = {
    mapValues: require('lodash/mapValues')
};

export default function bindActionCreators(actions, context) {
    const executeAction = context.executeAction.bind(context);

    return _.mapValues(actions, (action) => (payload, done) => {
        executeAction(action, payload, done);
    });
};