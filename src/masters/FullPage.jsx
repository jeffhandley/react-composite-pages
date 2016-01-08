import React, { Component } from 'react';

class FullPage extends Component {
    render() {
        const { body, bodyId, clientSrc, state, stateId, title } = this.props;

        const stateScript = stateId && `window.${stateId} = ${JSON.stringify(state)};`;

        return (
            <html>
                <head>
                    <title>{ title }</title>
                </head>
                <body>
                    <div dangerouslySetInnerHTML={{ __html: body }} id={ bodyId || 'page-body' } />
                    { stateScript && <script dangerouslySetInnerHTML={{ __html: stateScript }} /> }
                    { clientSrc && <script src={ clientSrc } /> }
                </body>
            </html>
        );
    }
}

FullPage.propTypes = {
    body: React.PropTypes.string,
    bodyId: React.PropTypes.string,
    clientSrc: React.PropTypes.string,
    state: React.PropTypes.object,
    stateId: React.PropTypes.string,
    title: React.PropTypes.string
};

export default FullPage;
