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
        initialState,
        callback,
        components,
        ...renderProps
    } = opts;

    const store = createStore(reducers, initialState);

    const render = () => {
        const state = store.getState() || { };

        const wrappedComponents = _.mapValues(components, (component) => (
            <Provider {...{store}}>
                { component }
            </Provider>
        ));

        return {
            ...renderProps,
            components: wrappedComponents,
            state
        };
    };

    callback(null, {
        ...bindActionCreators(actionCreators, store.dispatch),
        render
    });
};
