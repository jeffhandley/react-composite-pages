import React from 'react';
import Message from './components/Message';
import NoFooter from '../../masters/NoFooter';
import stores from './stores';
import * as actions from './actions';
import fluxibleServer from '../../fluxible/server';

export default (callback, initialState) => fluxibleServer({
    stores,
    actions,
    callback,
    initialState,
    clientSrc: '/nui/client/pages/fluxible/client.js',
    components: {
        body: <Message />
    },
    ids: {
        body: 'pages-fluxible',
        state: 'PAGE_STATE'
    },
    master: NoFooter
});
