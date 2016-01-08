import React from 'react';
import ServerWrapper from '../../components/ServerWrapper';
import bindActionCreators from './actions/bindActionCreators';
import Fluxible from 'fluxible';
import { FluxibleComponent } from 'fluxible-addons-react';
import Message from './components/Message';
import stores from './stores';
import * as actions from './actions';

export default function loadMessagePage(callback, initialState) {
    const app = new Fluxible({ component: Message });
    stores.forEach((store) => app.registerStore(store));

    // Create the page context and execute the load action
    const context = app.createContext();

    const Component = () => (
        <FluxibleComponent context={context.getComponentContext()}>
            <Message source='server' />
        </FluxibleComponent>
    );

    const MessageComponent = () => {
        const state = app.dehydrate(context) || { };
        const pageState = `
            window.PAGE_STATE = ${JSON.stringify(state)};
        `;

        return (
            <ServerWrapper
                {...{pageState}}
                clientSrc='/nui/client/pages/fluxible/client.js'
                id='pages-fluxible'>
                    <Component />
            </ServerWrapper>
        );
    };

    callback(null, {
        ...bindActionCreators(actions, context.executeAction.bind(context)),
        Message: MessageComponent
    });
}
