import React from 'react';
import ReactDOMServer from 'react-dom/server';
import RenderContainer from '../../components/RenderContainer';

export default (req, callback) => {
    // We could perform async operations for loading the template
    callback(
        React.createClass({
            // Define body and footer element properties for the template
            propTypes: {
                body: React.PropTypes.element.isRequired,
                footer: React.PropTypes.element
            },

            render() {
                // Render the template's elements, capturing all of the
                // required state and client scripts.
                const template = RenderContainer.renderTemplate(this.props);

                // The output includes `state` and `clients` components plus
                // a `sections` object with components for each element
                // represented in the template props that were passed in.

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
