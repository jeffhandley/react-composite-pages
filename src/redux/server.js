import React from 'react';
import { Provider } from 'react-redux';
import { createStore, bindActionCreators } from 'redux';

const _ = {
    mapValues: require('lodash/object/mapValues')
};

export default (opts) => {
    const {
        reducers,
        actionCreators,
        components,
        ...renderProps
    } = opts;

    const store = createStore(reducers);

    const render = () => {
        const wrappedComponents = _.mapValues(components, (component) => (
            <Provider {...{store}}>
                { component }
            </Provider>
        ));

        const state = store.getState() || { };

        return {
            ...renderProps,
            components: wrappedComponents,
            state
        };
    };

    return {
        ...bindActionCreators(actionCreators, store.dispatch),
        render
    };
};
