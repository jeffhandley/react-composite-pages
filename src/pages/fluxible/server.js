import React from 'react';
import Message from './components/Message';
import Page from '../../masters/components/Page';
import FullPage from '../../masters/FullPage';
import Section from '../../masters/components/Section';
import Client from '../../masters/components/Client';
import Title from '../../masters/components/Title';
import stores from './stores';
import * as actions from './actions';
import fluxibleServer from '../../fluxible/server';
import url from 'url';

export default (req, callback) => {
    const server = fluxibleServer({
        stores,
        actions,
        component: (props) => (
            <Page master={FullPage}>
                <Section name='body' id='pages-fluxible'>
                    <div>
                        <Title title='Fluxible Page' />
                        <Message {...props} />
                    </div>
                </Section>
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
