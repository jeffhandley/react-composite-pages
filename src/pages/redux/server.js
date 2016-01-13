import React from 'react';
import { Provider } from 'react-redux';
import Message from './components/Message';
import Page from '../../masters/components/Page';
import FullPage from '../../masters/FullPage';
import Section from '../../masters/components/Section';
import Client from '../../masters/components/Client';
import Title from '../../masters/components/Title';
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
                <Section name='body' id='pages-redux'>
                    <div>
                        <Title title='Redux Page' />
                        <Provider store={props.store}>
                            <Message />
                        </Provider>
                    </div>
                </Section>
                <Client id='redux' src='/nui/client/pages/redux/client.js' state={props.state} />
            </Page>
        )
    });

    const { query } = url.parse(req.url, true);

    server.setMessage(query.message || 'redux loaded');
    server.setSource('server');

    callback(null, server.getComponent());
 };
