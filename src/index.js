import express from 'express';
import renderPage from './renderPage';
import url from 'url';
import path from 'path';

const app = express();
app.use('/nui/client', express.static('lib'));

app.get('/nui/*', (req, res, next) => {
    const { pathname } = url.parse(req.url);
    const pagePath = path.join(path.relative('/nui', pathname));

    const { default: loadPage } = require(`./pages/${pagePath}/server`);
    renderPage(req, res, loadPage);
});

const server = app.listen(3000, () => {
    console.log('Listening on port 3000');
});
