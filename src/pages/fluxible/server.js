import React from 'react';
import Message from './components/Message';
import { FluxibleComponent } from 'fluxible-addons-react';
import Page from '../../masters/components/Page';
import NoFooter from '../../masters/NoFooter';
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
            <Page master={NoFooter}>
                <Section name='body' id='pages-fluxible'>
                    <div>
                        <Title title='Fluxible Page' />
                        <FluxibleComponent context={props.context}>
                            <Message />
                        </FluxibleComponent>
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
