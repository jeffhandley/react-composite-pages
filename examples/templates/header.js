import React from 'react';
import header from './components/header';
import template from './basic';
import { RenderContainer } from 'react-composite-pages';

export default (req, res, callback) => {
    header(req, res, (Header, headerActions) => {
        headerActions.signin('header-template-user');

        template(req, res, (Template, templateActions) => {;
            callback(
                React.createClass({
                    propTypes: {
                        body: React.PropTypes.element.isRequired
                    },

                    render() {
                        return (
                            <Template
                                // Pass props through to the parent template so
                                // additional template sections can flow through
                                { ...this.props }
                                body={
                                    <div className='template-section'>
                                        <div className='template-header'>
                                            Template: <b>header</b> (modifies the body of the basic template)
                                        </div>
                                        <div className='template-section-note'>
                                            The header template augments the <b>body</b> provided by the
                                            page and adds a header to it, then rendering itself inside
                                            the <b>basic</b> template.
                                        </div>
                                        <div className='template-section-body'>
                                            <Header />
                                            <div className='template-section'>
                                                <div className='template-section-header'>
                                                    Template Section: <b>body</b>
                                                </div>
                                                <div className='template-section-body'>
                                                    { this.props.body }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }
                            />
                        );
                    }
                }),
                { ... templateActions, ...headerActions }
            );
        })
    })
}
