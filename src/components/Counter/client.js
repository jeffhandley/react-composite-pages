import React from 'react';
import ReactDOM from 'react-dom';
import createCounter from './index';

export default function loadCounter(value, containerId) {
    const counter = createCounter(value);
    const container = document.getElementById(containerId);

    ReactDOM.render(<counter.Component />, container);

    function incrementToValue() {
        if (value-- > 0) {
            counter.actions.increment();
            setTimeout(incrementToValue, 100);
        }
    }

    incrementToValue();
}
