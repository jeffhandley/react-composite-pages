import React from 'react';
import { RenderContainer, RenderClient } from 'react-composition';

export default (req, callback) => {
    // We could perform async operations for loading the template
    callback(
        React.createClass({
            // Define body and footer element properties for the template
            propTypes: {
                body: React.PropTypes.element.isRequired,
                footer: React.PropTypes.element,
                title: React.PropTypes.string.isRequired
            },

            getDefaultProps() {
                return {
                    footer: (
                        <div>React-Composition</div>
                    ),
                    title: 'React-Composition'
                };
            },

            render() {
                // Render the template's elements, capturing all of the
                // required state and client scripts.
                const { body, footer } = this.props;
                const template = RenderContainer.renderTemplate({ body, footer });

                // The output includes `state` and `clients` components plus
                // a `sections` object with components for each element
                // represented in the template props that were passed in.

                return (
                    <html>
                        <head>
                            <title>{ this.props.title }</title>
                        </head>
                        <body>
                            <template.sections.body />
                            <template.state />
                            <script src='/client/common.js' />
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
