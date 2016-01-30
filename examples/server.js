import express from 'express';
import beautify from 'express-beautify';
import url from 'url';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import routes from './routes';
import { match } from 'react-router';

const app = express();
app.use(beautify());
app.use('/client', express.static('lib/client'));

app.get('*', (req, res, next) => {
    const { query: { pretty } } = url.parse(req.url, true);

    match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
        if (error) {
            res.status(500).send(error.message)
        } else if (redirectLocation) {
            res.redirect(302, redirectLocation.pathname + redirectLocation.search)
        } else if (renderProps) {
            const loadPage = renderProps.components[renderProps.components.length - 1];

            loadPage(req, res, (Page) => {
                res.status(200);

                const send = (pretty ? res.sendHTML : res.send).bind(res);
                send(ReactDOMServer.renderToStaticMarkup(<Page />));
            });
        } else {
            res.status(404).send('Not found')
        }
    });
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
    console.log('');

    console.log('Hello World: http://localhost:3000/hello');
    console.log('Redux-based Counter: http://localhost:3000/counter-redux');
    console.log('Fluxible-based Counter: http://localhost:3000/counter-fluxible');
    console.log('');

    console.log('Querystring options available for all pages:');
    console.log('    to = Either the name to say hello to or the number to initially count to');
    console.log('    template = Page template to use: basic (default), header');
    console.log('    username = Username to show in the Header template');
    console.log('');
});
