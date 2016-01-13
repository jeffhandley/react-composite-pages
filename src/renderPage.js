import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Master from './masters/components/Master';

function renderPage(req, res, loadPage) {
    const render = (err, component) => {
        let html = ReactDOMServer.renderToStaticMarkup(component);
        let master = Master.rewind();

        if (master) {
            master(req, render);
        } else {
            res.send(html);
        }
    }

    loadPage(req, render);
}

export default renderPage;
