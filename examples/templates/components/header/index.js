import React from 'react';
import url from 'url';
import Header from './containers/Header';
import reducers from './reducers';
import actionCreators from './actionCreators';
import { bindActionCreators, createStore } from 'redux';
import { Container } from 'react-composite-pages';
import ReactCreateClass from 'create-react-class';

export default (req, res, callback) => {
    const { username } = url.parse(req.url, true).query;
    const store = createStore(reducers, username);
    const actions = bindActionCreators(actionCreators, store.dispatch);

    callback(
        ReactCreateClass({
            render() {
                return (
                    <Container
                      clientSrc='/client/templates/components/header.js'
                      id='header'
                      state={store.getState()}>
                        <Header store={ store } />
                    </Container>
                );
            }
        }),
        { ...actions }
    );
}
