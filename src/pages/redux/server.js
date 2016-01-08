import React from 'react';
import { createStore, bindActionCreators } from 'redux';
import { Provider } from 'react-redux';
import Message from './components/Message';
import reducers from './reducers';
import actionCreators from './actionCreators';

export default function loadMessagePage(callback, initialState) {
    const store = createStore(reducers, initialState);

    const render = () => {
        const state = store.getState() || { };

        return {
            state,
            stateId: 'PAGE_STATE',

            clientSrc: '/nui/client/pages/redux/client.js',

            body: (
                <Provider {...{store}}>
                    <Message />
                </Provider>
            ),
            bodyId: 'pages-redux'
        };
    };

    callback(null, {
        ...bindActionCreators(actionCreators, store.dispatch),
        render
    });
}
