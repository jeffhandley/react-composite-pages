import React from 'react';
import Fluxible from 'fluxible';
import { createElementWithContext } from 'fluxible-addons-react';
import bindActionCreators from './bindActionCreators';
import Client from '../masters/components/Client';

export default (opts) => {
    const {
        stores,
        actions,
        component
    } = opts;

    const app = new Fluxible({component});
    stores.forEach((store) => app.registerStore(store));

    const context = app.createContext();

    const getComponent = () => {
        const state = app.dehydrate(context) || { };
        return createElementWithContext(context, { state });
    };

    return {
        ...bindActionCreators(actions, context.executeAction.bind(context)),
        getComponent
    };
}
