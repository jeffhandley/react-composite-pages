import React, { Component } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

class FullPage extends Component {
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
                    <div dangerouslySetInnerHTML={{ __html: html.body }} id={ bodyId || 'page-body' } />
                    { stateScript && <script dangerouslySetInnerHTML={{ __html: stateScript }} /> }
                    { clientSrc && <script src={ clientSrc } /> }
                </body>
            </html>
        );
    }
}

FullPage.propTypes = {
    body: React.PropTypes.node,
    bodyId: React.PropTypes.string,
    clientSrc: React.PropTypes.string,
    state: React.PropTypes.object,
    stateId: React.PropTypes.string,
    title: React.PropTypes.string
};

export default FullPage;
