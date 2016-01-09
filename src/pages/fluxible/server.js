import React from 'react';
import Message from './components/Message';
import NoFooter from '../../masters/NoFooter';
import stores from './stores';
import * as actions from './actions';
import fluxibleServer from '../../fluxible/server';
import url from 'url';

export default (req, callback) => {
    const server = fluxibleServer({
        stores,
        actions,
        clientSrc: '/nui/client/pages/fluxible/client.js',
        master: NoFooter,
        components: {
            body: <Message />
        },
        ids: {
            body: 'pages-fluxible',
            state: 'PAGE_STATE'
        },
        title: 'Fluxible Page'
    });

    const { query } = url.parse(req.url, true);

    server.setMessage(query.message || 'fluxible loaded', () => {
        server.setSource('server', () => {
            callback(null, server);
        });
    });
};
