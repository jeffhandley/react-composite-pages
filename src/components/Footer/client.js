import React from 'react';
import ReactDOM from 'react-dom';
import createFooter from './index';

export default function loadFooter(value, containerId) {
    const footer = createFooter(value);
    const container = document.getElementById(containerId);

    ReactDOM.render(<footer.Component />, container);

    footer.actions.updateDate();
}
