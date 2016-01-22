import React from 'react';
import ReactDOM from 'react-dom';
import Header from './containers/Header';
import reducers from './reducers';
import { createStore } from 'redux';
import { getRenderState } from 'react-composition/client';

const state = getRenderState('header');
const store = createStore(reducers, state);
const container = document.getElementById('header');

ReactDOM.render(<Header store={store} />, container);
