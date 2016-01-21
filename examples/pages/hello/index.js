import React from 'react';
import url from 'url';
import Hello from './Hello';
import template from '../../templates/full-page';
import { RenderContainer } from 'react-composition';

export default (req, callback) => {
    // This could be an async data fetching operation
    const { to = "World" } = url.parse(req.url, true).query;

    // This could be the creation of a flux/redux store
    const state = { to };

    // Load the Template Container Component using this same approach
    template(req, (Template, templateFunctions) => {
        // Render ourselves inside the loaded Template
        // Specify both a body and a footer for the template
        callback(
            React.createClass({
                render() {
                    return (
                        <Template
                            title={`Hello ${to}`}
                            body={
                                // The body supports universal rendering
                                // It is wrapped in a RenderContainer to
                                // configure its required client script,
                                // initial state, and container element id.
                                <RenderContainer
                                  clientSrc='/client/pages/hello.js'
                                  id='hello-container'
                                  state={state}>
                                    <Hello to={to} />
                                </RenderContainer>
                            }
                            footer={
                                // The footer doesn't use universal rendering
                                // It will be rendered as static HTML
                                <span>It's nice to see you again!</span>
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
