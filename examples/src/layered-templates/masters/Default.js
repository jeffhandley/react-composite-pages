import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Title from '../components/Title';

const Default = React.createClass({
    propTypes: {
        body: React.PropTypes.element
    },

    render() {
        const body = ReactDOMServer.renderToStaticMarkup(this.props.body);

        const title = Title.rewind();

        return (
            <html>
                <head>
                    <title>{ title }</title>
                </head>
                <body dangerouslySetInnerHTML={{ __html: body }} />
            </html>
        );
    }
});

export default function renderMaster(req, callback) {
    setTimeout(() => {
        callback(Default, { });
    }, 100);
}

