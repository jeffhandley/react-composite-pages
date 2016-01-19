import React from 'react';
import ReactDOMServer from 'react-dom/server';
import url from 'url';
import Hello from './Hello';
import RenderContainer from '../../components/RenderContainer';
import loadTemplate from './template';

export default (req, callback) => {
    const { to = "World" } = url.parse(req.url, true).query;
    const state = { hello: { to }};

    loadTemplate(req, (Template) => {
        callback(
            React.createClass({
                render() {
                    return (
                        <Template
                            body={
                                <RenderContainer
                                  clientSrc='/client/pages/hello.js'
                                  id='hello-container'
                                  state={state}>
                                    <Hello to={to} />
                                </RenderContainer>
                            }
                            footer={
                                <span>It's nice to see you again!</span>
                            }
                        />
                    );
                }
            })
        );
    });
}
