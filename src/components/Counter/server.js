import React from 'react';
import RenderContainer from '../RenderContainer';
import createCounter from './index';

export default function loadCounter(value, callback) {
    const counter = createCounter(value);

    const Container = ({ id, clientSrc }) => {
        return (
            <RenderContainer clientSrc={ clientSrc } id={ id } state={ counter.getState() }>
                <counter.Component />
            </RenderContainer>
        );
    };

    function incrementToValue() {
        if (value-- === 0) {
            callback(Container, counter.actions);
        } else {
            counter.actions.increment();
            setTimeout(incrementToValue, 100);
        }
    }

    incrementToValue();
}
