import React from 'react';
import ReactDOM from 'react-dom';
import Counter from './Counter';
import reducers from './reducers';
import actionCreators from './actionCreators';
import { createStore } from 'redux';
import { connect, Provider } from 'react-redux';
import { getRenderState } from 'react-composition/client';

const state = getRenderState('counter-redux');
const store = createStore(reducers, state);

const mapStateToProps = (state) => ({
    value: state
});

const ConnectedCounter = connect(mapStateToProps, actionCreators)(Counter);
const container = document.getElementById('counter-redux');

ReactDOM.render(
    (
        <Provider store={store}>
            <ConnectedCounter />
        </Provider>
    ),
    container
);
