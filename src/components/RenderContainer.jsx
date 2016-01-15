import React, { Component } from 'react';
import RenderState from './RenderState';
import RenderClient from './RenderClient';
import { renderToStaticMarkup, renderToString } from 'react-dom/server';

class RenderContainer extends Component {
    render() {
        const { id, state, children, clientSrc } = this.props;

        if (!React.Children.count(children)) {
            return null;
        }

        const serverRender = clientSrc ? renderToString : renderToStaticMarkup;
        const __html = serverRender(React.Children.only(children));

        return (
            <div>
                <div dangerouslySetInnerHTML={{ __html }} {...{ id }} />
                <RenderState {...{ id, state }} />
                <RenderClient src={ clientSrc } />
            </div>
        );
    }
}

export default RenderContainer;
