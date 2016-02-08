import React from 'react';
import ReactDOM from 'react-dom';
import Hello from './Hello';
import { getContainerState } from 'react-composite-pages/client';

const state = getContainerState('hello-container');
const container = document.getElementById('hello-container');

ReactDOM.render(
    <Hello to={state.to} />,
    container
);
