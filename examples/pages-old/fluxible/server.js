import React from 'react';
import Body from './components/Body';
import Page from '../../masters/components/Page';
import NoFooter from '../../masters/NoFooter';
import Client from '../../masters/components/Client';
import stores from './stores';
import * as actions from './actions';
import fluxibleServer from '../../fluxible/server';
import url from 'url';

export default (req, callback) => {
    const server = fluxibleServer({
        stores,
        actions,
        component: (props) => (
            <Page master={NoFooter}>
                <Body id='pages-fluxible' context={props.context} title='Fluxible Page (server)' />
                <Client id='fluxible' src='/nui/client/pages/fluxible/client.js' state={props.state} />
            </Page>
        )
    });

    const { query } = url.parse(req.url, true);

    server.setMessage(query.message || 'fluxible loaded', () => {
        server.setSource('server', () => {
            callback(null, server.getComponent());
        });
    });
};
