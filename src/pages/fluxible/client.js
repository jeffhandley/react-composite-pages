import React from 'react';
import Body from './components/Body';
import stores from './stores';
import * as actions from './actions';
import loadClient from '../../fluxible/loadClient';

loadClient({
    stores,
    actions,
    component: ({context}) => (
        <Body {...{context}} title='Fluxible Page (client)' />
    ),
    state: window.fluxible,
    container: document.getElementById('pages-fluxible')
}, ({ setSource }) => {
    setSource('client');
});
