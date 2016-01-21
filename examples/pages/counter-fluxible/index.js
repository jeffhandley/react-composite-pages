import React from 'react';
import url from 'url';
import Counter from './Counter';
import counterStore from './counterStore';
import * as actions from './actions';
import template from '../../templates/full-page';
import Fluxible from 'fluxible';
import { connectToStores, FluxibleComponent } from 'fluxible-addons-react';
import bindActionCreators from './bindActionCreators';
import { RenderContainer } from 'react-composition';

export default (req, callback) => {
    const { to = 0 } = url.parse(req.url, true).query;

    const mapStoresToProps = (context) => {
        const { value } = context.getStore(counterStore);
        return { value };
    };

    const ConnectedCounter = connectToStores(Counter, [ counterStore ], mapStoresToProps);

    const app = new Fluxible({ component: ConnectedCounter });
    app.registerStore(counterStore);

    const context = app.createContext();
    const actionCreators = bindActionCreators(actions, context);

    actionCreators.setValue({ value: Number(to) }, () => {
        template(req, (Template, templateActions) => {
            callback(
                React.createClass({
                    render() {
                        const state = app.dehydrate(context);
                        const Component = app.getComponent();

                        return (
                            <Template
                              title='Fluxible Counter'
                              body={
                                <RenderContainer
                                  clientSrc='/client/pages/counter-fluxible.js'
                                  id='counter-fluxible'
                                  state={ state }>
                                    <FluxibleComponent context={ context.getComponentContext() }>
                                        <Component { ...actionCreators } />
                                    </FluxibleComponent>
                                </RenderContainer>
                              }
                            />
                        );
                    }
                }),
                { ...templateActions, ...actionCreators }
            );
        });
    });
}
