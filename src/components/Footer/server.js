import React from 'react';
import RenderContainer from '../RenderContainer';
import createFooter from './index';

export default function loadFooter(value, callback) {
    const footer = createFooter(value);

    const Container = ({ id, clientSrc }) => {
        return (
            <RenderContainer clientSrc={ clientSrc } id={ id } state={ footer.getState() }>
                <footer.Component />
            </RenderContainer>
        );
    };

    footer.actions.updateDate();

    callback(Container, footer.actions);
}
