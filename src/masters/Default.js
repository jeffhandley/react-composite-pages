import React from 'react';
import ReactDOMServer from 'react-dom/server';
import RenderState from '../components/RenderState';
import RenderClient from '../components/RenderClient';
import Title from '../components/Title';

const Default = React.createClass({
    propTypes: {
        body: React.PropTypes.element
    },

    render() {
        const body = ReactDOMServer.renderToStaticMarkup(this.props.body);

        const state = RenderState.rewind();
        const clients = RenderClient.rewind();
        const title = Title.rewind();

        return (
            <html>
                <head>
                    <title>{ title }</title>
                </head>
                <body>
                    <div dangerouslySetInnerHTML={{ __html: body }} />
                    { state && <script dangerouslySetInnerHTML={{ __html: `
                        window.RenderState = ${JSON.stringify(state)};
                    ` }} /> }
                    { clients && clients.map((client) => (
                        <script key={client} src={client} />
                    ))}
                </body>
            </html>
        );
    }
});

export default function renderMaster(req, callback) {
    setTimeout(() => {
        callback(Default, { });
    }, 100);
}

