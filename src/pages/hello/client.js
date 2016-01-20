import React from 'react';
import ReactDOM from 'react-dom';
import getRenderState from '../../getRenderState';
import Hello from './Hello';

const state = getRenderState('hello-container');
const container = document.getElementById('hello-container');

ReactDOM.render(
    <Hello to={state.to} />,
    container
);
