import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

const app = express();

app.get('/nui/redux', (req, res) => {
    const { default: loadMessagePage } = require('./pages/redux/loadMessagePage');

    loadMessagePage((err, messagePage) => {
        messagePage.setMessage('Loaded from express');

        const __html = ReactDOMServer.renderToString(
            <messagePage.Message />
        );

        res.send(ReactDOMServer.renderToStaticMarkup(
            <html>
                <head>
                    <title>Redux Message</title>
                </head>
                <body>
                    <div dangerouslySetInnerHTML={{__html}} id='message' />
                </body>
            </html>
        ));
    });
});

app.get('/nui/fluxible', (req, res) => {
    const { default: loadMessagePage } = require('./pages/fluxible/loadMessagePage');

    loadMessagePage((err, messagePage) => {
        messagePage.setMessage('Loaded from express', () => {
            const __html = ReactDOMServer.renderToString(
                <messagePage.Message />
            );

            res.send(ReactDOMServer.renderToStaticMarkup(
                <html>
                    <head>
                        <title>Fluxible Message</title>
                    </head>
                    <body>
                        <div dangerouslySetInnerHTML={{__html}} id='message' />
                    </body>
                </html>
            ));
        });
    });
});

const server = app.listen(3000, () => {
    console.log('Listening on port 3000');
});
