import React from 'react';
import Body from './components/Body';
import reducers from './reducers';
import actionCreators from './actionCreators';
import loadClient from '../../redux/loadClient';

loadClient({
    reducers,
    actionCreators,
    component: ({store}) => (
        <Body {...{store}} title='Redux Page (client)' />
    ),
    state: window.redux,
    container: document.getElementById('pages-redux')
}, ({setSource}) => {
    setSource('client');
});
