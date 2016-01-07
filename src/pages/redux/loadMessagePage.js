import React from 'react';
import { createStore, bindActionCreators } from 'redux';
import { Provider } from 'react-redux';
import Message from './components/Message';
import reducers from './reducers';
import actionCreators from './actionCreators';

export default function loadMessagePage(callback, initialState) {
    const store = createStore(reducers, initialState);

    const messageComponent = () => (
        <Provider {...{store}}>
            <Message />
        </Provider>
    );

    callback(null, {
        ...bindActionCreators(actionCreators, store.dispatch),
        Message: messageComponent
    });
}
