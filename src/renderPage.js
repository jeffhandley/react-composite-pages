import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Master from './masters/components/Master';
import Section from './masters/components/Section';

export default (req, res, loadPage, DefaultMaster) => {
    loadPage(req, (err, component) => {
        let html, master;

        do {
            html = ReactDOMServer.renderToStaticMarkup(component);
            master = Master.rewind();

            if (master) {
                component = React.createElement(master);
            }
        }
        while (master);

        res.send(html);
    })
};
