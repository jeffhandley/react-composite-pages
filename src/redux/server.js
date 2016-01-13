import React from 'react';
import { createStore, bindActionCreators } from 'redux';

export default (opts) => {
    const {
        reducers,
        actionCreators,
        component
    } = opts;

    const store = createStore(reducers);

    const getComponent = () => {
        const state = store.getState() || { };
        return React.createElement(component, { state, store });
    };

    return {
        ...bindActionCreators(actionCreators, store.dispatch),
        getComponent
    };
};
