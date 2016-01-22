import React from 'react';
import url from 'url';
import CounterContainer from './CounterContainer';
import reducers from './reducers';
import actionCreators from './actionCreators';
import template from '../../templates/full-page';
import { bindActionCreators, createStore } from 'redux';
import { Provider } from 'react-redux';
import { RenderContainer } from 'react-composition';

export default (req, callback) => {
    const { to = 0 } = url.parse(req.url, true).query;
    const store = createStore(reducers, Number(to));
    const actions = bindActionCreators(actionCreators, store.dispatch);

    template(req, (Template, templateActions) => {
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
                                <CounterContainer store={ store } />
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
