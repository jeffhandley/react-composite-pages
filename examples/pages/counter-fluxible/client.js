import React from 'react';
import ReactDOM from 'react-dom';
import Counter from './Counter';
import counterStore from './counterStore';
import * as actions from './actions';
import Fluxible from 'fluxible';
import { connectToStores, FluxibleComponent } from 'fluxible-addons-react';
import bindActionCreators from './bindActionCreators';
import { getRenderState } from 'react-composition/client';

const mapStoresToProps = (context) => {
    const { value } = context.getStore(counterStore);
    return { value };
};

const ConnectedCounter = connectToStores(Counter, [ counterStore ], mapStoresToProps);

const app = new Fluxible({ component: ConnectedCounter });
app.registerStore(counterStore);

const state = getRenderState('counter-fluxible');

app.rehydrate(state, (err, context) => {
    const actionCreators = bindActionCreators(actions, context);
    const container = document.getElementById('counter-fluxible');
    const Component = app.getComponent();

    ReactDOM.render(
        (
            <FluxibleComponent context={ context.getComponentContext() }>
                <Component { ...actionCreators } />
            </FluxibleComponent>
        ),
        container
    );
});