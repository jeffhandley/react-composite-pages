import React from 'react';
import Container from './components/Container';
import Message from './components/Message';
import stores from './stores';
import * as actions from './actions';
import Fluxible from 'fluxible';
import { provideContext } from 'fluxible-addons-react';

function noLoad(actionContext, payload, done) {
    done();
}

export default function loadMessagePage(callback, initialState) {
    const contextTypes = { };

    const component = provideContext(Message, contextTypes);

    const app = new Fluxible({ component });
    stores.forEach((store) => app.registerStore(store));

    // Create the page context and execute the load action
    const appContext = app.createContext();

    appContext.executeAction(actions.load || noLoad, initialState, () => {
        const MessageComponent = app.getComponent();
        const context = appContext.getComponentContext();

        const messageComponent = () => {
            const state = app.dehydrate(appContext);
            const pageState = `
                window.PAGE_STATE = ${JSON.stringify(state || { })};
            `;

            return (
                <Container {...{pageState}}>
                    <MessageComponent {...{context}} />
                </Container>
            );
        };

        const actionCreators = {
            setMessage(message, done) {
                appContext.executeAction(actions.setMessage, message, done);
            }
        };

        callback(null, {
            ...actionCreators,
            Message: messageComponent
        });
    });
}
