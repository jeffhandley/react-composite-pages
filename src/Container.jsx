import React, { Component } from 'react';
import ContainerState from './ContainerState';
import ContainerClient from './ContainerClient';
import { renderToStaticMarkup, renderToString } from 'react-dom/server';

const _ = {
    isUndefined: require('lodash/isUndefined')
};

class Container extends Component {
    render() {
        const { id, state, children, clientSrc } = this.props;
        const serverRender = clientSrc ? renderToString : renderToStaticMarkup;

        return (
            <div>
                { React.Children.count(children) && (
                    <div
                        dangerouslySetInnerHTML={{ __html: serverRender(React.Children.only(children)) }}
                        {...{ id }}
                    />
                ) }
                { !_.isUndefined(state) && (
                    <ContainerState {...{ id, state }} />
                ) }
                { clientSrc && (
                    <ContainerClient src={ clientSrc } />
                )}
            </div>
        );
    }
}

export default Container;
