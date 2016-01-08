import React from 'react';
import ServerWrapper from '../../components/ServerWrapper';
import { createStore, bindActionCreators } from 'redux';
import { Provider } from 'react-redux';
import Message from './components/Message';
import reducers from './reducers';
import actionCreators from './actionCreators';

export default function loadMessagePage(callback, initialState) {
    const store = createStore(reducers, initialState);

    const Component = () => (
        <Provider {...{store}}>
            <Message source='server' />
        </Provider>
    );

    const MessageComponent = () => {
        const state = store.getState() || { };
        const pageState = `
            window.PAGE_STATE = ${JSON.stringify(state)};
        `;

        return (
            <ServerWrapper {...{pageState}} clientSrc='/nui/client/pages/redux/client.js' id='pages-redux'>
                <Component />
            </ServerWrapper>
        );
    };

    callback(null, {
        ...bindActionCreators(actionCreators, store.dispatch),
        Message: MessageComponent
    });
}
