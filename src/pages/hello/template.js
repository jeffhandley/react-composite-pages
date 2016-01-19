import React from 'react';
import ReactDOMServer from 'react-dom/server';
import url from 'url';
import Hello from './Hello';
import RenderContainer from '../../components/RenderContainer';

export default (req, callback) => {
    callback(
        React.createClass({
            propTypes: {
                body: React.PropTypes.element.isRequired,
                footer: React.PropTypes.element
            },
            render() {
                const template = RenderContainer.renderTemplate(this.props);

                return (
                    <html>
                        <head>
                            <title>Hello World</title>
                        </head>
                        <body>
                            <template.sections.body />
                            <template.state />
                            <template.clients />
                            <hr />
                            <template.sections.footer />
                        </body>
                    </html>
                );
            }
        })
    );
}
