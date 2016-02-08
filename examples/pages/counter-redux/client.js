import React from 'react';
import ReactDOM from 'react-dom';
import Counter from './containers/Counter';
import reducers from './reducers';
import { createStore } from 'redux';
import { getContainerState } from 'react-composite-pages/client';

const state = getContainerState('counter-redux');
const store = createStore(reducers, state);
const container = document.getElementById('counter-redux');

ReactDOM.render(<Counter store={store} />, container);
