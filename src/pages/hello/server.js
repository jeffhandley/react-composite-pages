import React from 'react';
import url from 'url';
import Hello from './Hello';

export default (req, callback) => {
    const { to = "World" } = url.parse(req.url, true).query;
    const state = { hello: { to }};
    const renderState = `window.RenderState = ${JSON.stringify(state)};`;

    callback(
        React.createClass({
            render() {
                return (
                    <html>
                        <head>
                            <title>Hello World</title>
                        </head>
                        <body>
                            <div id='hello-container'>
                                <Hello to={to} />
                            </div>
                            <script dangerouslySetInnerHTML={{ __html: renderState }} />
                            <script src='/client/pages/hello.js' />
                        </body>
                    </html>
                );
            }
        })
    );
}
