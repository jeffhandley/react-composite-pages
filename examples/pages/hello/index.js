import React from 'react';
import url from 'url';
import Hello from './Hello';
import { Container } from 'react-composite-pages';
import ReactCreateClass from 'create-react-class';

export default (req, res, callback) => {
    // This could be an async data fetching operation
    const { to = "World", template = 'basic' } = url.parse(req.url, true).query;
    const { default: loadTemplate } = require(`../../templates/${template}`);

    // This could be the creation of a flux/redux store
    const state = { to };

    // Load the Template Container Component using this same approach
    loadTemplate(req, res, (Template, templateFunctions) => {
        // Render ourselves inside the loaded Template
        // Specify both a body and a footer for the template
        callback(
            ReactCreateClass({
                render() {
                    return (
                        <Template
                            title={`Hello ${to}`}
                            body={
                                // The body supports universal rendering
                                // It is wrapped in a Container to
                                // configure its required client script,
                                // initial state, and container element id.
                                <Container
                                  clientSrc='/client/pages/hello.js'
                                  id='hello-container'
                                  state={state}>
                                    <Hello to={to} />
                                </Container>
                            }
                            footer={
                                // The footer doesn't use universal rendering
                                // It will be rendered as static HTML
                                <span>
                                    The Hello page provided this footer content.
                                    It is only rendered on the server.
                                </span>
                            }
                        />
                    );
                }
            }),
            // Expose the template's external API functions through ours
            templateFunctions
        );
    });
}
