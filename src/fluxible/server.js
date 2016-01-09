import React from 'react';
import bindActionCreators from './bindActionCreators';
import Fluxible from 'fluxible';
import { FluxibleComponent } from 'fluxible-addons-react';

const _ = {
    mapValues: require('lodash/object/mapValues')
};

export default (opts) => {
    const {
        stores,
        actions,
        components,
        ...renderProps
    } = opts;

    const app = new Fluxible();
    stores.forEach((store) => app.registerStore(store));

    const context = app.createContext();

    const render = () => {
        const state = app.dehydrate(context) || { };

        const wrappedComponents = _.mapValues(components, (component) => (
            <FluxibleComponent context={context.getComponentContext()}>
                { component }
            </FluxibleComponent>
        ));

        return {
            ...renderProps,
            components: wrappedComponents,
            state
        };
    };

    return {
        ...bindActionCreators(actions, context.executeAction.bind(context)),
        render
    };
}
