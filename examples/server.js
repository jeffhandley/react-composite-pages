import express from 'express';
import beautify from 'express-beautify';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

const app = express();
app.use(beautify());
app.use('/client', express.static('lib/client'));

app.get('/hello', (req, res, next) => {
    const { default: loadPage } = require('./pages/hello');

    loadPage(req, (Page, pageActions) => {
        res.sendHTML(ReactDOMServer.renderToStaticMarkup(<Page />));
    });
});

app.get('/counter/redux', (req, res, next) => {
    const { default: loadPage } = require('./pages/counter-redux');

    loadPage(req, (Page, pageActions) => {
        res.sendHTML(ReactDOMServer.renderToStaticMarkup(<Page />));
    });
});

const server = app.listen(3000, () => {
    console.log('Listening on port 3000');
});
