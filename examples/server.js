import express from 'express';
import beautify from 'express-beautify';
import url from 'url';
import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

const app = express();
app.use(beautify());
app.use('/client', express.static('lib/client'));

app.get('/favicon.ico', (req, res, next) => {
    res.send();
});

app.get('*', (req, res, next) => {
    const { pathname, query: { pretty } } = url.parse(req.url, true);
    const { default: loadPage } = require('./' + path.join('pages/', pathname));

    loadPage(req, res, (Page, pageActions) => {
        const send = (pretty ? res.sendHTML : res.send).bind(res);
        send(ReactDOMServer.renderToStaticMarkup(<Page />));
    });
});

const server = app.listen(3000, () => {
    console.log('Listening on port 3000');
    console.log('');

    console.log('Hello World: http://localhost:3000/hello');
    console.log('Redux-based Counter: http://localhost:3000/counter-redux');
    console.log('Fluxible-based Counter: http://localhost:3000/counter-redux');
    console.log('');

    console.log('Querystring options available for all pages:');
    console.log('    to = Either the name to say hello to or the number to initially count to');
    console.log('    template = Page template to use: basic (default), header');
    console.log('    username = Username to show in the Header template');
    console.log('');
});
