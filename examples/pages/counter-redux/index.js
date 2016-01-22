import React from 'react';
import url from 'url';
import Counter from './containers/Counter';
import reducers from './reducers';
import actionCreators from './actionCreators';
import template from '../../templates/full-page';
import { bindActionCreators, createStore } from 'redux';
import { RenderContainer } from 'react-composition';

export default (req, res, callback) => {
    const { to = 0 } = url.parse(req.url, true).query;
    const store = createStore(reducers, Number(to));
    const actions = bindActionCreators(actionCreators, store.dispatch);

    template(req, res, (Template, templateActions) => {
        callback(
            React.createClass({
                render() {
                    return (
                        <Template
                          title='Redux Counter'
                          body={
                            <RenderContainer
                              clientSrc='/client/pages/counter-redux.js'
                              id='counter-redux'
                              state={store.getState()}>
                                <Counter store={ store } />
                            </RenderContainer>
                          }
                        />
                    );
                }
            }),
            { ...templateActions, ...actions }
        );
    });
}
