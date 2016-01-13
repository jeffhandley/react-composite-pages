import React from 'react';
import Body from './components/Body';
import Page from '../../masters/components/Page';
import FullPage from '../../masters/FullPage';
import Client from '../../masters/components/Client';
import reducers from './reducers';
import actionCreators from './actionCreators';
import reduxServer from '../../redux/server';
import url from 'url';

export default (req, callback) => {
    const server = reduxServer({
        reducers,
        actionCreators,
        component: (props) => (
            <Page master={FullPage}>
                <Body id='pages-redux' store={props.store} title='Redux Page (server)' />
                <Client id='redux' src='/nui/client/pages/redux/client.js' state={props.state} />
            </Page>
        )
    });

    const { query } = url.parse(req.url, true);

    server.setMessage(query.message || 'redux loaded');
    server.setSource('server');

    callback(null, server.getComponent());
 };
