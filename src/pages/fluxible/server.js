import React from 'react';
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

    const render = () => {
        const state = app.dehydrate(context) || { };

        return {
            state,
            stateId: 'PAGE_STATE',

            clientSrc: '/nui/client/pages/fluxible/client.js',

            body: (
                <FluxibleComponent context={context.getComponentContext()}>
                    <Message />
                </FluxibleComponent>
            ),
            bodyId: 'pages-fluxible'
        };
    };

    callback(null, {
        ...bindActionCreators(actions, context.executeAction.bind(context)),
        render
    });
}
