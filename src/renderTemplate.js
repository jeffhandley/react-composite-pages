import React from 'react';
import ContainerState from './ContainerState';
import ContainerClient from './ContainerClient';
import { renderToStaticMarkup } from 'react-dom/server';

const _ = {
	mapValues: require('lodash/mapValues')
};

export default function renderTemplate(template) {
    const sections = _.mapValues(template, (section) => {
        const __html = renderToStaticMarkup(section);

        return () => (
            <div dangerouslySetInnerHTML={{ __html }} />
        );
    });

    const state = ContainerState.rewind();
    const clients = ContainerClient.rewind() || [ ];

    return { state, clients, sections };
}
