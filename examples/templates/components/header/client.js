import React from 'react';
import ReactDOM from 'react-dom';
import Header from './containers/Header';
import reducers from './reducers';
import actionCreators from './actionCreators';
import { createStore, bindActionCreators } from 'redux';
import { getContainerState } from 'react-composite-pages/client';

const state = getContainerState('header');
const store = createStore(reducers, state);
const container = document.getElementById('header');

ReactDOM.render(<Header store={store} />, container);

window.Header = bindActionCreators(actionCreators, store.dispatch);
window.Header.getUsername = store.getState;
window.Header.isSignedIn = () => !!store.getState();
