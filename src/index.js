import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import FullPage from './masters/FullPage';

const app = express();
app.use('/nui/client', express.static('lib'));

app.get('/nui/redux', (req, res) => {
    const { default: loadMessagePage } = require('./pages/redux/server');

    loadMessagePage(req, (err, messagePage) => {
        const {
            master = FullPage,
            ...props
        } = messagePage.render();

        res.send(ReactDOMServer.renderToStaticMarkup(
            React.createElement(master, {...props })
        ));
    });
});

app.get('/nui/fluxible', (req, res) => {
    const { default: loadMessagePage } = require('./pages/fluxible/server');

    loadMessagePage(req, (err, messagePage) => {
        const {
            master = FullPage,
            ...props
        } = messagePage.render();

        res.send(ReactDOMServer.renderToStaticMarkup(
            React.createElement(master, {...props })
        ));
    });
});

const server = app.listen(3000, () => {
    console.log('Listening on port 3000');
});
