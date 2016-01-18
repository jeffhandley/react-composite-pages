import express from 'express';
import beautify from 'express-beautify';
import url from 'url';
import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

const app = express();
app.use(beautify());
app.use('/nui/client', express.static('lib'));

app.get('/counter', (req, res, next) => {
    const { default: loadPage } = require('./pages/counter/server');

    loadPage(req, (Page, pageActions) => {
        pageActions.increment();

        res.sendHTML(ReactDOMServer.renderToStaticMarkup(<Page />));
    });
});

const server = app.listen(3000, () => {
    console.log('Listening on port 3000');
});
