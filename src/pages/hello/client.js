import React from 'react';
import ReactDOM from 'react-dom';
import Hello from './Hello';

const state = window.RenderState['hello-container'].hello;
const container = document.getElementById('hello-container');

ReactDOM.render(
    <Hello to={state.to} />,
    container
);
