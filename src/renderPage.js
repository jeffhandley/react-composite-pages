import React from 'react';
import ReactDOMServer from 'react-dom/server';

export default (req, res, loadPage, DefaultMaster) => {
    loadPage(req, (err, page) => {
        const {
            master = DefaultMaster,
            ...masterProps
        } = page.render();

        res.send(ReactDOMServer.renderToStaticMarkup(
            React.createElement(master, {...masterProps})
        ));
    })
};
