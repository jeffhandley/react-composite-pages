import React from 'react';
import Footer from './components/Footer';
import { RenderContainer, RenderClient } from 'react-composition';

export default (req, res, callback) => {
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
                        <div>
                            Default footer provided by the basic template
                        </div>
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
                            <style>
                            {`
                                DIV.template-section {
                                    border: 1px solid black;
                                }

                                DIV.template-section DIV.template-section-header {
                                    padding: 4px;
                                    background: silver;
                                    border-bottom: 1px solid black;
                                }

                                DIV.template-section DIV.template-section-note {
                                    padding: 4px;
                                    background: #ededed;
                                    font-size: 14px;
                                    border-bottom: 1px solid black;
                                }

                                DIV.template-section DIV.template-section-body {
                                    padding: 4px;
                                }

                                DIV.component {
                                    border: 1px solid navy;
                                }

                                DIV.component DIV.component-header {
                                    padding: 4px;
                                    background: #88aaff;
                                    border-bottom: 1px solid black;
                                }

                                DIV.component DIV.component-note {
                                    padding: 4px;
                                    background: #bbddff;
                                    font-size: 14px;
                                    border-bottom: 1px solid black;
                                }

                                DIV.component DIV.component-body {
                                    padding: 4px;
                                }
                            `}
                            </style>
                        </head>
                        <body>
                            <div className='template-section'>
                                <div className='template-section-header'>
                                    Template: <b>basic</b>
                                </div>
                                <div className='template-section-note'>
                                    The basic template renders a <b>body</b> and a <b>footer</b>,
                                    with a default footer supplied so that pages don't have to
                                    supply one but can override it if needed.
                                </div>
                                <div className='template-section-body'>
                                    <div className='template-section'>
                                        <div className='template-section-header'>
                                            Template Section: <b>body</b>
                                        </div>
                                        <div className='template-section-body'>
                                            <template.sections.body />
                                        </div>
                                    </div>
                                    <template.state />
                                    <script src='/client/common.js' />
                                    <template.clients />
                                    <hr />
                                    <div className='template-section'>
                                        <div className='template-section-header'>
                                            Template Section: <b>footer</b>
                                        </div>
                                        <div className='template-section-note'>
                                            The footer is rendered after client scripts have been loaded,
                                            illustrating how the page template has control over the ordering of
                                            template sections, rendered state, and client scripts. This causes
                                            the browser to have a delay before rendering the footer.
                                        </div>
                                        <div className='template-section-body'>
                                            <div className='component'>
                                                <div className='component-note'>
                                                    This is the footer supplied by the page (or the template's default footer).
                                                </div>
                                                <div className='component-body'>
                                                    <template.sections.footer />
                                                </div>
                                            </div>
                                            <div className='component'>
                                                <div className='component-header'>
                                                    Component: <b>Footer</b>
                                                </div>
                                                <div className='component-note'>
                                                    The basic template adds this to the footer supplied.
                                                </div>
                                                <div className='component-body'>
                                                    <Footer />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </body>
                    </html>
                );
            }
        })
    );
}
