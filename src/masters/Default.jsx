import React, { Component } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

class Default extends Component {
    render() {
        const { components, ids, clientSrc, state, title } = this.props;

        const html = {
            body: components.body && renderToStaticMarkup(components.body)
        };

        const stateScript = ids.state && `window.${ids.state} = ${JSON.stringify(state)};`;

        return (
            <html>
                <head>
                    <title>{ title }</title>
                </head>
                <body>
                    <div dangerouslySetInnerHTML={{ __html: html.body }} id={ ids.body } />
                    { stateScript && <script dangerouslySetInnerHTML={{ __html: stateScript }} /> }
                    { clientSrc && <script src={ clientSrc } /> }
                </body>
            </html>
        );
    }
}

Default.propTypes = {
    components: React.PropTypes.shape({
        body: React.PropTypes.node
    }),
    ids: React.PropTypes.shape({
        body: React.PropTypes.string,
        state: React.PropTypes.string
    }),
    clientSrc: React.PropTypes.string,
    state: React.PropTypes.object,
    title: React.PropTypes.string
};

export default Default;
