import React from 'react';
import ServerWrapper from '../../components/ServerWrapper';
import bindActionCreators from './actions/bindActionCreators';
import { provideContext} from 'fluxible-addons-react';
import Fluxible from 'fluxible';
import Message from './components/Message';
import stores from './stores';
import * as actions from './actions';

function noLoad(actionContext, payload, done) {
    done();
}

export default function loadMessagePage(callback, initialState) {
    const app = new Fluxible({ component: provideContext(Message) });
    stores.forEach((store) => app.registerStore(store));

    const Component = app.getComponent();

    // Create the page context and execute the load action
    const appContext = app.createContext();

    const MessageComponent = () => {
        const context = appContext.getComponentContext();
        const state = app.dehydrate(appContext) || { };
        const pageState = `
            window.PAGE_STATE = ${JSON.stringify(state)};
        `;

        return (
            <ServerWrapper {...{pageState}}>
                <Component {...{context}} />
            </ServerWrapper>
        );
    };

    callback(null, {
        ...bindActionCreators(actions, appContext.executeAction.bind(appContext)),
        Message: MessageComponent
    });
}
