import React from 'react';
import ReactDOM from 'react-dom';
import Counter from './containers/Counter';
import counterStore from './counterStore';
import Fluxible from 'fluxible';
import { getRenderState } from 'react-composition/client';

const state = getRenderState('counter-fluxible');

const app = new Fluxible();
app.registerStore(counterStore);

const container = document.getElementById('counter-fluxible');

app.rehydrate(state, (err, context) => {
    ReactDOM.render(<Counter context={ context } />, container);
});