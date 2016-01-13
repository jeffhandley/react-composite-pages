import React from 'react';
import Section from '../../masters/components/Section';
import Title from '../../masters/components/Title';
import Message from './components/Message';
import { Provider } from 'react-redux';
import reducers from './reducers';
import actionCreators from './actionCreators';
import loadClient from '../../redux/loadClient';

loadClient({
    reducers,
    actionCreators,
    component: (props) => (
        <Section name='body' id='pages-redux'>
            <div>
                <Title title='Redux Page (on the client)' />
                <Provider store={props.store}>
                    <Message />
                </Provider>
            </div>
        </Section>
    ),
    state: window.redux,
    container: document.getElementById('pages-redux')
}, ({setSource}) => {
    setSource('client');
});
