import React from 'react';
import url from 'url';
import Counter from './Counter';
import reducers from './reducers';
import actionCreators from './actionCreators';
import template from '../../templates/full-page';
import { bindActionCreators, createStore } from 'redux';
import { connect, Provider } from 'react-redux';
import { RenderContainer } from 'react-composition';

export default (req, callback) => {
    const { to = 0 } = url.parse(req.url, true).query;

    const store = createStore(reducers, to);

    const mapStateToProps = (state) => ({
        value: state
    });

    const ConnectedCounter = connect(mapStateToProps, actionCreators)(Counter);
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
                                <Provider store={ store }>
                                    <ConnectedCounter />
                                </Provider>
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
