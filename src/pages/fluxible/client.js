import React from 'react';
import Section from '../../masters/components/Section';
import Title from '../../masters/components/Title';
import Message from './components/Message';
import { FluxibleComponent } from 'fluxible-addons-react';
import stores from './stores';
import * as actions from './actions';
import loadClient from '../../fluxible/loadClient';

loadClient({
    stores,
    actions,
    component: (props) => (
        <Section name='body' id='pages-fluxible'>
            <div>
                <Title title='Fluxible Page (on the client)' />
                <FluxibleComponent context={props.context}>
                    <Message />
                </FluxibleComponent>
            </div>
        </Section>
    ),
    state: window.fluxible,
    container: document.getElementById('pages-fluxible')
}, ({ setSource }) => {
    setSource('client');
});
