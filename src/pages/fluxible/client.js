import React from 'react';
import ReactDOM from 'react-dom';
import Fluxible from 'fluxible';
import { FluxibleComponent } from 'fluxible-addons-react';
import Message from './components/Message';
import stores from './stores';

const app = new Fluxible({ component: Message });
stores.forEach((store) => app.registerStore(store));

const state = window.PAGE_STATE;
const container = document.getElementById('pages-fluxible');

app.rehydrate(state, (err, context) => {
    const MessageComponent = app.getComponent();

    const Component = () => (
        <FluxibleComponent context={context.getComponentContext()}>
            <Message />
        </FluxibleComponent>
    );

    ReactDOM.render(<Component />, container);
});