import React from 'react';
import url from 'url';
import Counter from './containers/Counter';
import reducers from './reducers';
import actionCreators from './actionCreators';
import { bindActionCreators, createStore } from 'redux';
import { Container } from 'react-composite-pages';
import ReactCreateClass from 'create-react-class';

export default (req, res, callback) => {
    const { to = 0, template = 'basic' } = url.parse(req.url, true).query;
    const { default: loadTemplate } = require(`../../templates/${template}`);

    const store = createStore(reducers, Number(to));
    const actions = bindActionCreators(actionCreators, store.dispatch);

    loadTemplate(req, res, (Template, templateActions) => {
        callback(
            ReactCreateClass({
                render() {
                    return (
                        <Template
                          title='Redux Counter'
                          body={
                            <Container
                              clientSrc='/client/pages/counter-redux.js'
                              id='counter-redux'
                              state={store.getState()}>
                                <Counter store={ store } />
                            </Container>
                          }
                        />
                    );
                }
            }),
            { ...templateActions, ...actions }
        );
    });
}
