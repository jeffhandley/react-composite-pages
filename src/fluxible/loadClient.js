import React from 'react';
import ReactDOM from 'react-dom';
import Fluxible from 'fluxible';
import bindActionCreators from './bindActionCreators';
import { createElementWithContext } from 'fluxible-addons-react';

export default (opts, callback) => {
    const {
        stores,
        actions,
        component,
        state,
        container
    } = opts;

    const app = new Fluxible({component});
    stores.forEach((store) => app.registerStore(store));

    const context = app.createContext();

    app.rehydrate(state, (err, context) => {
        const render = ReactDOM.render.bind(
            ReactDOM,
            createElementWithContext(context, { state }),
            container
        );

        render();

        callback && callback({
            ...bindActionCreators(actions, context.executeAction.bind(context)),
            render
        });
    });
};
