import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, bindActionCreators } from 'redux';

export default (opts, callback) => {
    const {
        reducers,
        actionCreators,
        component,
        state,
        container
    } = opts;

    const store = createStore(reducers, state);

    const render = ReactDOM.render.bind(
        ReactDOM,
        React.createElement(component, { state, store }),
        container
    );

    render();

    callback && callback({
        ...bindActionCreators(actionCreators, store.dispatch),
        render
    });
};
