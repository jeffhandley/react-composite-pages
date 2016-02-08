import React, { Component } from 'react';
import RenderState from './RenderState';
import RenderClient from './RenderClient';
import { renderToStaticMarkup, renderToString } from 'react-dom/server';

const _ = {
    mapValues: require('lodash/mapValues')
};

class RenderContainer extends Component {
    static rewind() {
        const _state = RenderState.rewind();
        const state = ({id}) => (<RenderState.Script {...{id, state: _state}} />);

        const _clients = RenderClient.rewind();
        const clients = () => (<RenderClient.Script clients={_clients} />);

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
                { typeof state !== 'undefined' && <RenderState {...{ id, state }} /> }
                { clientSrc && <RenderClient src={ clientSrc } /> }
            </div>
        );
    }
}

export default RenderContainer;
