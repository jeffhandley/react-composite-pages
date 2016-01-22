import React from 'react';
import header from './components/header';
import template from './basic';
import { RenderContainer } from 'react-composition';

export default (req, res, callback) => {
    header(req, res, (Header, headerActions) => {
        template(req, res, (Template, templateActions) => {
            callback(
                React.createClass({
                    propTypes: {
                        body: React.PropTypes.element.isRequired
                    },

                    render() {
                        return (
                            <Template
                                body={
                                    <div>
                                        <Header />
                                        { this.props.body }
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
