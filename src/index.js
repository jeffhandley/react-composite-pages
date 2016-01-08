import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

const app = express();
app.use('/nui/client', express.static('lib'));

app.get('/nui/redux', (req, res) => {
    const { default: loadMessagePage } = require('./pages/redux/server');

    loadMessagePage((err, messagePage) => {
        messagePage.setMessage('Loaded from express');
        messagePage.setSource('server');

        const { default: FullPage } = require('./masters/FullPage');
        const page = messagePage.render();

        res.send(ReactDOMServer.renderToStaticMarkup(
            <FullPage {...page} title='Redux Message' />
        ));
    });
});

app.get('/nui/fluxible', (req, res) => {
    const { default: loadMessagePage } = require('./pages/fluxible/server');

    loadMessagePage((err, messagePage) => {
        messagePage.setMessage('Loaded from express', () => {
            messagePage.setSource('server', () => {
                const { default: FullPage } = require('./masters/FullPage');
                const page = messagePage.render();

                res.send(ReactDOMServer.renderToStaticMarkup(
                    <FullPage {...page} title='Fluxible Message' />
                ));
            });
        });
    });
});

const server = app.listen(3000, () => {
    console.log('Listening on port 3000');
});
