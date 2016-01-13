import React, { Component } from 'react';
import Section from './components/Section';
import Partial from './components/Partial';
import Title from './components/Title';
import Client from './components/Client';
import RequireJs from './components/RequireJs';

class Default extends Component {
    render() {
        const { body, sections } = Section.rewind();

        if (sections) {
            throw new Error('Unused sections remain: ' + JSON.stringify(sections));
        }

        const title = Title.rewind();
        const clients = Client.rewind();
        const requiredJs = RequireJs.rewind();

        return (
            <html>
                <head>
                    <title>{ title }</title>
                </head>
                <body>
                    { body && <Partial {...body} /> }
                    { clients && clients.map((client) => (
                        <div key={client.id} id={ `client-${client.id}` }>
                            <script dangerouslySetInnerHTML={{ __html: `window.${client.id} = ${JSON.stringify(client.state)};` }} />
                            <script src={client.src} />
                        </div>
                    ))}
                    { requiredJs && requiredJs.map((src) => (
                        <script key={src} {...{src}} />
                    ))}
                </body>
            </html>
        );
    }
}

export default (req, callback) => {
    callback(null, <Default />);
};
