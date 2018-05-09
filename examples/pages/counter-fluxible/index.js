import React from 'react';
import url from 'url';
import Counter from './containers/Counter';
import counterStore from './counterStore';
import * as actions from './actions';
import Fluxible from 'fluxible';
import bindActionCreators from './bindActionCreators';
import { Container } from 'react-composite-pages';
import ReactCreateClass from 'create-react-class';

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
                ReactCreateClass({
                    render() {
                        const state = app.dehydrate(context);

                        return (
                            <Template
                              title='Fluxible Counter'
                              body={
                                <Container
                                  clientSrc='/client/pages/counter-fluxible.js'
                                  id='counter-fluxible'
                                  state={ state }>
                                    <Counter context={ context } />
                                </Container>
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
