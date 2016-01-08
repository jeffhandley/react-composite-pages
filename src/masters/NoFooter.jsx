import React, { Component } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

class NoFooter extends Component {
    render() {
        const { body, bodyId, clientSrc, state, stateId, title } = this.props;

        const html = {
            body: renderToStaticMarkup(body)
        };

        const stateScript = stateId && `window.${stateId} = ${JSON.stringify(state)};`;

        return (
            <html>
                <head>
                    <title>{ title }</title>
                </head>
                <body>
                    <div style={{ backgroundColor: '#343434', color: 'white', height: 100 }}>Top Nav</div>
                    <div dangerouslySetInnerHTML={{ __html: html.body }} id={ bodyId || 'page-body' } />
                    { stateScript && <script dangerouslySetInnerHTML={{ __html: stateScript }} /> }
                    { clientSrc && <script src={ clientSrc } /> }
                </body>
            </html>
        );
    }
}

NoFooter.propTypes = {
    body: React.PropTypes.node,
    bodyId: React.PropTypes.string,
    clientSrc: React.PropTypes.string,
    state: React.PropTypes.object,
    stateId: React.PropTypes.string,
    title: React.PropTypes.string
};

export default NoFooter;
