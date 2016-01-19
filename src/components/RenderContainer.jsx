import React, { Component } from 'react';
import RenderState from './RenderState';
import RenderClient from './RenderClient';
import { renderToStaticMarkup, renderToString } from 'react-dom/server';

const _ = {
    mapValues: require('lodash/object/mapValues')
};

class RenderContainer extends Component {
    static rewind() {
        const _state = RenderState.rewind();
        const _clients = RenderClient.rewind();

        const state = () => (
            _state && (
                <script
                    dangerouslySetInnerHTML={{
                        __html: `window.RenderState = ${JSON.stringify(_state)};`
                    }}
                />
            )
        );

        const clients = () => (
            <div>
                { _clients && _clients.map((client) => (
                    <script key={client} src={client} />
                )) }
            </div>
        );

        return { state, clients, _state, _clients };
    }

    static renderTemplate(template) {
        const sections = _.mapValues(template, (section) => {
            const __html = renderToStaticMarkup(section);

            return () => (
                <div dangerouslySetInnerHTML={{ __html }} />
            );
        });

        return { ...RenderContainer.rewind(), sections };
    }

    render() {
        const { id, state, children, clientSrc } = this.props;

        if (!React.Children.count(children)) {
            return null;
        }

        const serverRender = clientSrc ? renderToString : renderToStaticMarkup;
        const __html = serverRender(React.Children.only(children));

        return (
            <div>
                <div dangerouslySetInnerHTML={{ __html }} {...{ id }} />
                <RenderState {...{ id, state }} />
                <RenderClient src={ clientSrc } />
            </div>
        );
    }
}

export default RenderContainer;
