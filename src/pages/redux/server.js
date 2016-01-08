import React from 'react';
import Message from './components/Message';
import reducers from './reducers';
import actionCreators from './actionCreators';
import reduxServer from '../../redux/server';

export default (callback, initialState) => reduxServer({
    reducers,
    actionCreators,
    callback,
    initialState,
    clientSrc: '/nui/client/pages/redux/client.js',
    components: {
        body: <Message />
    },
    ids: {
        body: 'pages-redux',
        state: 'PAGE_STATE'
    }
});
