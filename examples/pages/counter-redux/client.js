import React from 'react';
import ReactDOM from 'react-dom';
import Counter from './containers/Counter';
import reducers from './reducers';
import { createStore } from 'redux';
import { getRenderState } from 'react-composition/client';

const state = getRenderState('counter-redux');
const store = createStore(reducers, state);
const container = document.getElementById('counter-redux');

ReactDOM.render(<Counter store={store} />, container);
