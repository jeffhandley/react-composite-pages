import React from 'react';
import Message from './components/Message';
import reducers from './reducers';
import actionCreators from './actionCreators';
import reduxServer from '../../redux/server';
import url from 'url';

export default (req, callback) => {
    const server = reduxServer({
        reducers,
        actionCreators,
        clientSrc: '/nui/client/pages/redux/client.js',
        components: {
            body: <Message />
        },
        ids: {
            body: 'pages-redux',
            state: 'PAGE_STATE'
        },
        title: 'Redux Page'
    });

    const { query } = url.parse(req.url, true);

    server.setMessage(query.message || 'redux loaded');
    server.setSource('server');

    callback(null, server);
 };
