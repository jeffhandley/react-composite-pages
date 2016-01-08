import React, { Component } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

class FullPage extends Component {
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
                    <div style={{ backgroundColor: '#343434', color: 'white', height: 100 }}>Top Nav</div>
                    <div dangerouslySetInnerHTML={{ __html: html.body }} id={ ids.body || 'page-body' } />
                    <div style={{ backgroundColor: '#343434', color: 'white', height: 50 }}>Footer</div>
                    { stateScript && <script dangerouslySetInnerHTML={{ __html: stateScript }} /> }
                    { clientSrc && <script src={ clientSrc } /> }
                </body>
            </html>
        );
    }
}

FullPage.propTypes = {
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

export default FullPage;
