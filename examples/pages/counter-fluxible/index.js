import React from 'react';
import url from 'url';
import Counter from './containers/Counter';
import counterStore from './counterStore';
import * as actions from './actions';
import Fluxible from 'fluxible';
import bindActionCreators from './bindActionCreators';
import { RenderContainer } from 'react-composition';

export default (req, res, callback) => {
    const { to = 0, template = 'basic' } = url.parse(req.url, true).query;
    const { default: loadTemplate } = require(`../../templates/${template}`);

    const app = new Fluxible();
    app.registerStore(counterStore);

    const context = app.createContext();
    const actionCreators = bindActionCreators(actions, context);

    actionCreators.setValue({ value: Number(to) }, () => {
        loadTemplate(req, res, (Template, templateActions) => {
            callback(
                React.createClass({
                    render() {
                        const state = app.dehydrate(context);

                        return (
                            <Template
                              title='Fluxible Counter'
                              body={
                                <RenderContainer
                                  clientSrc='/client/pages/counter-fluxible.js'
                                  id='counter-fluxible'
                                  state={ state }>
                                    <Counter context={ context } />
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
